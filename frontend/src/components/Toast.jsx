// ─────────────────────────────────────────────
//  CIVIQ — Toast Component (JSX)
//  White card · solid circle icon · plain ✕ · progress bar
// ─────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'

const iconConfig = {
  success: {
    bg: '#16A34A', bar: '#16A34A',
    icon: <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  },
  error: {
    bg: '#DC2626', bar: '#DC2626',
    icon: <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  },
  warning: {
    bg: '#D97706', bar: '#D97706',
    icon: <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  },
  info: {
    bg: '#2563EB', bar: '#2563EB',
    icon: <svg width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
}

function ToastCard({ toast, onDismiss }) {
  const [visible,  setVisible]  = useState(false)
  const [progress, setProgress] = useState(100)
  const duration = toast.duration ?? 4000
  const cfg = iconConfig[toast.type]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const start = Date.now()
    let raf
    const frame = () => {
      const pct = Math.max(0, 100 - ((Date.now() - start) / duration) * 100)
      setProgress(pct)
      if (pct > 0) { raf = requestAnimationFrame(frame) }
      else { handleDismiss() }
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    setTimeout(() => onDismiss(toast.id), 250)
  }

  return (
    <div style={{
      width: 360, borderRadius: 14, overflow: 'hidden',
      background: '#FFFFFF', border: '1px solid #E4E4E7',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(16px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {cfg.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: '#09090B', lineHeight: 1.4, margin: 0 }}>{toast.message}</p>
          {toast.description && <p style={{ fontSize: 12, color: '#71717A', marginTop: 4, lineHeight: 1.4 }}>{toast.description}</p>}
          {toast.action && (
            <button onClick={toast.action.onClick} style={{ fontSize: 12, fontWeight: 500, color: '#5E6AD2', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 6, display: 'block' }}>
              {toast.action.label} →
            </button>
          )}
        </div>
        <button onClick={handleDismiss} style={{ fontSize: 18, lineHeight: 1, color: '#A1A1AA', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, marginTop: 2, fontWeight: 300 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#71717A')}
          onMouseLeave={e => (e.currentTarget.style.color = '#A1A1AA')}
        >✕</button>
      </div>
      <div style={{ height: 4, background: '#F4F4F5' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: cfg.bar, transition: 'none', borderRadius: '0 2px 2px 0' }} />
      </div>
    </div>
  )
}

// ─── Internal store ────────────────────────────
let _toasts   = []
let _listeners = []

function notify() { _listeners.forEach(l => l()) }
function addToast(t)      { _toasts = [..._toasts, t]; notify() }
function removeToast(id)  { _toasts = _toasts.filter(t => t.id !== id); notify() }

function useToastState() {
  const [, tick] = useState(0)
  useEffect(() => {
    const l = () => tick(n => n + 1)
    _listeners.push(l)
    return () => { _listeners = _listeners.filter(x => x !== l) }
  }, [])
  return { toasts: _toasts, dismiss: removeToast }
}

export function ToastContainer() {
  const { toasts, dismiss } = useToastState()
  if (!toasts.length) return null
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
      {toasts.map(t => <ToastCard key={t.id} toast={t} onDismiss={dismiss} />)}
    </div>
  )
}

export function useToast() {
  const fire = useCallback((type, message, opts) => {
    addToast({ id: Math.random().toString(36).slice(2), type, message, ...opts })
  }, [])
  return {
    toast: {
      success: (msg, opts) => fire('success', msg, opts),
      error:   (msg, opts) => fire('error',   msg, opts),
      warning: (msg, opts) => fire('warning', msg, opts),
      info:    (msg, opts) => fire('info',    msg, opts),
    },
  }
}

export default ToastCard
