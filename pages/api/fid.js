const puppeteer = require("puppeteer");
import isValidURL from "../../utils/urlValidator";

async function fid(url, req, res) {
  console.log(url);

  if (!isValidURL(url)) {
    url = "https://ibrapsi.com.br/graduacao-em-psicanalise/";
  }

  console.log(url);

  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/google-chrome-stable",
  });
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Inject a script to measure performance metrics
  const metrics = await page.evaluate(() => {
    // Performance observer to capture first input delay
    let firstInputDelay = null;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "first-input") {
          firstInputDelay = entry.processingStart - entry.startTime;
        }
      }
    });

    observer.observe({ type: "first-input", buffered: true });

    // Simulate user interaction delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get all performance entries
        const entries = performance.getEntries();

        // Get other performance metrics
        const { timing } = performance;
        const metrics = {
          firstPaint: timing.responseStart - timing.navigationStart + "ms",
          firstContentfulPaint:
            timing.domContentLoadedEventEnd - timing.navigationStart + "ms",
          firstInputDelay,
        };

        let statusfirstpaint;
        if (parseInt(metrics.firstPaint) <= 100) {
          statusfirstpaint = "Good";
        } else if (
          parseInt(metrics.firstPaint) > 100 &&
          parseInt(metrics.firstPaint) <= 300
        ) {
          statusfirstpaint = "Need improvement";
        } else {
          statusfirstpaint = "Poor";
        }

        let statusContentFulPaint;
        if (parseInt(metrics.firstContentfulPaint) <= 1800) {
          statusContentFulPaint = "Good";
        } else if (
          parseInt(metrics.firstContentfulPaint) > 1800 &&
          parseInt(metrics.firstContentfulPaint) <= 3000
        ) {
          statusContentFulPaint = "Need improvement";
        } else {
          statusContentFulPaint = "Poor";
        }

        const metricsFinal = {
          firstPaint: {
            latency: timing.responseStart - timing.navigationStart + "ms",
            status: statusfirstpaint,
          },
          firstContentfulPaint: {
            latency:
              timing.domContentLoadedEventEnd - timing.navigationStart + "ms",
            status: statusContentFulPaint,
          },
          firstInputDelay,
        };

        resolve(metricsFinal);
      }, 5000); // Wait 5 seconds to simulate interaction
    });
  });

  console.log("Metrics:", metrics);
  console.log(
    "First Input Delay (FID):",
    metrics.firstInputDelay
      ? `${metrics.firstInputDelay} ms`
      : "No FID measured"
  );

  // Close the browser
  await browser.close();

  return metrics;
}

module.exports = fid;
