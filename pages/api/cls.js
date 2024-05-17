const puppeteer = require('puppeteer');


export default async function cls(req, res, url) {
    // res.status(200).json({ name: 'John Doe' })
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
  

      let url = url;

// Launch a headless browser
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Navigate to the URL
await page.goto(url, { waitUntil: 'networkidle2' });

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

  observer.observe({ type: 'layout-shift', buffered: true });

  return new Promise(resolve => {
    // Observe for a certain period to simulate page load
    setTimeout(() => {
      observer.disconnect();
      resolve(cumulativeLayoutShiftScore);
    }, 5000); // Wait 5 seconds to simulate interaction
  });
});

console.log('Cumulative Layout Shift (CLS):', cls);

res.status(200).json({'Cumulative Layout Shift (CLS):': cls});

// Close the browser
await browser.close();
}