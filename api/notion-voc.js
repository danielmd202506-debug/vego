const NOTION_VERSION = "2022-06-28";

function getPlainText(property) {
  if (!property) return "";
  if (property.type === "title") return property.title.map((item) => item.plain_text).join("");
  if (property.type === "rich_text") return property.rich_text.map((item) => item.plain_text).join("");
  if (property.type === "select") return property.select?.name || "";
  if (property.type === "status") return property.status?.name || "";
  if (property.type === "url") return property.url || "";
  if (property.type === "date") return property.date?.start || "";
  return "";
}

function getTags(property) {
  if (!property || property.type !== "multi_select") return ["unclassified"];
  const tags = property.multi_select.map((item) => item.name).filter(Boolean);
  return tags.length ? tags : ["unclassified"];
}

function normalizePage(page) {
  const properties = page.properties || {};
  const title = getPlainText(properties["VOC Title"]) || "VOC item";
  const source = getPlainText(properties.Source) || "community";
  const sentiment = getPlainText(properties.Sentiment) || "neutral";
  const impact = getPlainText(properties.Impact) || "medium";
  const quote = getPlainText(properties.Quote);
  const date = getPlainText(properties.Date) || page.created_time?.slice(0, 10) || new Date().toISOString().slice(0, 10);

  return {
    source,
    sentiment,
    impact,
    tags: getTags(properties.Tags),
    title,
    quote,
    date,
    sourceUrl: getPlainText(properties["Source URL"]),
    status: getPlainText(properties.Status),
    recommendedAction: getPlainText(properties["Recommended Action"]),
  };
}

async function queryNotionDatabase({ token, databaseId }) {
  const items = [];
  let cursor;

  do {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || `Notion request failed: ${response.status}`);
    }

    items.push(...payload.results.map(normalizePage).filter((item) => item.quote));
    cursor = payload.has_more ? payload.next_cursor : undefined;
  } while (cursor);

  return items;
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID || "be906bc91f2e42be8705933023e08ffa";

  if (!token) {
    response.status(500).json({
      error: "Missing NOTION_TOKEN environment variable.",
    });
    return;
  }

  try {
    const items = await queryNotionDatabase({ token, databaseId });
    response.status(200).json({
      generatedAt: new Date().toISOString(),
      mode: "notion-api",
      sources: ["notion:VEGO VOC Database"],
      items,
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
    });
  }
}
