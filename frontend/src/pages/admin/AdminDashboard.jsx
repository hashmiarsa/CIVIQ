import { useNavigate } from 'react-router-dom'
import { projects, conflicts, auditLogs, complaints } from '../../data/mockData'

// ─── Helpers ───────────────────────────────────
const MONSOON_MONTHS = [6, 7, 8, 9]

function getMonth(dateStr) {
  return new Date(dateStr).getMonth() + 1
}

function hasMonsoonRoadProject() {
  return projects.some(p => p.type === 'Road' && MONSOON_MONTHS.includes(getMonth(p.startDate)))
}

function timeAgo(dateStr) {
  const now   = new Date('2025-01-15T10:00:00')
  const then  = new Date(dateStr)
  const mins  = Math.floor((now - then) / 60000)
  const hours = Math.floor(mins / 60)
  const days  = Math.floor(hours / 24)
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
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

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const DEPT_LABELS = {
  PWD:   'PWD',
  JAL:   'Jal Nigam',
  PVVNL: 'PVVNL',
  Parks: 'Parks',
}

// ─── Card ──────────────────────────────────────
function Card({ children, className = '', style = {} }) {
  return (
    <div
      className={[
        'bg-[#FFFFFF] dark:bg-[#1C1C1F]',
        'border border-[#E5E5E5] dark:border-[#27272A]',
        'rounded-[8px]',
        className,
      ].join(' ')}
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)', ...style }}
    >
      {children}
    </div>
  )
}

// ─── Stat Card ─────────────────────────────────
function StatCard({ label, value, sub, danger }) {
  return (
    <div
      className="flex flex-col rounded-[8px] p-5 bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A]"
      style={{ borderTopWidth: '2px', borderTopColor: '#5E6AD2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
    >
      <p className="text-[12px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-3">
        {label}
      </p>
      <p className={[
        'text-[36px] font-bold leading-none mb-2',
        danger ? 'text-[#DC2626] dark:text-[#FCA5A5]' : 'text-[#0F172A] dark:text-[#F8FAFC]',
      ].join(' ')}>
        {value}
      </p>
      <p className="text-[13px] text-[#9CA3AF] dark:text-[#6B7280]">{sub}</p>
    </div>
  )
}

// ─── Section Label ─────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[12px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">
      {children}
    </p>
  )
}

// ─── CSS Bar ───────────────────────────────────
function Bar({ label, value, max, suffix = '' }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] w-[72px] flex-shrink-0">{label}</span>
      <div className="flex-1 h-[6px] bg-[#F3F4F6] dark:bg-[#27272A] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#5E6AD2]"
          style={{ width: `${pct}%`, transition: 'width 0.4s ease' }}
        />
      </div>
      <span className="text-[13px] text-[#9CA3AF] dark:text-[#6B7280] w-9 text-right flex-shrink-0">
        {value}{suffix}
      </span>
    </div>
  )
}

// ─── Severity Badge ────────────────────────────
function SeverityBadge({ severity }) {
  const map = {
    high:   'bg-[#FEF2F2] text-[#B91C1C] dark:bg-[#1F0A0A] dark:text-[#F87171]',
    medium: 'bg-[#FFFBEB] text-[#92400E] dark:bg-[#181305] dark:text-[#FACC15]',
    low:    'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  }
  const labels = { high: 'High', medium: 'Medium', low: 'Low' }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${map[severity] || map.low}`}>
      {labels[severity] || 'Low'}
    </span>
  )
}

// ─── Admin Dashboard ───────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()

  // ── Stats ──
  const totalProjects        = projects.length
  const activeClashes        = conflicts.filter(c => c.status === 'unresolved').length
  const pendingApprovals     = projects.filter(p => p.status === 'pending').length
  const unresolvedComplaints = complaints.filter(c => c.status !== 'resolved').length
  const showMonsoonWarning   = hasMonsoonRoadProject()

  // ── Bar chart — projects by dept ──
  const deptCounts = {}
  projects.forEach(p => { deptCounts[p.department] = (deptCounts[p.department] || 0) + 1 })
  const deptEntries  = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])
  const maxDeptCount = Math.max(...Object.values(deptCounts))

  // ── Bar chart — dept performance ──
  const deptProgress = {}
  const deptTotal    = {}
  projects.forEach(p => {
    deptProgress[p.department] = (deptProgress[p.department] || 0) + p.progress
    deptTotal[p.department]    = (deptTotal[p.department] || 0) + 1
  })
  const perfEntries = Object.entries(deptProgress)
    .map(([d, total]) => [d, Math.round(total / deptTotal[d])])
    .sort((a, b) => b[1] - a[1])

  // ── Clash alerts ──
  const unresolvedConflicts = conflicts.filter(c => c.status === 'unresolved')

  // ── Activity ──
  const recentActivity = [...auditLogs]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5)

  return (
    <div
      className="h-full flex flex-col gap-4 "
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Seasonal Warning — full width ── */}
      {showMonsoonWarning && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-[8px] flex-shrink-0 bg-[#FFFBEB] dark:bg-[#181305] border border-[#FCD34D] dark:border-[#854F0B]">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" className="text-[#D97706] dark:text-[#FACC15] flex-shrink-0 mt-0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p className="text-[13px] text-[#92400E] dark:text-[#FACC15]">
            <span className="font-semibold">Seasonal warning — </span>
            One or more road projects are scheduled during monsoon season (Jun–Sep). Consider rescheduling.
          </p>
        </div>
      )}

      {/*
        ── MASTER GRID ──────────────────────────────────────────
        3 columns: [col-A] [col-B] [col-C]
        col-A + col-B = charts / clash (left+mid)
        col-C         = activity (right, spans all rows)

        All 4 stat cards sit in a 4-col subgrid that maps:
          stat1 → col-A left half
          stat2 → col-A right half
          stat3 → col-B left half
          stat4 → col-C  (right edge aligns with activity card)

        We achieve this by making the outer grid 4 equal columns,
        then spanning charts across cols 1-3 and activity across col 4.
        ────────────────────────────────────────────────────────
      */}
      <div
        className="flex-1 min-h-0 grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        {/* ── Row 1: 4 stat cards — each takes 1 col ── */}
        <StatCard label="Total Projects"     value={totalProjects}        sub="Across all departments" />
        <StatCard label="Active Clashes"     value={activeClashes}        sub="Needs resolution"       danger />
        <StatCard label="Pending Approvals"  value={pendingApprovals}     sub="Awaiting admin review" />
        <StatCard label="Citizen Complaints" value={unresolvedComplaints} sub="Unresolved" />

        {/* ── Row 2: Charts card — spans cols 1-3 ── */}
        <Card
          className="p-5 flex flex-col"
          style={{ gridColumn: '1 / 4', gridRow: '2 / 3' }}
        >
          <div className="grid grid-cols-2 gap-10 flex-1">

            {/* Projects by dept */}
            <div className="flex flex-col">
              <SectionLabel>Projects by department</SectionLabel>
              <div className="flex flex-col justify-center gap-4 flex-1">
                {deptEntries.map(([dept, count]) => (
                  <Bar key={dept} label={DEPT_LABELS[dept] || dept} value={count} max={maxDeptCount} />
                ))}
              </div>
            </div>

            {/* Dept performance */}
            <div className="flex flex-col">
              <SectionLabel>Department performance</SectionLabel>
              <div className="flex flex-col justify-center gap-4 flex-1">
                {perfEntries.map(([dept, avg]) => (
                  <Bar key={dept} label={DEPT_LABELS[dept] || dept} value={avg} max={100} suffix="%" />
                ))}
              </div>
              <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-4">
                Average progress across department projects
              </p>
            </div>

          </div>
        </Card>

        {/* ── Row 2+3: Activity card — col 4, spans rows 2-3 ── */}
        <Card
          className="p-5 flex flex-col"
          style={{ gridColumn: '4 / 5', gridRow: '2 / 4' }}
        >
          <SectionLabel>Recent activity</SectionLabel>
          <div className="flex flex-col flex-1 overflow-y-auto">
            {recentActivity.map((log, i) => (
              <div
                key={log.id}
                className={[
                  'flex items-start gap-3 py-3',
                  i < recentActivity.length - 1 ? 'border-b border-[#F3F4F6] dark:border-[#27272A]' : '',
                ].join(' ')}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-semibold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border border-[#E0E7FF] dark:border-[#252870]">
                  {getInitials(log.userName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    {log.userName}
                  </p>
                  <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                    {getActionLabel(log.action)}
                  </p>
                  <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-0.5 truncate">
                    {log.resourceTitle}
                  </p>
                </div>
                <span className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] flex-shrink-0 mt-0.5">
                  {timeAgo(log.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Row 3: Clash alerts — spans cols 1-3 ── */}
        <Card
          className="p-5"
          style={{ gridColumn: '1 / 4', gridRow: '3 / 4' }}
        >
          <SectionLabel>Clash alerts</SectionLabel>
          {unresolvedConflicts.length === 0 ? (
            <p className="text-[14px] text-[#9CA3AF] text-center py-3">No active clashes</p>
          ) : (
            <div className="flex flex-col gap-2">
              {unresolvedConflicts.map(c => {
                const daysPending = Math.floor(
                  (new Date('2025-01-15') - new Date(c.detectedAt)) / 86400000
                )
                return (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/admin/conflicts/${c.id}`)}
                    className="flex items-center gap-3 p-3 rounded-[6px] cursor-pointer transition-colors bg-[#FAFAFA] dark:bg-[#18181B] hover:bg-[#F3F4F6] dark:hover:bg-[#252529] border border-[#F0F0F0] dark:border-[#27272A]"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className="w-2 h-2 rounded-full bg-[#DC2626]"
                        style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                        {c.projectADept} ↔ {c.projectBDept}
                      </p>
                      <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] truncate mt-0.5">
                        {c.overlapDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <SeverityBadge severity={c.severity} />
                      <span className="text-[12px] text-[#DC2626] dark:text-[#FCA5A5] font-medium">
                        {daysPending}d pending
                      </span>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#9CA3AF]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

      </div>

      <style>{`@keyframes civiq-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}



