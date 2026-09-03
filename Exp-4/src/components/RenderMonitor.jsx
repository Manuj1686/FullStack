import React from 'react'
import { renderStats } from './EventCard'

export const RenderMonitor = React.memo(function RenderMonitor({ events, onReset }) {
  return <aside className="monitor-card"><div className="monitor-head"><div><h2>RENDER MONITOR</h2><div className="monitor-numbers"><span><b>{renderStats.total}</b><small>total renders logged</small></span><span><b>{events.filter(e=>renderStats.cards[e.id]>0).length}/{events.length}</b><small>cards that have rendered</small></span></div></div><button onClick={onReset}>Reset counters</button></div><div className="render-list">{events.map(event=><div className="render-row" key={event.id}><span>{event.title}</span><div className="bar"><i style={{width:`${Math.min(100, (renderStats.cards[event.id] || 0)*18 + 3)}%`}} /></div><b>{renderStats.cards[event.id] || 0}</b></div>)}</div></aside>
})
