import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const outputPath = path.join(repoRoot, "data", "voc-items.json");
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
  if (value.trim().startsWith("[")) {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  }
  return value.split(",").map((item) => item.trim()).filter(Boolean);
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

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
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
  const collectedDate = pick(normalized, ["collected_date", "collectedDate", "collected_at"], new Date().toISOString().slice(0, 10)).slice(0, 10);
  const sourcePublishedDate = pick(normalized, ["source_published_date", "sourcePublishedDate", "published_date", "publishedDate"]);
  const date = pick(normalized, ["date", "voc_date", "created_at", "updated_at"], sourcePublishedDate || collectedDate).slice(0, 10);
  const sourceUrl = pick(normalized, ["source_url", "sourceUrl", "url", "link", "permalink"]);
  const evidenceScreenshot = pick(normalized, ["evidence_screenshot", "evidenceScreenshot", "screenshot", "screenshot_url", "screenshotUrl"]);
  const recommendedAction = pick(normalized, ["recommended_action", "recommendedAction", "action", "next_step"]);
  const evidenceType = pick(normalized, ["evidence_type", "evidenceType"], sourceUrl ? "public-source-synthesis" : "manual-note");
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
    collectedDate,
    sourcePublishedDate: sourcePublishedDate ? sourcePublishedDate.slice(0, 10) : "",
    sourceUrl,
    evidenceScreenshot,
    recommendedAction,
    evidenceType,
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

async function main() {
  const sourceUrls = splitList(process.env.VOC_SOURCE_URLS || "");
  const sourceFiles = splitList(process.env.VOC_SOURCE_FILES || "");
  const sources = [];
  const items = [];

  for (const sourceUrl of sourceUrls) {
    const loaded = await loadSource(sourceUrl);
    sources.push(sourceUrl);
    items.push(...loaded);
  }

  for (const sourceFile of sourceFiles) {
    const loaded = await loadFile(sourceFile);
    sources.push(sourceFile);
    items.push(...loaded);
  }

  if (!items.length) {
    const existing = JSON.parse(await readFile(outputPath, "utf8"));
    existing.generatedAt = new Date().toISOString();
    existing.mode = "no-source-configured";
    await writeOutput(existing);
    console.log("No VOC sources configured. Existing data file timestamp refreshed.");
    return;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    mode: "synced",
    sources,
    items: dedupeItems(items).sort((a, b) => String(b.date).localeCompare(String(a.date))),
  };

  await writeOutput(payload);
  console.log(`Synced ${payload.items.length} VOC items from ${sources.length} source(s).`);
}

function dedupeItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.source}|${item.date}|${item.quote}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function writeOutput(payload) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
