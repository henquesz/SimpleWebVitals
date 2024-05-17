const puppeteer = require('puppeteer');


export default async function inp(req, res, url) {
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
    
      // Inject a script to measure INP
      const inp = await page.evaluate(() => {
        return new Promise(resolve => {
          let maxInteractionToNextPaint = 0;
    
          // Function to handle interaction events
          const handleInteraction = (entry) => {
            // Create a PerformanceObserver for the next paint
            const paintObserver = new PerformanceObserver((paintList) => {
              const paintEntries = paintList.getEntries();
              const lastPaint = paintEntries[paintEntries.length - 1];
    
              // Calculate the delay from interaction to next paint
              const interactionToNextPaint = lastPaint.startTime - entry.startTime;
              maxInteractionToNextPaint = Math.max(maxInteractionToNextPaint, interactionToNextPaint);
    
              // Disconnect observer after getting the paint timing
              paintObserver.disconnect();
            });
    
            paintObserver.observe({ type: 'paint', buffered: true });
          };
    
          // Create a PerformanceObserver for interaction events
          const interactionObserver = new PerformanceObserver((interactionList) => {
            interactionList.getEntries().forEach(handleInteraction);
          });
    
          interactionObserver.observe({ type: 'first-input', buffered: true });
    
          // Simulate user interaction and measure INP for a certain period
          setTimeout(() => {
            interactionObserver.disconnect();
            resolve(maxInteractionToNextPaint);
          }, 5000); // Wait 5 seconds to simulate interaction
        });
      });
    
      console.log('Interaction to Next Paint (INP):', inp ? `${inp} ms` : 'No INP measured');

      res.status(200).json({'Interaction to Next Paint (INP):': inp ? `${inp} ms` : 'No INP measured'});
    
      // Close the browser
      await browser.close();
}