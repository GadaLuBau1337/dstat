export const runtime = 'edge'

let bucket = {
  second: Date.now(),
  rps: 0,
  allowed: 0,
  rate_limited: 0,
  blocked: 0
}

export async function GET(req) {
  const status =
    req.headers.get('x-dstat-status') || 'allowed'

  const now = Date.now()

  if (now - bucket.second >= 1000) {
    bucket.second = now
    bucket.rps = 0
  }

  bucket.rps++
  bucket[status]++

  let attack = 'NORMAL'
  if (bucket.rps > 50) attack = 'ELEVATED'
  if (bucket.rps > 150) attack = 'HIGH'
  if (bucket.rps > 300) attack = 'SEVERE'

  return new Response(
    JSON.stringify({
      rps: bucket.rps,
      allowed: bucket.allowed,
      rate_limited: bucket.rate_limited,
      blocked: bucket.blocked,
      attack
    }),
    {
      headers: { 'content-type': 'application/json' }
    }
  )
}
