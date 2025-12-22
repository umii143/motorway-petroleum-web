"use client"

import React, { useEffect, useState } from 'react'

interface Alert {
  id: string
  stationId: string
  tankId?: string
  type: string
  message: string
  level: string
  resolved: boolean
  createdAt: string
  resolvedAt?: string
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(false)
  const [stations, setStations] = useState<any[]>([])
  const [stationFilter, setStationFilter] = useState<string | null>(null)
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      const qs = stationFilter ? `?stationId=${stationFilter}` : ''
      const res = await fetch(`${apiUrl}/alerts${qs}`)
      const data = await res.json()
      setAlerts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStations = async () => {
    try {
      const res = await fetch(`${apiUrl}/stations`)
      const data = await res.json()
      setStations(data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchAlerts()
    fetchStations()

    // Setup EventSource for realtime updates
    const es = new EventSource(`${apiUrl}/events`)
    es.onmessage = (e) => {
      try {
        const obj = JSON.parse(e.data)
        if (obj.type === 'alert.created') {
          if (!stationFilter || obj.payload.stationId === stationFilter) setAlerts((s) => [obj.payload, ...s])
        } else if (obj.type === 'alert.resolved') {
          setAlerts((s) => s.map((a) => (a.id === obj.payload.id ? obj.payload : a)))
        }
      } catch (err) {
        console.error('invalid event', err)
      }
    }
    es.onerror = (err) => {
      console.error('event source error', err)
      es.close()
    }

    return () => es.close()
  }, [stationFilter])

  const resolve = async (id: string) => {
    await fetch(`${apiUrl}/alerts/${id}/resolve`, { method: 'POST' })
    // optimistic UI: mark resolved locally
    setAlerts((s) => s.map((a) => (a.id === id ? { ...a, resolved: true, resolvedAt: new Date().toISOString() } : a)))
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Alerts</h1>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="station">Station:</label>
        <select id="station" value={stationFilter || ''} onChange={(e) => setStationFilter(e.target.value || null)} style={{ marginLeft: 8 }}>
          <option value="">All</option>
          {stations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <span style={{ marginLeft: 12, fontWeight: 600 }}>{alerts.filter(a => !a.resolved).length} unresolved</span>
      </div>

      {loading && <p>Loading…</p>}
      <ul>
        {alerts.map((a) => (
          <li key={a.id} style={{ marginBottom: 12, border: '1px solid #eee', padding: 8 }}>
            <div><strong>{a.type}</strong> — <em>{a.level}</em></div>
            <div>{a.message}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{new Date(a.createdAt).toLocaleString()}</div>
            <div>
              {a.resolved ? (
                <span style={{ color: 'green' }}>Resolved {a.resolvedAt ? `at ${new Date(a.resolvedAt).toLocaleString()}` : ''}</span>
              ) : (
                <button onClick={() => resolve(a.id)} style={{ marginTop: 8 }}>Resolve</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
