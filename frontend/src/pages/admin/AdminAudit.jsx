import { useState, useMemo } from 'react'
import { auditLogs, users } from '../../data/mockData'

// ─── Helpers ───────────────────────────────────
function formatDateTime(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function getActionLabel(action) {
  const map = {
    project_approved:  'Approved project',
    project_rejected:  'Rejected project',
    project_submitted: 'Submitted project',
    conflict_resolved: 'Resolved conflict',
    user_created:      'Created user',
    user_deactivated:  'Deactivated user',
    mcdm_override:     'Overrode MCDM decision',
  }
  return map[action] || action
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const ROLE_STYLES = {
  admin:      'bg-[#EEF2FF] text-[#4338CA] dark:bg-[#131629] dark:text-[#818CF8]',
  officer:    'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  supervisor: 'bg-[#FFF7ED] text-[#C2410C] dark:bg-[#1A0E05] dark:text-[#FB923C]',
}

const DEPT_STYLES = {
  PWD:   'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]',
  JAL:   'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  PVVNL: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]',
  Parks: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]',
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ minWidth: '150px', paddingRight: '32px' }}
      className="h-9 pl-3 text-[13px] rounded-[8px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1C1C1F] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/10 transition-all cursor-pointer"
    >
      <option value="">{label}: All</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function exportCSV(data) {
  const headers = ['User', 'Role', 'Department', 'Action', 'Resource', 'Timestamp', 'Override']
  const rows = data.map(l => [
    l.userName, l.userRole, l.department || '—',
    getActionLabel(l.action), l.resourceTitle,
    formatDateTime(l.timestamp), l.isOverride ? 'Yes' : 'No'
  ])
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'civiq_audit_log.csv'; a.click()
  URL.revokeObjectURL(url)
}

const VDivider = () => (
  <div className="w-px h-8 bg-[#E5E5E5] dark:bg-[#27272A] flex-shrink-0" />
)

export default function AdminAudit() {
  const [filterUser,   setFilterUser]   = useState('')
  const [filterDept,   setFilterDept]   = useState('')
  const [filterAction, setFilterAction] = useState('')

  const filtered = useMemo(() => {
    return [...auditLogs]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .filter(l => {
        if (filterUser   && l.userId !== filterUser)       return false
        if (filterDept   && l.department !== filterDept)   return false
        if (filterAction && l.action !== filterAction)     return false
        return true
      })
  }, [filterUser, filterDept, filterAction])

  const hasFilters = filterUser || filterDept || filterAction

  function clearFilters() {
    setFilterUser('')
    setFilterDept('')
    setFilterAction('')
  }

  return (
    <div className="flex flex-col gap-4 h-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Filter bar + Export ── */}
      <div className="flex items-center gap-3 flex-wrap flex-shrink-0">
        <FilterSelect label="User" value={filterUser} onChange={setFilterUser}
          options={users.map(u => ({ value: u.id, label: u.name }))}
        />
        <FilterSelect label="Department" value={filterDept} onChange={setFilterDept}
          options={[
            { value: 'PWD',   label: 'PWD' },
            { value: 'JAL',   label: 'Jal Nigam' },
            { value: 'PVVNL', label: 'PVVNL' },
            { value: 'Parks', label: 'Parks' },
          ]}
        />
        <FilterSelect label="Action" value={filterAction} onChange={setFilterAction}
          options={[
            { value: 'project_approved',  label: 'Project approved' },
            { value: 'project_rejected',  label: 'Project rejected' },
            { value: 'project_submitted', label: 'Project submitted' },
            { value: 'conflict_resolved', label: 'Conflict resolved' },
            { value: 'mcdm_override',     label: 'MCDM override' },
          ]}
        />
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </span>
          {hasFilters && (
            <button onClick={clearFilters} className="text-[13px] text-[#5E6AD2] hover:text-[#4A56C1] font-medium transition-colors">
              Clear filters
            </button>
          )}
          <button
            onClick={() => exportCSV(filtered)}
            className="flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-[#6B7280] dark:text-[#9CA3AF] border border-[#E2E8F0] dark:border-[#27272A] rounded-[8px] hover:bg-[#F8FAFC] dark:hover:bg-[#18181B] transition-colors"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Log entries ── */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">No audit entries found</p>
            <p className="text-[13px] text-[#9CA3AF] dark:text-[#6B7280] mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filtered.map(log => (
            <div
              key={log.id}
              className={`flex items-center gap-4 px-5 py-4 rounded-[8px] border transition-all ${
                log.isOverride
                  ? 'bg-[#FFFBEB] dark:bg-[#181305] border-[#FCD34D] dark:border-[#854F0B]'
                  : 'bg-[#FFFFFF] dark:bg-[#1C1C1F] border-[#E5E5E5] dark:border-[#27272A]'
              }`}
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 flex-shrink-0 w-[180px] min-w-0">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-semibold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border border-[#E0E7FF] dark:border-[#252870]">
                  {getInitials(log.userName)}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">{log.userName}</p>
                  <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-full ${ROLE_STYLES[log.userRole] || ROLE_STYLES.admin}`}>
                    {log.userRole}
                  </span>
                </div>
              </div>

              <VDivider />

              {/* Action + resource */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                    {getActionLabel(log.action)}
                  </p>
                  {log.isOverride && (
                    <span className="text-[10px] font-bold text-[#D97706] dark:text-[#FACC15] bg-[#FEF3C7] dark:bg-[#422006]/40 px-1.5 py-0.5 rounded flex-shrink-0">
                      OVERRIDE
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] truncate mt-0.5">
                  {log.resourceTitle}
                </p>
              </div>

              <VDivider />

              {/* Department */}
              <div className="flex-shrink-0 w-[80px] flex justify-center">
                {log.department ? (
                  <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${DEPT_STYLES[log.department] || ''}`}>
                    {log.department}
                  </span>
                ) : (
                  <span className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280]">Admin</span>
                )}
              </div>

              <VDivider />

              {/* Timestamp */}
              <div className="flex-shrink-0 text-right">
                <p className="text-[12px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                  {formatDateTime(log.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}