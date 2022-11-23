// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  const pokeApi = await fetch("https://pokeapi.co/api/v2/pokemon?limit=18");
  const pokeResponseJson = await pokeApi.json();

    res.setHeader('Cache-Control', 's-maxage-10, stale-while-revalidate', 'Access-Control-Allow-Origin', '*', 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.json({
          pokemon: pokeResponseJson
      })
  console.log(pokeResponseJson);
}
