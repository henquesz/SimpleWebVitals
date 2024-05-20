const puppeteer = require('puppeteer');

async function inp(url, req, res) {
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
    
      // Close the browser
      await browser.close();

      let statusInp;
      if(!inp){
        statusInp = 'Interaction to Next Paint (INP): No INP measured';
      }
      else if(parseInt(inp) <= 200){
        statusInp = 'Good';
      }
      else if( parseInt(inp) > 200 && parseInt(inp) <= 500){
        statusInp = 'Need Improvement';
      }
      else if(parseInt(inp) > 500){
        statusInp = 'Poor';
      }

      return {'INP': inp, 'Status': statusInp};
}

module.exports = inp;
