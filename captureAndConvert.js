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

async function filterProblematicSites(sites) {
  // Sites that are known to have issues or are no longer accessible
  const problematicSites = [
    // Removed the two sites that need screenshots
  ];

  return sites.filter((site) => !problematicSites.includes(site.site));
}

async function getSiteConfig(site) {
  // Special configuration for sites that are known to be slow or problematic
  const slowSites = ["americansolarprograms.com", "bath.serviceselector.net"];

  if (slowSites.includes(site.site)) {
    return {
      timeout: 120000, // 2 minutes
      maxRetries: 4, // More retries for slow sites
      waitStrategy: "load", // Use 'load' instead of 'domcontentloaded'
      extraWait: 15000, // Wait 15 seconds after load
    };
  }

  return {
    timeout: 60000, // 1 minute
    maxRetries: 2, // Standard retries
    waitStrategy: "domcontentloaded",
    extraWait: 10000, // Wait 10 seconds after load
  };
}

async function captureScreenshots(sites) {
  // Filter out known problematic sites
  const filteredSites = await filterProblematicSites(sites);
  console.log(
    `Filtered out ${sites.length - filteredSites.length} problematic sites`
  );

  const browser = await chromium.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  let successCount = 0;
  let failureCount = 0;

  for (const site of filteredSites) {
    let context;
    let retries = 0;
    const siteConfig = await getSiteConfig(site);

    while (retries <= siteConfig.maxRetries) {
      try {
        const url = site.site.startsWith("http")
          ? site.site
          : `https://${site.site}`;
        console.log(
          `Capturing screenshot for ${url} (attempt ${retries + 1}/${
            siteConfig.maxRetries + 1
          })`
        );

        context = await browser.newContext({
          viewport: { width: 1920, height: 1080 },
          timeout: siteConfig.timeout,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        });

        const page = await context.newPage();

        // Set longer timeout for navigation
        await page.goto(url, {
          waitUntil: siteConfig.waitStrategy,
          timeout: siteConfig.timeout,
        });

        // Wait additional time for slow sites
        console.log(
          `Waiting ${siteConfig.extraWait / 1000} seconds for ${
            site.site
          } to fully load...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, siteConfig.extraWait)
        );

        // Wait a bit more for any remaining resources
        try {
          await page.waitForLoadState("networkidle", { timeout: 10000 });
        } catch (e) {
          console.log(
            `Network idle timeout for ${site.site}, continuing anyway...`
          );
        }

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

        console.log(`Successfully captured ${site.site}`);
        successCount++;
        break; // Success, exit retry loop
      } catch (error) {
        retries++;
        console.error(
          `Error capturing ${site.site} (attempt ${retries}/${
            siteConfig.maxRetries + 1
          }):`,
          error.message
        );

        if (retries > siteConfig.maxRetries) {
          console.error(
            `Failed to capture ${site.site} after ${
              siteConfig.maxRetries + 1
            } attempts`
          );
          failureCount++;
        } else {
          console.log(`Retrying ${site.site} in 3 seconds...`);
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      } finally {
        if (context) {
          await context
            .close()
            .catch((e) => console.error("Error closing context:", e));
        }
      }
    }
  }

  console.log(
    `Screenshot capture completed: ${successCount} successful, ${failureCount} failed`
  );

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
  try {
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

    console.log("All operations completed successfully!");
  } catch (error) {
    console.error("Error in main process:", error);
    process.exit(1);
  }
}

main().catch(console.error);
