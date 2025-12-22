"use client"

import React, { useEffect, useState } from 'react'

export default function StationsPage() {
  const [stations, setStations] = useState<any[]>([])
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${apiUrl}/stations`)
        const data = await res.json()
        setStations(data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Stations</h1>
      <ul>
        {stations.map((s) => (
          <li key={s.id} style={{ marginBottom: 8 }}>{s.name} — {s.address || 'no address'}</li>
        ))}
      </ul>
    </div>
  )
}
