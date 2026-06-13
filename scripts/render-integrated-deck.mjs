import fs from "node:fs/promises";
import path from "node:path";
import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
  saveBlobToFile,
} from "file:///C:/Users/Administrator/.codex/plugins/cache/openai-primary-runtime/presentations/26.601.10930/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace = "C:/tmp/vego-integrated-final";
const pptxPath = `${workspace}/output/VEGO-Website-Full-Interview-Presentation-Bilingual-TOC.pptx`;
const previewDir = `${workspace}/preview-bilingual-toc`;
const layoutDir = `${workspace}/layout-bilingual-toc`;

await ensureArtifactToolWorkspace(workspace);
const { FileBlob, PresentationFile } = await importArtifactTool(workspace);
const presentation = await PresentationFile.importPptx(await FileBlob.load(pptxPath));

await fs.rm(previewDir, { recursive: true, force: true });
await fs.rm(layoutDir, { recursive: true, force: true });
await fs.mkdir(previewDir, { recursive: true });
await fs.mkdir(layoutDir, { recursive: true });

for (let i = 0; i < presentation.slides.count; i += 1) {
  const slide = presentation.slides.getItem(i);
  const n = String(i + 1).padStart(2, "0");
  await saveBlobToFile(await presentation.export({ slide, format: "png", scale: 1 }), path.join(previewDir, `slide-${n}.png`));
  await saveBlobToFile(await presentation.export({ slide, format: "layout" }), path.join(layoutDir, `slide-${n}.layout.json`));
}

console.log(JSON.stringify({ slideCount: presentation.slides.count, previewDir, layoutDir }, null, 2));
