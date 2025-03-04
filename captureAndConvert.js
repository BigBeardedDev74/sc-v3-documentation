import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

async function copySitesFile() {
  try {
    const sourcePath = "../sc.simpleform/scripts/allSites.js";
    const destPath = "./src/lib/siteData/allSites.js";

    // Read the source file
    let content = await fs.readFile(sourcePath, "utf8");

    // Replace module.exports with export
    content = content.replace(/module\.exports\s*=\s*/, "export ");

    // Write the modified content to the destination
    await fs.writeFile(destPath, content, "utf8");
    console.log("Sites file copied and transformed successfully");
  } catch (error) {
    console.error("Error copying and transforming sites file:", error);
    throw error;
  }
}

async function init() {
  await copySitesFile();
  const { sites } = await import("./src/lib/siteData/allSites.js");
  return sites;
}

async function cleanDirectory(sites) {
  const baseDir = "./src/lib/siteData/screenshots";
  try {
    await fs.rm(baseDir, { recursive: true, force: true });
    console.log("Screenshots directory cleaned");
  } catch (error) {
    console.error("Error cleaning directory:", error);
  }
}

async function ensureDirectories(sites) {
  const baseDir = "./src/lib/siteData/screenshots";
  const types = [...new Set(sites.map((site) => site.type))];

  await fs.mkdir(baseDir, { recursive: true });

  for (const type of types) {
    await fs.mkdir(`${baseDir}/${type}`, { recursive: true });
  }
}

async function captureScreenshots(sites) {
  const browser = await chromium.launch();

  for (const site of sites) {
    let context;
    try {
      const url = site.site.startsWith("http")
        ? site.site
        : `https://${site.site}`;
      console.log(`Capturing screenshot for ${url}`);

      context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        timeout: 30000,
      });

      const page = await context.newPage();
      await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      const pageHeight = await page.evaluate(
        () => document.documentElement.scrollHeight
      );
      const aspectRatio = 1920 / pageHeight;
      const newHeight = Math.round(600 / aspectRatio);

      await page.setViewportSize({ width: 1920, height: pageHeight });
      await page.screenshot({
        path: `src/lib/siteData/screenshots/${site.type}/${site.site}.png`,
        fullPage: true,
      });
    } catch (error) {
      console.error(`Error capturing ${site.site}:`, error);
    } finally {
      if (context) {
        await context
          .close()
          .catch((e) => console.error("Error closing context:", e));
      }
    }
  }

  await browser
    .close()
    .catch((e) => console.error("Error closing browser:", e));
}

async function convertPNGtoWebP(sites) {
  const baseDir = "./src/lib/siteData/screenshots";
  const types = [...new Set(sites.map((site) => site.type))];

  for (const type of types) {
    const typeDir = path.join(baseDir, type);
    try {
      const files = await fs.readdir(typeDir);
      const pngFiles = files.filter((file) => file.endsWith(".png"));

      for (const pngFile of pngFiles) {
        const inputPath = path.join(typeDir, pngFile);
        const outputPath = path.join(typeDir, pngFile.replace(".png", ".webp"));

        console.log(`Converting ${pngFile} to WebP...`);

        await sharp(inputPath)
          .resize(600, null, {
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(outputPath);

        // Delete the original PNG file after conversion
        await fs.unlink(inputPath);
      }
    } catch (error) {
      console.error(`Error processing directory ${type}:`, error);
    }
  }

  console.log("Conversion complete!");
}

async function main() {
  console.log("Copying sites file and importing data...");
  const sites = await init();

  console.log("Cleaning screenshots directory...");
  await cleanDirectory(sites);

  console.log("Creating directories...");
  await ensureDirectories(sites);

  console.log("Starting screenshot capture...");
  await captureScreenshots(sites);

  console.log("Starting WebP conversion...");
  await convertPNGtoWebP(sites);

  console.log("All operations completed!");
}

main().catch(console.error);
