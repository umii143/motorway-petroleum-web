"use client"

import React, { useEffect, useState } from 'react'

export default function TanksPage() {
  const [tanks, setTanks] = useState<any[]>([])
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${apiUrl}/tanks`)
        const data = await res.json()
        setTanks(data)
      } catch (err) {
        console.error(err)
      }
    })()

    const es = new EventSource(`${apiUrl}/events`)
    es.onmessage = (e) => {
      try {
        const obj = JSON.parse(e.data)
        if (obj.type === 'tank.created') setTanks((s) => [obj.payload, ...s])
        if (obj.type === 'tank.updated') setTanks((s) => s.map((t) => (t.id === obj.payload.id ? obj.payload : t)))
      } catch (err) { console.error(err) }
    }
    es.onerror = () => es.close()
    return () => es.close()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Tanks</h1>
      <ul>
        {tanks.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            {t.fuelType} — {t.currentLiters}/{t.capacityLiters} L
          </li>
        ))}
      </ul>
    </div>
  )
}
