// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })

  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

  const pokeApi = await fetch("https://pokeapi.co/api/v2/pokemon?limit=18", {mode: 'cors', credentials: 'include'});
  const pokeResponseJson = await pokeApi.json();

      if(req.method === 'GET') {
        return res.status(200).json(({
          pokemon: pokeResponseJson
        }))
    }
  console.log(pokeResponseJson);
}
