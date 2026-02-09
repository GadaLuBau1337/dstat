'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const timer = setInterval(async () => {
      const res = await fetch('/api/traffic', {
        cache: 'no-store'
      })
      setData(await res.json())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!data) return <h1 style={{ padding: 40 }}>Loading…</h1>

  return (
    <main style={{ padding: 40 }}>
      <h1>DSTAT NETWORK</h1>
      <h2>RPS: {data.rps}</h2>

      <p>Allowed: {data.allowed}</p>
      <p>Rate Limited: {data.rate_limited}</p>
      <p>Blocked: {data.blocked}</p>

      <h3>ATTACK LEVEL: {data.attack}</h3>

      <p style={{ opacity: 0.6, marginTop: 30 }}>
        Application-level traffic after edge filtering
      </p>
    </main>
  )
}
