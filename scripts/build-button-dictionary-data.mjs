import fs from "node:fs/promises";
import path from "node:path";

const ROOT = "/Users/daniel/Documents/vego design system";
const SOURCE = path.join(ROOT, "docs", "vego-button-dictionary.md");
const OUT = path.join(ROOT, "apps", "button-dictionary", "dictionary-data.js");

const categoryMap = {
  "1. Business Vocabulary": "业务词汇",
  "2. Design Vocabulary": "设计词汇",
  "3. VEGO-Specific Naming": "VEGO 命名",
  "4. Common Confusions": "易混淆词",
};

function splitRow(line) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim().replace(/`/g, ""));
}

function exampleFor(term, scene = "") {
  const examples = {
    CTA: "The hero CTA should lead shoppers to the most important next step.",
    Purchase: "Add to Cart is a purchase action, not a generic primary button.",
    "Purchase / Sticky": "The PDP sticky purchase button appears after the user scrolls.",
    "Text Link": "User Manual should be a text link instead of a filled purchase button.",
    Utility: "Filter and Sort are utility controls, not purchase CTAs.",
    Primary: "Primary describes emphasis, while Purchase describes the business role.",
    "Out of Stock / OOS": "Out of Stock should be treated as an inventory state.",
    "PDP Main vs PDP Sticky": "PDP Main is the original product form; PDP Sticky is the bottom toolbar.",
  };
  if (examples[term]) return examples[term];
  if (scene) return `${term} appears in ${scene}.`;
  return `Use ${term} only when the role and page context are clear.`;
}

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const entries = [];
  let section = "";
  let headers = [];

  for (const line of lines) {
    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      section = heading[1].trim();
      headers = [];
      continue;
    }

    if (!line.startsWith("|") || line.includes("| ---")) continue;
    const cells = splitRow(line);
    if (cells.length < 2) continue;
    if (!headers.length) {
      headers = cells;
      continue;
    }

    const category = categoryMap[section] || section;
    if (category === "易混淆词") {
      entries.push({
        category,
        term: cells[0],
        pronunciation: "",
        meaning: cells[1],
        usage: "容易混淆的概念对照",
        example: exampleFor(cells[0]),
        keywords: cells.join(" "),
      });
      continue;
    }

    entries.push({
      category,
      term: cells[0],
      pronunciation: cells[1] || "",
      meaning: cells[2] || "",
      usage: cells[3] || "",
      example: exampleFor(cells[0], cells[3] || ""),
      keywords: cells.join(" "),
    });
  }

  return entries;
}

const markdown = await fs.readFile(SOURCE, "utf8");
const entries = parseMarkdown(markdown);
await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(
  OUT,
  `window.VEGO_DICTIONARY=${JSON.stringify(entries)};\n`,
);

console.log(JSON.stringify({ out: OUT, entries: entries.length }, null, 2));
