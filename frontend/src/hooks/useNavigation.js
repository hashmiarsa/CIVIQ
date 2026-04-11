// ─────────────────────────────────────────────
//  CIVIQ — useAdminNav hook
//  Shared navigation handler for all admin pages
// ─────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'

export function useAdminNav() {
  const navigate = useNavigate()
  return function handleNavigate(id) {
    const routes = {
      dashboard:  '/admin/dashboard',
      projects:   '/admin/projects',
      conflicts:  '/admin/conflicts',
      map:        '/admin/map',
      complaints: '/admin/complaints',
      audit:      '/admin/audit',
      users:      '/admin/users',
      settings:   '/admin/settings',
    }
    if (routes[id]) navigate(routes[id])
  }
}

export function useOfficerNav() {
  const navigate = useNavigate()
  return function handleNavigate(id) {
    const routes = {
      dashboard:  '/officer/dashboard',
      projects:   '/officer/projects',
      conflicts:  '/officer/conflicts',
      map:        '/officer/map',
      complaints: '/officer/complaints',
      settings:   '/officer/settings',
    }
    if (routes[id]) navigate(routes[id])
  }
}

export function useSupervisorNav() {
  const navigate = useNavigate()
  return function handleNavigate(id) {
    const routes = {
      dashboard: '/supervisor/dashboard',
      tasks:     '/supervisor/tasks',
      settings:  '/supervisor/settings',
    }
    if (routes[id]) navigate(routes[id])
  }
}