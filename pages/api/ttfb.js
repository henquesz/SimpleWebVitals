// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// poke api informations with allow cors

async function ttfb(url, req, res) {

    var ttfb;
    var jsonRetorno;

      const fetchUrl = async () => {
        if (performance && performance.clearResourceTimings) {
          performance.clearResourceTimings();
        }
  
        try {
          const startTime = performance.now();
          const response = await fetch(url);
          const endTime = performance.now();
  
          if (!response.ok) {
            console.error('Failed to load URL. Status:', response.status);
            return;
          }
  
          // Espera o navegador registrar a entrada de performance
          setTimeout(() => {
            const entries = performance.getEntriesByName(url);
            if (entries.length > 0) {
              ttfb = entries[0].responseStart;
              console.log('Time to first byte:', ttfb, 'milliseconds');
              jsonRetorno = {'result': ttfb};
              return jsonRetorno;
            } else {
              console.error('No performance entries found for URL:', url);
              jsonRetorno = {'result': `No performance entries found for URL: ${url}`};
              return jsonRetorno;
            }
          }, 0);
        } catch (error) {
          console.error('Error fetching URL:', error);
        }
      };
  
      fetchUrl();

}

module.exports = ttfb;
