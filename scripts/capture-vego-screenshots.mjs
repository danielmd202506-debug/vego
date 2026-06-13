import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const outDir = path.resolve("outputs/manual-20260612-vego/presentations/vego-ux-audit/screenshots");
await fs.mkdir(outDir, { recursive: true });

const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const scenarios = [
  {
    name: "01-home-hero-desktop",
    url: "https://www.vegogarden.com/",
    viewport: { width: 1440, height: 900 },
    wait: 3500,
  },
  {
    name: "02-collection-filters-desktop",
    url: "https://www.vegogarden.com/collections/classic-metal-raised-garden-beds",
    viewport: { width: 1440, height: 1000 },
    wait: 3500,
  },
  {
    name: "03-pdp-variant-choice-desktop",
    url: "https://www.vegogarden.com/products/9-in-1-modular-raised-garden-bed",
    viewport: { width: 1440, height: 1000 },
    wait: 3500,
  },
  {
    name: "04-help-me-choose-desktop",
    url: "https://www.vegogarden.com/collections/help-me-choose",
    viewport: { width: 1440, height: 1000 },
    wait: 3500,
  },
  {
    name: "05-home-mobile",
    url: "https://www.vegogarden.com/",
    viewport: devices["iPhone 14"].viewport,
    isMobile: true,
    wait: 3500,
  },
  {
    name: "06-mega-menu-raised-garden-beds",
    url: "https://www.vegogarden.com/",
    viewport: { width: 1440, height: 900 },
    wait: 3500,
    action: "hover-raised-garden-beds",
  },
  {
    name: "07-collection-filters-grid-desktop",
    url: "https://www.vegogarden.com/collections/classic-metal-raised-garden-beds",
    viewport: { width: 1440, height: 1000 },
    wait: 3500,
    action: "scroll-to-grid",
  },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const results = [];

for (const scenario of scenarios) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    isMobile: scenario.isMobile || false,
    deviceScaleFactor: scenario.isMobile ? 2 : 1,
    userAgent: scenario.isMobile ? devices["iPhone 14"].userAgent : undefined,
  });
  const page = await context.newPage();
  await page.goto(scenario.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(scenario.wait);

  for (const selector of [
    'button:has-text("Accept")',
    'button:has-text("I agree")',
    'button:has-text("Got it")',
    '[aria-label*="close" i]',
    '.modal button',
  ]) {
    try {
      const candidate = page.locator(selector).first();
      if (await candidate.isVisible({ timeout: 500 })) {
        await candidate.click({ timeout: 1000 });
        await page.waitForTimeout(500);
        break;
      }
    } catch {}
  }

  if (scenario.action === "hover-raised-garden-beds") {
    try {
      await page.getByText("Raised Garden Beds", { exact: true }).first().hover({ timeout: 2000 });
      await page.waitForTimeout(1200);
    } catch {}
  }

  if (scenario.action === "scroll-to-grid") {
    await page.mouse.wheel(0, 850);
    await page.waitForTimeout(1000);
    for (const selector of ['button:has-text("Accept")', '[aria-label*="close" i]']) {
      try {
        const candidate = page.locator(selector).first();
        if (await candidate.isVisible({ timeout: 500 })) {
          await candidate.click({ timeout: 1000 });
          await page.waitForTimeout(500);
          break;
        }
      } catch {}
    }
  }

  const output = path.join(outDir, `${scenario.name}.png`);
  await page.screenshot({ path: output, fullPage: false });
  results.push({ ...scenario, output });
  await context.close();
}

await browser.close();

console.log(JSON.stringify(results.map(({ name, url, output }) => ({ name, url, output })), null, 2));
