import cls from "./cls";
import lcp from "./lcp";
import ttfb from "./ttfb";
import inp from "./inp";
import fid from "./fid";

export default async function general(req, res, url) {
    let resultCLS = '';
    let resultLCP = '';
    let resultFID = '';
    let resultTTFB = '';
    let resultINP = '';

    try{
         resultLCP = await lcp(url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/');
         resultTTFB = await ttfb(url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/');
         resultCLS = await cls(url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/');
         resultINP = await inp(url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/');
         resultFID = await fid.execute(url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/');
    
    }catch(e){
        console.log(e);
    }

    const results = {
        resultCLS,
        resultFID,
        resultINP,
        resultLCP,
        resultTTFB
    };

    res.status(200).json({'metricResults': results});
}