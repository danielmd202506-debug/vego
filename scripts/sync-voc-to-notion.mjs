import { readFile } from "node:fs/promises";
import path from "node:path";

const NOTION_VERSION = "2022-06-28";
const repoRoot = process.cwd();
const defaultDatabaseId = "37f1c0df7c158167afcbdc0555b0ed2b";
const allowedSources = new Set([
  "site-reviews",
  "site-qa",
  "amazon",
  "social",
  "community",
  "support",
  "search-console",
  "post-purchase",
]);
const allowedSentiment = new Set(["positive", "neutral", "negative"]);
const allowedImpact = new Set(["low", "medium", "high"]);

function splitList(value) {
  if (!value) return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  }
  return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  if (!rows.length) return [];

  const headers = rows[0].map((header) => normalizeKey(header));
  return rows.slice(1).map((values) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = values[index] || "";
    });
    return item;
  });
}

function pick(record, keys, fallback = "") {
  for (const key of keys) {
    const normalized = normalizeKey(key);
    if (record[normalized] !== undefined && String(record[normalized]).trim()) return String(record[normalized]).trim();
    if (record[key] !== undefined && String(record[key]).trim()) return String(record[key]).trim();
  }
  return fallback;
}

function normalizeTags(value) {
  if (Array.isArray(value)) return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  return String(value || "")
    .split(/[|,;]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeRecord(record, fallbackSource) {
  const normalized = Object.fromEntries(Object.entries(record).map(([key, value]) => [normalizeKey(key), value]));
  const source = pick(normalized, ["source", "channel", "source_id"], fallbackSource);
  const sentiment = pick(normalized, ["sentiment", "tone"], "neutral").toLowerCase();
  const impact = pick(normalized, ["impact", "priority"], sentiment === "negative" ? "high" : "medium").toLowerCase();
  const quote = pick(normalized, ["quote", "body", "comment", "text", "message", "question", "review"]);
  const title = pick(normalized, ["title", "summary", "subject"], quote.slice(0, 72) || "VOC item");
  const date = pick(normalized, ["date", "created_at", "updated_at"], new Date().toISOString().slice(0, 10)).slice(0, 10);
  const sourceUrl = pick(normalized, ["source_url", "url", "link", "permalink"]);
  const recommendedAction = pick(normalized, ["recommended_action", "action", "next_step"]);
  const status = pick(normalized, ["status"], "new");
  const tags = normalizeTags(normalized.tags || normalized.tag || normalized.topic || normalized.topics);

  if (!quote) return null;

  return {
    source: allowedSources.has(source) ? source : fallbackSource,
    sentiment: allowedSentiment.has(sentiment) ? sentiment : "neutral",
    impact: allowedImpact.has(impact) ? impact : sentiment === "negative" ? "high" : "medium",
    tags: tags.length ? tags : ["unclassified"],
    title,
    quote,
    date,
    sourceUrl,
    recommendedAction,
    status,
  };
}

async function loadSource(sourceUrl) {
  const [url, explicitSource = "site-reviews"] = sourceUrl.split("#source=");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";
  const records = contentType.includes("json") || url.endsWith(".json") ? JSON.parse(text) : parseCsv(text);
  const items = Array.isArray(records) ? records : records.items || records.data || [];
  return items.map((item) => normalizeRecord(item, explicitSource)).filter(Boolean);
}

async function loadFile(filePath) {
  const [rawPath, explicitSource = "site-reviews"] = filePath.split("#source=");
  const absolute = path.isAbsolute(rawPath) ? rawPath : path.join(repoRoot, rawPath);
  const text = await readFile(absolute, "utf8");
  const records = rawPath.endsWith(".json") ? JSON.parse(text) : parseCsv(text);
  const items = Array.isArray(records) ? records : records.items || records.data || [];
  return items.map((item) => normalizeRecord(item, explicitSource)).filter(Boolean);
}

function notionHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

function getPlainText(property) {
  if (!property) return "";
  if (property.type === "title") return property.title.map((item) => item.plain_text).join("");
  if (property.type === "rich_text") return property.rich_text.map((item) => item.plain_text).join("");
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "date") return property.date?.start || "";
  return "";
}

function makeDedupeKey(item) {
  return `${item.source}|${item.date}|${item.quote}`.toLowerCase().replace(/\s+/g, " ").trim();
}

async function getExistingKeys({ token, databaseId }) {
  const keys = new Set();
  let cursor;

  do {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: notionHeaders(token),
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
      }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || `Notion query failed: ${response.status}`);

    for (const page of payload.results) {
      const properties = page.properties || {};
      const item = {
        source: getPlainText(properties.Source),
        date: getPlainText(properties.Date) || page.created_time?.slice(0, 10),
        quote: getPlainText(properties.Quote),
      };
      if (item.quote) keys.add(makeDedupeKey(item));
    }
    cursor = payload.has_more ? payload.next_cursor : undefined;
  } while (cursor);

  return keys;
}

function toRichText(value) {
  const content = String(value || "").slice(0, 2000);
  return content ? [{ text: { content } }] : [];
}

function buildPagePayload(databaseId, item) {
  return {
    parent: { database_id: databaseId },
    properties: {
      "VOC Title": { title: toRichText(item.title || "VOC item") },
      Source: { select: { name: item.source } },
      Sentiment: { select: { name: item.sentiment } },
      Impact: { select: { name: item.impact } },
      Tags: { multi_select: item.tags.map((tag) => ({ name: tag })) },
      Quote: { rich_text: toRichText(item.quote) },
      Date: { date: { start: item.date } },
      Status: { select: { name: item.status || "new" } },
      "Action Owner": { rich_text: [] },
      "Recommended Action": { rich_text: toRichText(item.recommendedAction) },
      "Source URL": { url: item.sourceUrl || null },
    },
  };
}

async function createNotionPage({ token, databaseId, item }) {
  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: notionHeaders(token),
    body: JSON.stringify(buildPagePayload(databaseId, item)),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || `Notion create page failed: ${response.status}`);
}

function dedupeItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = makeDedupeKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function loadConfiguredItems() {
  const sourceUrls = splitList(process.env.VOC_SOURCE_URLS || "");
  const sourceFiles = splitList(process.env.VOC_SOURCE_FILES || "data/voc-items.json");
  const items = [];

  for (const sourceUrl of sourceUrls) {
    items.push(...await loadSource(sourceUrl));
  }

  for (const sourceFile of sourceFiles) {
    items.push(...await loadFile(sourceFile));
  }

  return dedupeItems(items);
}

async function main() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID || defaultDatabaseId;

  if (!token) {
    console.log("NOTION_TOKEN is not configured. Skipping Notion sync.");
    return;
  }

  const items = await loadConfiguredItems();
  if (!items.length) {
    console.log("No VOC items found from configured sources.");
    return;
  }

  const existingKeys = await getExistingKeys({ token, databaseId });
  const missing = items.filter((item) => !existingKeys.has(makeDedupeKey(item)));

  for (const item of missing) {
    await createNotionPage({ token, databaseId, item });
  }

  console.log(`Notion VOC sync complete. Checked ${items.length} item(s), created ${missing.length} new item(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
