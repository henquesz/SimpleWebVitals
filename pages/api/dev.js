// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' })
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
  
        if(req.method === 'GET') {
          return res.status(200).json(({
            Informations: {
                Desenvolvedor: "Vinicius Henques de Almeida",
                Cargo: "Full Stack Engineer jr",
                Skills: "NodeJS, ReactJS / Native, VueJS, C#, Java, Javascript e outras.",
                LinkedIn: "https://www.linkedin.com/in/vinicius-henques-5a843a1b9/",
                GitHub: "https://github.com/henquesz",
                Portfolio: "see my portfólio at https://viniciushenquesportfolio.vercel.app"
            }
          }))
      }
  }
  