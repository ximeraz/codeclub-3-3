/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    // if the request is a POST
    const body = await request.text()
    
    // In case that the ip is in text
    const ip = body.trim()
    
    // Getting the country based on yhe ip
    const country = await getCountryFromIP(ip)
    
    // Answer with the country
    return new Response(`The country associated to the IP ${ip} is: ${country}`)
  } else {
    return new Response('This function only accept requests POST.', { status: 405 })
  }
}

async function getCountryFromIP(ip) {
  const response = await fetch(`https://ipinfo.io/${ip}/country`)
  const country = await response.text()
  return country.trim()
}

