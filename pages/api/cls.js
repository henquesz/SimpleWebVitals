const puppeteer = require("puppeteer");

async function cls(url, req, res) {
  // Launch a headless browser
  const browser = await puppeteer.launch({ 
    headless: true, 
  });
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Inject a script to measure CLS
  const cls = await page.evaluate(() => {
    let cumulativeLayoutShiftScore = 0;

    // Function to handle layout shift events
    const handleLayoutShift = (entry) => {
      // Only count layout shifts without user input
      if (!entry.hadRecentInput) {
        cumulativeLayoutShiftScore += entry.value;
      }
    };

    // Create a PerformanceObserver for layout shifts
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(handleLayoutShift);
    });

    observer.observe({ type: "layout-shift", buffered: true });

    return new Promise((resolve) => {
      // Observe for a certain period to simulate page load
      setTimeout(() => {
        observer.disconnect();
        resolve(cumulativeLayoutShiftScore);
      }, 5000); // Wait 5 seconds to simulate interaction
    });
  });

  console.log("Cumulative Layout Shift (CLS):", cls);

  // Close the browser
  await browser.close();
  let statusCls;
  if(parseInt(cls) <= 0.1){
    statusCls = 'Good';
  }
  else if(parseInt(cls) > 0.1 && parseInt(cls) <= 0.25){
    statusCls = 'Need Improvement';
  }
  else{
    statusCls = 'Poor';
  }

  return {'CLS': cls, 'Status': statusCls};
} 

module.exports = cls;
