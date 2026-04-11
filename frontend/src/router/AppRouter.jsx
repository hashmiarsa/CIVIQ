// ─────────────────────────────────────────────
//  CIVIQ — AppRouter (JSX)
//  All 33 routes · Protected · Role-based
//  React Router DOM v7
// ─────────────────────────────────────────────

import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/DashboardLayout'

// ── Auth ────────────────────────────────────
import Login from '../pages/auth/Login'

// ── Admin ───────────────────────────────────
import AdminDashboard       from '../pages/admin/AdminDashboard'
import AdminProjects        from '../pages/admin/AdminProjects'
import AdminProjectDetail   from '../pages/admin/AdminProjectDetail'
import AdminConflicts       from '../pages/admin/AdminConflicts'
import AdminConflictDetail  from '../pages/admin/AdminConflictDetail'
import AdminMap             from '../pages/admin/AdminMap'
import AdminComplaints      from '../pages/admin/AdminComplaints'
import AdminComplaintDetail from '../pages/admin/AdminComplaintDetail'
import AdminAudit           from '../pages/admin/AdminAudit'
import AdminUsers           from '../pages/admin/AdminUsers'
import AdminUserDetail      from '../pages/admin/AdminUserDetail'
import AdminSettings        from '../pages/admin/AdminSettings'

// ── Officer ─────────────────────────────────
import OfficerDashboard       from '../pages/officer/OfficerDashboard'
import OfficerProjects        from '../pages/officer/OfficerProjects'
import OfficerProjectNew      from '../pages/officer/OfficerProjectNew'
import OfficerProjectDetail   from '../pages/officer/OfficerProjectDetail'
import OfficerClashRespond    from '../pages/officer/OfficerClashRespond'
import OfficerConflicts       from '../pages/officer/OfficerConflicts'
import OfficerConflictDetail  from '../pages/officer/OfficerConflictDetail'
import OfficerMap             from '../pages/officer/OfficerMap'
import OfficerComplaints      from '../pages/officer/OfficerComplaints'
import OfficerComplaintDetail from '../pages/officer/OfficerComplaintDetail'
import OfficerSettings        from '../pages/officer/OfficerSettings'

// ── Supervisor ──────────────────────────────
import SupervisorDashboard  from '../pages/supervisor/SupervisorDashboard'
import SupervisorTasks      from '../pages/supervisor/SupervisorTasks'
import SupervisorTaskDetail from '../pages/supervisor/SupervisorTaskDetail'
import SupervisorSettings   from '../pages/supervisor/SupervisorSettings'

// ── Citizen ─────────────────────────────────
import CitizenHome          from '../pages/citizen/CitizenHome'
import CitizenProjects      from '../pages/citizen/CitizenProjects'
import CitizenProjectDetail from '../pages/citizen/CitizenProjectDetail'
import CitizenReport        from '../pages/citizen/CitizenReport'
import CitizenTrack         from '../pages/citizen/CitizenTrack'
import CitizenNotFound      from '../pages/citizen/CitizenNotFound'

// ─────────────────────────────────────────────
//  Route Guards
// ─────────────────────────────────────────────

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

function RoleRoute({ children, role }) {
  const { user, loading, getDashboardPath } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to={getDashboardPath()} replace />
  return children
}

// ─────────────────────────────────────────────
//  Admin Layout Wrapper
//  Reads current path to set activeItem on sidebar
// ─────────────────────────────────────────────

const PAGE_TITLES = {
  dashboard:  'Dashboard',
  projects:   'Projects',
  conflicts:  'Conflicts',
  map:        'City Map',
  complaints: 'Complaints',
  audit:      'Audit Log',
  users:      'User Management',
  settings:   'Settings',
}

function AdminLayout({ children, activeItem }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <DashboardLayout
      role="admin"
      activeItem={activeItem}
      pageTitle={PAGE_TITLES[activeItem] || 'Dashboard'}
      userName={user?.name || 'Rajesh Kumar'}
      userInitials={user?.initials || 'RK'}
      userRole={user?.roleLabel || 'Municipal Coordinator'}
      notificationCount={2}
      onNavigate={(item) => {
        if (item === 'dashboard')  navigate('/admin/dashboard')
        if (item === 'projects')   navigate('/admin/projects')
        if (item === 'conflicts')  navigate('/admin/conflicts')
        if (item === 'map')        navigate('/admin/map')
        if (item === 'complaints') navigate('/admin/complaints')
        if (item === 'audit')      navigate('/admin/audit')
        if (item === 'users')      navigate('/admin/users')
        if (item === 'settings')   navigate('/admin/settings')
      }}
    >
      {children}
    </DashboardLayout>
  )
}

// ─────────────────────────────────────────────
//  Officer Layout Wrapper
// ─────────────────────────────────────────────

function OfficerLayout({ children, activeItem }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <DashboardLayout
      role="officer"
      activeItem={activeItem}
      pageTitle={PAGE_TITLES[activeItem] || 'Dashboard'}
      userName={user?.name || 'Anil Sharma'}
      userInitials={user?.initials || 'AS'}
      userRole={user?.roleLabel || 'Executive Engineer'}
      notificationCount={1}
      onNavigate={(item) => {
        if (item === 'dashboard')  navigate('/officer/dashboard')
        if (item === 'projects')   navigate('/officer/projects')
        if (item === 'conflicts')  navigate('/officer/conflicts')
        if (item === 'map')        navigate('/officer/map')
        if (item === 'complaints') navigate('/officer/complaints')
        if (item === 'settings')   navigate('/officer/settings')
      }}
    >
      {children}
    </DashboardLayout>
  )
}

// ─────────────────────────────────────────────
//  Supervisor Layout Wrapper
// ─────────────────────────────────────────────

function SupervisorLayout({ children, activeItem }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <DashboardLayout
      role="supervisor"
      activeItem={activeItem}
      pageTitle={PAGE_TITLES[activeItem] || 'Dashboard'}
      userName={user?.name || 'Deepak Verma'}
      userInitials={user?.initials || 'DV'}
      userRole={user?.roleLabel || 'Junior Engineer'}
      notificationCount={0}
      onNavigate={(item) => {
        if (item === 'dashboard') navigate('/supervisor/dashboard')
        if (item === 'tasks')     navigate('/supervisor/tasks')
        if (item === 'settings')  navigate('/supervisor/settings')
      }}
    >
      {children}
    </DashboardLayout>
  )
}

// ─────────────────────────────────────────────
//  Router
// ─────────────────────────────────────────────

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Default → /login ── */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ── Auth ── */}
        <Route path="/login" element={<Login />} />

        {/* ── Admin routes (12) ── */}
        <Route path="/admin/dashboard"      element={<RoleRoute role="admin"><AdminLayout activeItem="dashboard"><AdminDashboard /></AdminLayout></RoleRoute>} />
        <Route path="/admin/projects"       element={<RoleRoute role="admin"><AdminLayout activeItem="projects"><AdminProjects /></AdminLayout></RoleRoute>} />
        <Route path="/admin/projects/:id"   element={<RoleRoute role="admin"><AdminLayout activeItem="projects"><AdminProjectDetail /></AdminLayout></RoleRoute>} />
        <Route path="/admin/conflicts"      element={<RoleRoute role="admin"><AdminLayout activeItem="conflicts"><AdminConflicts /></AdminLayout></RoleRoute>} />
        <Route path="/admin/conflicts/:id"  element={<RoleRoute role="admin"><AdminLayout activeItem="conflicts"><AdminConflictDetail /></AdminLayout></RoleRoute>} />
        <Route path="/admin/map"            element={<RoleRoute role="admin"><AdminLayout activeItem="map"><AdminMap /></AdminLayout></RoleRoute>} />
        <Route path="/admin/complaints"     element={<RoleRoute role="admin"><AdminLayout activeItem="complaints"><AdminComplaints /></AdminLayout></RoleRoute>} />
        <Route path="/admin/complaints/:id" element={<RoleRoute role="admin"><AdminLayout activeItem="complaints"><AdminComplaintDetail /></AdminLayout></RoleRoute>} />
        <Route path="/admin/audit"          element={<RoleRoute role="admin"><AdminLayout activeItem="audit"><AdminAudit /></AdminLayout></RoleRoute>} />
        <Route path="/admin/users"          element={<RoleRoute role="admin"><AdminLayout activeItem="users"><AdminUsers /></AdminLayout></RoleRoute>} />
        <Route path="/admin/users/:id"      element={<RoleRoute role="admin"><AdminLayout activeItem="users"><AdminUserDetail /></AdminLayout></RoleRoute>} />
        <Route path="/admin/settings"       element={<RoleRoute role="admin"><AdminLayout activeItem="settings"><AdminSettings /></AdminLayout></RoleRoute>} />

        {/* ── Officer routes (11) ── */}
        <Route path="/officer/dashboard"            element={<RoleRoute role="officer"><OfficerLayout activeItem="dashboard"><OfficerDashboard /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/projects"             element={<RoleRoute role="officer"><OfficerLayout activeItem="projects"><OfficerProjects /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/projects/new"         element={<RoleRoute role="officer"><OfficerLayout activeItem="projects"><OfficerProjectNew /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/projects/:id"         element={<RoleRoute role="officer"><OfficerLayout activeItem="projects"><OfficerProjectDetail /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/projects/:id/respond" element={<RoleRoute role="officer"><OfficerLayout activeItem="projects"><OfficerClashRespond /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/conflicts"            element={<RoleRoute role="officer"><OfficerLayout activeItem="conflicts"><OfficerConflicts /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/conflicts/:id"        element={<RoleRoute role="officer"><OfficerLayout activeItem="conflicts"><OfficerConflictDetail /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/map"                  element={<RoleRoute role="officer"><OfficerLayout activeItem="map"><OfficerMap /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/complaints"           element={<RoleRoute role="officer"><OfficerLayout activeItem="complaints"><OfficerComplaints /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/complaints/:id"       element={<RoleRoute role="officer"><OfficerLayout activeItem="complaints"><OfficerComplaintDetail /></OfficerLayout></RoleRoute>} />
        <Route path="/officer/settings"             element={<RoleRoute role="officer"><OfficerLayout activeItem="settings"><OfficerSettings /></OfficerLayout></RoleRoute>} />

        {/* ── Supervisor routes (4) ── */}
        <Route path="/supervisor/dashboard" element={<RoleRoute role="supervisor"><SupervisorLayout activeItem="dashboard"><SupervisorDashboard /></SupervisorLayout></RoleRoute>} />
        <Route path="/supervisor/tasks"     element={<RoleRoute role="supervisor"><SupervisorLayout activeItem="tasks"><SupervisorTasks /></SupervisorLayout></RoleRoute>} />
        <Route path="/supervisor/tasks/:id" element={<RoleRoute role="supervisor"><SupervisorLayout activeItem="tasks"><SupervisorTaskDetail /></SupervisorLayout></RoleRoute>} />
        <Route path="/supervisor/settings"  element={<RoleRoute role="supervisor"><SupervisorLayout activeItem="settings"><SupervisorSettings /></SupervisorLayout></RoleRoute>} />

        {/* ── Citizen routes (6) ── */}
        <Route path="/home"         element={<CitizenHome />} />
        <Route path="/projects"     element={<CitizenProjects />} />
        <Route path="/projects/:id" element={<CitizenProjectDetail />} />
        <Route path="/report"       element={<CitizenReport />} />
        <Route path="/track"        element={<CitizenTrack />} />

        {/* ── 404 ── */}
        <Route path="*" element={<CitizenNotFound />} />

      </Routes>
    </BrowserRouter>
  )
}