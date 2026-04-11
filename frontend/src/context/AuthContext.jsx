// ─────────────────────────────────────────────
//  CIVIQ — AuthContext (JSX)
//  login · logout · useAuth hook
//  Persists to localStorage
// ─────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from 'react'
import { getUserByEmail } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('civiq_user')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      localStorage.removeItem('civiq_user')
    } finally {
      setLoading(false)
    }
  }, [])

  // login — checks against mockData, returns error string or null
  function login(email, password) {
    const found = getUserByEmail(email.trim().toLowerCase())
    if (!found) return 'No account found with this email.'
    if (found.password !== password) return 'Incorrect password.'

    // Strip password before storing
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('civiq_user', JSON.stringify(safeUser))
    return null
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('civiq_user')
  }

  // Role checks
  const isAdmin      = user?.role === 'admin'
  const isOfficer    = user?.role === 'officer'
  const isSupervisor = user?.role === 'supervisor'

  // Redirect path based on role
  function getDashboardPath() {
    if (isAdmin)      return '/admin/dashboard'
    if (isOfficer)    return '/officer/dashboard'
    if (isSupervisor) return '/supervisor/dashboard'
    return '/login'
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAdmin,
      isOfficer,
      isSupervisor,
      getDashboardPath,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
