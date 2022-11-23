// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  const pokeApi = await fetch("https://pokeapi.co/api/v2/pokemon?limit=18");
  const pokeResponseJson = await pokeApi.json();
    res.setHeader('Cache-Control', 's-maxage-10, stale-while-revalidate');
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   });
      res.json({
          pokemon: pokeResponseJson
      })
  console.log(pokeResponseJson);
}
