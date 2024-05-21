import fid from './fid'
import cls from './cls';
import inp from './inp';
import lcp from './lcp';
import ttfb from './ttfb';

export default async function general(req, res) {

    let resultFID = '';
    let resultCLS = '';
    let resultINP = '';
    let resultLCP = '';
    let resultTTFB = '';

    let url = 'https://ibrapsi.com.br/graduacao-em-psicanalise/';

    try{
        resultFID = await fid(url = url);
        resultCLS = await cls(url = url);  
        resultINP = await inp(url = url);  
        resultLCP = await lcp(url = url);  
        resultTTFB = await ttfb(url = url);  

        const results = {
            resultFID,
            resultCLS,
            resultINP,
            resultLCP,
            resultTTFB
        };
        res.status(200).json({'metricResults': results});
    }catch(e){
        console.log(e);
    }
}