import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { users, projects, auditLogs } from '../../data/mockData'

// ─── Helpers ───────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function getActionLabel(action) {
  const map = {
    project_approved:  'Approved project',
    project_rejected:  'Rejected project',
    project_submitted: 'Submitted project',
    conflict_resolved: 'Resolved conflict',
  }
  return map[action] || action
}

const ROLE_STYLES = {
  admin:      'bg-[#EEF2FF] text-[#4338CA] dark:bg-[#131629] dark:text-[#818CF8]',
  officer:    'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  supervisor: 'bg-[#FFF7ED] text-[#C2410C] dark:bg-[#1A0E05] dark:text-[#FB923C]',
}

const STATUS_STYLES = {
  pending:  'bg-[#F8FAFC] text-[#475569] dark:bg-[#1A1F2B] dark:text-[#64748B]',
  approved: 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  active:   'bg-[#EEF2FF] text-[#4338CA] dark:bg-[#131629] dark:text-[#818CF8]',
  rejected: 'bg-[#FEF2F2] text-[#B91C1C] dark:bg-[#1F0A0A] dark:text-[#F87171]',
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] p-5 ${className}`}
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">{children}</p>
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-[#F3F4F6] dark:border-[#27272A] last:border-0">
      <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] flex-shrink-0 w-36">{label}</span>
      <span className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC] font-medium text-right">{value || '—'}</span>
    </div>
  )
}

export default function AdminUserDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const user = users.find(u => u.id === id)

  const [userStatus,   setUserStatus]   = useState(user?.status || 'active')
  const [showConfirm,  setShowConfirm]  = useState(false)
  const [resetSent,    setResetSent]    = useState(false)
  const [actionDone,   setActionDone]   = useState(null)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-[15px] font-medium text-[#6B7280]">User not found</p>
        <button onClick={() => navigate('/admin/users')} className="mt-3 text-[13px] text-[#5E6AD2] font-medium">
          ← Back to Users
        </button>
      </div>
    )
  }

  // Projects involved
  const userProjects = user.role === 'officer'
    ? projects.filter(p => p.officerId === user.id)
    : user.role === 'supervisor'
      ? projects.filter(p => p.supervisorId === user.id)
      : []

  // Recent audit actions by this user
  const userAudit = auditLogs
    .filter(a => a.userId === user.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5)

  const completedProjects = userProjects.filter(p => p.status === 'approved' || p.progress === 100).length
  const completionRate    = userProjects.length > 0 ? Math.round((completedProjects / userProjects.length) * 100) : 0

  function handleDeactivate() {
    setUserStatus('inactive')
    setActionDone('deactivated')
    setShowConfirm(false)
  }

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Back */}
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-1.5 text-[13px] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors w-fit"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Users
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-[18px] font-bold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border-2 border-[#E0E7FF] dark:border-[#252870]">
            {getInitials(user.name)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{user.name}</h1>
              <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${ROLE_STYLES[user.role] || ROLE_STYLES.officer}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${
                userStatus === 'active'
                  ? 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]'
                  : 'bg-[#F8FAFC] text-[#475569] dark:bg-[#1A1F2B] dark:text-[#64748B]'
              }`}>
                {userStatus === 'active' ? '● Active' : '○ Inactive'}
              </span>
            </div>
            <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">{user.email}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actionDone === 'deactivated' && (
            <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">Account deactivated</span>
          )}
          {resetSent && (
            <span className="text-[13px] text-[#16A34A] dark:text-[#4ADE80]">✓ Reset link sent</span>
          )}
          {!resetSent && (
            <button onClick={() => setResetSent(true)}
              className="h-9 px-4 text-[13px] font-medium text-[#6B7280] dark:text-[#9CA3AF] border border-[#E2E8F0] dark:border-[#27272A] rounded-[6px] hover:bg-[#F8FAFC] dark:hover:bg-[#18181B] transition-colors">
              Reset password
            </button>
          )}
          {!actionDone && userStatus === 'active' && (
            <button onClick={() => setShowConfirm(true)}
              className="h-9 px-4 text-[13px] font-medium text-[#DC2626] border border-[#FECACA] dark:border-[#7F1D1D] rounded-[6px] hover:bg-[#FEF2F2] dark:hover:bg-[#1F0A0A] transition-colors">
              Deactivate
            </button>
          )}
        </div>
      </div>

      {/* Confirm deactivate */}
      {showConfirm && (
        <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-[8px] bg-[#FEF2F2] dark:bg-[#1F0A0A] border border-[#FECACA] dark:border-[#7F1D1D]">
          <p className="text-[13px] text-[#B91C1C] dark:text-[#F87171] font-medium">
            Deactivate {user.name}? They will lose access immediately.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 text-[12px] font-medium text-[#6B7280] border border-[#E2E8F0] dark:border-[#27272A] rounded-[6px] hover:bg-white dark:hover:bg-[#18181B] transition-colors">Cancel</button>
            <button onClick={handleDeactivate} className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#DC2626] rounded-[6px] hover:bg-[#B91C1C] transition-colors">Confirm</button>
          </div>
        </div>
      )}

      {/* ROW 1: Profile info + Activity summary */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <SectionLabel>Profile information</SectionLabel>
          <InfoRow label="Full name"    value={user.name} />
          <InfoRow label="Email"        value={user.email} />
          <InfoRow label="Role"         value={user.roleLabel} />
          <InfoRow label="Department"   value={user.departmentFull || '—'} />
          <InfoRow label="Account created" value={formatDate(user.createdAt)} />
          <InfoRow label="Last active"  value={formatDate(user.lastActive)} />
          <InfoRow label="Status"       value={userStatus === 'active' ? 'Active' : 'Inactive'} />
        </Card>

        <Card>
          <SectionLabel>Activity summary</SectionLabel>
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[
              { label: user.role === 'supervisor' ? 'Tasks assigned' : 'Projects submitted', value: userProjects.length },
              { label: 'Completion rate', value: `${completionRate}%` },
            ].map(s => (
              <div key={s.label} className="flex flex-col p-3 rounded-[8px] bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A]">
                <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-2">{s.label}</p>
                <p className="text-[28px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-none">{s.value}</p>
              </div>
            ))}
          </div>

          {userAudit.length > 0 && (
            <>
              <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-3">Recent actions</p>
              <div className="flex flex-col">
                {userAudit.map((a, i) => (
                  <div key={a.id} className={`flex items-start gap-3 py-2.5 ${i < userAudit.length - 1 ? 'border-b border-[#F3F4F6] dark:border-[#27272A]' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">{getActionLabel(a.action)}</p>
                      <p className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280] truncate mt-0.5">{a.resourceTitle}</p>
                    </div>
                    <span className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280] flex-shrink-0">
                      {formatDate(a.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* ROW 2: Projects involved */}
      {userProjects.length > 0 && (
        <Card>
          <SectionLabel>Projects involved</SectionLabel>
          <div className="flex flex-col gap-2">
            {userProjects.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/admin/projects/${p.id}`)}
                className="flex items-center gap-3 px-4 py-3 rounded-[8px] bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A] cursor-pointer hover:border-[#5E6AD2]/40 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">{p.title}</p>
                  <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{p.ward} · {formatDate(p.startDate)} – {formatDate(p.endDate)}</p>
                </div>
                <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_STYLES[p.status] || STATUS_STYLES.pending}`}>
                  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </span>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151] flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  )
}