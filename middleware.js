import { NextResponse } from 'next/server'

const WINDOW = 10_000 // 10 detik
const LIMIT = 120     // request / window / IP

const store = new Map()

export function middleware(req) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    'unknown'

  const now = Date.now()
  let data = store.get(ip)

  if (!data || now - data.start > WINDOW) {
    data = { count: 0, start: now }
  }

  data.count++
  store.set(ip, data)

  let status = 'allowed'
  if (data.count > LIMIT) status = 'rate_limited'
  if (data.count > LIMIT * 2) status = 'blocked'

  const res = NextResponse.next()
  res.headers.set('x-dstat-status', status)
  return res
}

export const config = {
  matcher: '/:path*'
}
