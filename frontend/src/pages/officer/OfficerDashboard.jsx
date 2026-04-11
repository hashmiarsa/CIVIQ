import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { projects, conflicts, complaints } from '../../data/mockData'

// ─── Helpers ───────────────────────────────────
function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function timeAgo(dateStr) {
  const now   = new Date('2025-01-15T10:00:00')
  const then  = new Date(dateStr)
  const days  = Math.floor((now - then) / 86400000)
  const hours = Math.floor((now - then) / 3600000)
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

// ─── Badge configs ─────────────────────────────
const STATUS_CONFIG = {
  pending:  { dot: '#94A3B8', text: 'Pending',  bg: 'bg-[#F8FAFC] dark:bg-[#1A1F2B]', color: 'text-[#475569] dark:text-[#64748B]' },
  approved: { dot: '#16A34A', text: 'Approved', bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]' },
  active:   { dot: '#5E6AD2', text: 'Active',   bg: 'bg-[#EEF2FF] dark:bg-[#131629]', color: 'text-[#4338CA] dark:text-[#818CF8]' },
  rejected: { dot: '#DC2626', text: 'Rejected', bg: 'bg-[#FEF2F2] dark:bg-[#1F0A0A]', color: 'text-[#B91C1C] dark:text-[#F87171]' },
}

const COMPLAINT_STATUS = {
  submitted:    { dot: '#94A3B8', bg: 'bg-[#F8FAFC] dark:bg-[#1A1F2B]', color: 'text-[#475569] dark:text-[#64748B]', text: 'Submitted' },
  acknowledged: { dot: '#5E6AD2', bg: 'bg-[#EEF2FF] dark:bg-[#131629]', color: 'text-[#4338CA] dark:text-[#818CF8]', text: 'Acknowledged' },
  in_progress:  { dot: '#D97706', bg: 'bg-[#FFFBEB] dark:bg-[#181305]', color: 'text-[#92400E] dark:text-[#FACC15]', text: 'In Progress' },
  resolved:     { dot: '#16A34A', bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]', text: 'Resolved' },
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] ${className}`}
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-3">{children}</p>
}

export default function OfficerDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Officer's dept — from logged in user
  const dept = user?.department || 'PWD'

  // Filter by dept
  const myProjects   = projects.filter(p => p.department === dept)
  const myConflicts  = conflicts.filter(c => c.projectADept === dept || c.projectBDept === dept)
  const myComplaints = complaints.filter(c => c.department === dept)

  const pendingCount    = myProjects.filter(p => p.status === 'pending').length
  const clashCount      = myConflicts.filter(c => c.status === 'unresolved').length
  const unresolvedComps = myComplaints.filter(c => c.status !== 'resolved').length

  const recentProjects  = [...myProjects].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 5)
  const activeClashes   = myConflicts.filter(c => c.status === 'unresolved')
  const overdueComplaints = myComplaints.filter(c => c.overdue)

  function scoreColor(s) { return s >= 75 ? '#16A34A' : s >= 60 ? '#D97706' : '#DC2626' }

  return (
    <div className="flex flex-col gap-5 h-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-3 flex-shrink-0">
        {[
          { label: 'My Projects',          value: myProjects.length,  sub: dept + ' department',  danger: false },
          { label: 'Pending Approval',      value: pendingCount,       sub: 'Awaiting admin',       danger: false },
          { label: 'Active Clashes',        value: clashCount,         sub: 'Needs attention',      danger: true  },
          { label: 'Dept Complaints',       value: unresolvedComps,    sub: 'Unresolved',           danger: false },
        ].map(s => (
          <div key={s.label}
            className="flex flex-col rounded-[8px] p-5 bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A]"
            style={{ borderTopWidth: '2px', borderTopColor: '#5E6AD2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-3">{s.label}</p>
            <p className={`text-[36px] font-bold leading-none mb-1 ${s.danger && s.value > 0 ? 'text-[#DC2626] dark:text-[#FCA5A5]' : 'text-[#0F172A] dark:text-[#F8FAFC]'}`}>{s.value}</p>
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="flex-1 min-h-0 grid gap-4" style={{ gridTemplateColumns: '1fr 320px' }}>

        {/* Left — Recent projects */}
        <Card className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>My recent projects</SectionLabel>
            <button onClick={() => navigate('/officer/projects')}
              className="text-[12px] text-[#5E6AD2] hover:text-[#4A56C1] font-medium transition-colors">
              View all →
            </button>
          </div>
          {recentProjects.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
              <p className="text-[14px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">No projects yet</p>
              <button onClick={() => navigate('/officer/projects/new')}
                className="text-[13px] text-[#5E6AD2] font-medium">Submit your first project →</button>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              {recentProjects.map((p, i) => {
                const st = STATUS_CONFIG[p.status] || STATUS_CONFIG.pending
                return (
                  <div key={p.id}
                    onClick={() => navigate(`/officer/projects/${p.id}`)}
                    className={`flex items-center gap-4 py-3 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#252529] rounded-[6px] px-2 transition-colors ${i < recentProjects.length - 1 ? 'border-b border-[#F3F4F6] dark:border-[#27272A]' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {p.hasClash && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#B91C1C] dark:text-[#F87171] bg-[#FEF2F2] dark:bg-[#1F0A0A] px-1.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }} />
                            Clash
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">{p.title}</p>
                      <p className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280] mt-0.5">
                        {formatDateShort(p.startDate)} – {formatDateShort(p.endDate)} · {p.ward}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[14px] font-bold" style={{ color: scoreColor(p.mcdmScore) }}>{p.mcdmScore}</span>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: st.dot }} />
                        {st.text}
                      </span>
                    </div>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Right — Clash alerts + Complaint alerts */}
        <div className="flex flex-col gap-4 min-h-0">

          {/* Clash alerts */}
          <Card className="p-4 flex-shrink-0">
            <SectionLabel>Clash alerts</SectionLabel>
            {activeClashes.length === 0 ? (
              <div className="flex items-center gap-2 py-2">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#16A34A] dark:text-[#4ADE80]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">No active clashes</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {activeClashes.map(c => (
                  <div key={c.id}
                    onClick={() => navigate(`/officer/conflicts/${c.id}`)}
                    className="flex items-start gap-2.5 p-3 rounded-[6px] cursor-pointer bg-[#FEF2F2] dark:bg-[#1F0A0A] border border-[#FECACA] dark:border-[#7F1D1D] hover:border-[#DC2626]/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#DC2626] flex-shrink-0 mt-1" style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#B91C1C] dark:text-[#F87171]">{c.projectADept} ↔ {c.projectBDept}</p>
                      <p className="text-[11px] text-[#B91C1C]/70 dark:text-[#F87171]/70 truncate mt-0.5">{c.overlapDescription}</p>
                    </div>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-[#DC2626]/50 flex-shrink-0 mt-0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Complaint alerts */}
          <Card className="p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Overdue complaints</SectionLabel>
              <button onClick={() => navigate('/officer/complaints')}
                className="text-[12px] text-[#5E6AD2] hover:text-[#4A56C1] font-medium transition-colors">
                View all →
              </button>
            </div>
            {overdueComplaints.length === 0 ? (
              <div className="flex items-center gap-2 py-2">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#16A34A] dark:text-[#4ADE80]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">No overdue complaints</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 overflow-y-auto flex-1">
                {overdueComplaints.map(c => {
                  const st = COMPLAINT_STATUS[c.status] || COMPLAINT_STATUS.submitted
                  return (
                    <div key={c.id}
                      onClick={() => navigate(`/officer/complaints/${c.id}`)}
                      className="flex items-center gap-3 p-3 rounded-[6px] cursor-pointer bg-[#FFFBEB] dark:bg-[#181305] border border-[#FCD34D] dark:border-[#854F0B] hover:border-[#D97706]/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[#92400E] dark:text-[#FACC15] truncate">{c.cnrId} · {c.issueType}</p>
                        <p className="text-[11px] text-[#92400E]/70 dark:text-[#FACC15]/70 truncate mt-0.5">{c.address}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${st.bg} ${st.color}`}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: st.dot }} />
                        {st.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

        </div>
      </div>

      <style>{`@keyframes civiq-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}