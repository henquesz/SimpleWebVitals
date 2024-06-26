const puppeteer = require('puppeteer');


async function lcp(url, req, res) {

// Launch a headless browser
const browser = await puppeteer.launch({ 
  headless: true,
});
const page = await browser.newPage();

// Navigate to the URL
await page.goto(url, { waitUntil: 'networkidle2' });

// Inject a script to measure LCP
let lcp = await page.evaluate(() => {
  return new Promise(resolve => {
    let largestContentfulPaint = 0;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    // Simulate page load period
    setTimeout(() => {
      observer.disconnect();
      resolve(largestContentfulPaint);
    }, 5000); // Wait 5 seconds to simulate page load
  });
});

lcp = (lcp / 1000).toFixed(2);

console.log('Largest Contentful Paint (LCP):', lcp ? `${lcp}s` : 'No LCP measured');

// res.status(200).json({'Largest Contentful Paint (LCP):': lcp ? `${lcp}s` : 'No LCP measured'});

// Close the browser
await browser.close();

let statuslcp;
if(parseInt(lcp) <= 2.5){
  statuslcp = 'Good';
}
else if(parseInt(lcp) > 2.5 && parseInt(lcp) <= 4.0){
  statuslcp = 'Need Improvement';
}
else{
  statuslcp = 'Poor';
}

return {'LCP': lcp, 'Status': statuslcp};
}

module.exports = lcp;
