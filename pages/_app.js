import '../styles/globals.css'

function MyApp({ Component, pageProps }, req, res) {
  res.setHeader('Cache-Control', 's-maxage-10, stale-while-revalidate');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return <Component {...pageProps} />
}

export default MyApp
