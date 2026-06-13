import fs from "node:fs/promises";
import path from "node:path";
import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
  saveBlobToFile,
} from "file:///C:/Users/Administrator/.codex/plugins/cache/openai-primary-runtime/presentations/26.601.10930/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace = "C:/tmp/vego-integrated-final";
const benchmarkPath = `${workspace}/input/benchmark.pptx`;
const uxPath = `${workspace}/input/ux-with-screenshots.pptx`;
const outPath = `${workspace}/output/VEGO-Website-Competitive-Benchmark-Integrated.pptx`;
const previewDir = `${workspace}/preview-integrated`;
const layoutDir = `${workspace}/layout-integrated`;

function slidesArray(presentation) {
  return Array.from({ length: presentation.slides.count }, (_, index) => presentation.slides.getItem(index));
}

await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.mkdir(previewDir, { recursive: true });
await fs.mkdir(layoutDir, { recursive: true });

await ensureArtifactToolWorkspace(workspace);
const { FileBlob, PresentationFile } = await importArtifactTool(workspace);

const benchmark = await PresentationFile.importPptx(await FileBlob.load(benchmarkPath));
const ux = await PresentationFile.importPptx(await FileBlob.load(uxPath));

const mergedProtos = [
  ...slidesArray(benchmark).map((slide) => slide.toProto()),
  ...slidesArray(ux).map((slide) => slide.toProto()),
];

benchmark.slides.replace(mergedProtos);

for (let i = 0; i < benchmark.slides.count; i += 1) {
  const slide = benchmark.slides.getItem(i);
  const padded = String(i + 1).padStart(2, "0");
  await saveBlobToFile(await benchmark.export({ slide, format: "png", scale: 1 }), `${previewDir}/slide-${padded}.png`);
  await saveBlobToFile(await benchmark.export({ slide, format: "layout" }), `${layoutDir}/slide-${padded}.layout.json`);
}

const pptx = await PresentationFile.exportPptx(benchmark);
await pptx.save(outPath);

const stat = await fs.stat(outPath);
console.log(JSON.stringify({
  output: outPath,
  bytes: stat.size,
  slideCount: benchmark.slides.count,
  previewDir,
  layoutDir,
}, null, 2));
