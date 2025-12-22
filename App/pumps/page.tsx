"use client"

import React, { useEffect, useState } from 'react'

export default function PumpsPage() {
  const [pumps, setPumps] = useState<any[]>([])
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${apiUrl}/pumps`)
        const data = await res.json()
        setPumps(data)
      } catch (err) {
        console.error(err)
      }
    })()

    const es = new EventSource(`${apiUrl}/events`)
    es.onmessage = (e) => {
      try {
        const obj = JSON.parse(e.data)
        if (obj.type === 'pump.created') setPumps((s) => [obj.payload, ...s])
      } catch (err) { console.error(err) }
    }
    es.onerror = () => es.close()
    return () => es.close()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Pumps</h1>
      <ul>
        {pumps.map((p) => (
          <li key={p.id} style={{ marginBottom: 8 }}>{p.pumpNumber} — {p.status}</li>
        ))}
      </ul>
    </div>
  )
}
