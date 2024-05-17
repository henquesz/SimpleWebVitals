// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// poke api informations with allow cors

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    var ttfb;
    var jsonRetorno;

      const url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/';
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
              res.status(200).json({ ttfb: jsonRetorno });
            } else {
              console.error('No performance entries found for URL:', url);
              jsonRetorno = {'result': `No performance entries found for URL: ${url}`};
              res.status(500).json({ error: jsonRetorno });
            }
          }, 0);
        } catch (error) {
          console.error('Error fetching URL:', error);
        }
      };
  
      fetchUrl();

}
