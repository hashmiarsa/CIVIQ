import { useNavigate, useParams } from 'react-router-dom'
import { conflicts, projects } from '../../data/mockData'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}
function daysSince(dateStr) { return Math.floor((new Date('2025-01-15') - new Date(dateStr)) / 86400000) }

const STATUS_CONFIG = {
  unresolved:       { text: 'Unresolved',       bg: 'bg-[#FEF2F2] dark:bg-[#1F0A0A]', color: 'text-[#B91C1C] dark:text-[#F87171]', dot: '#DC2626' },
  pending_response: { text: 'Pending Response', bg: 'bg-[#FFFBEB] dark:bg-[#181305]', color: 'text-[#92400E] dark:text-[#FACC15]', dot: '#D97706' },
  resolved:         { text: 'Resolved',         bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]', dot: '#16A34A' },
}
const SEVERITY_CONFIG = {
  high:   { text: 'High',   bg: 'bg-[#FEF2F2] dark:bg-[#1F0A0A]', color: 'text-[#B91C1C] dark:text-[#F87171]' },
  medium: { text: 'Medium', bg: 'bg-[#FFFBEB] dark:bg-[#181305]', color: 'text-[#92400E] dark:text-[#FACC15]' },
  low:    { text: 'Low',    bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]' },
}
const TYPE_STYLES = { Road: 'bg-[#FFF7ED] text-[#C2410C] dark:bg-[#1A0E05] dark:text-[#FB923C]', Water: 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]', Sewage: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]', Electrical: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]', Parks: 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]', Other: 'bg-[#F8FAFC] text-[#475569] dark:bg-[#1A1F2B] dark:text-[#64748B]' }
const DEPT_STYLES = { PWD: 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]', JAL: 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]', PVVNL: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]', Parks: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]' }
const MCDM_CRITERIA = [{ label: 'Condition Severity', weight: 26 }, { label: 'Population & Facility Impact', weight: 21 }, { label: 'Seasonal Compatibility', weight: 16 }, { label: 'Execution Readiness', weight: 16 }, { label: 'Citizen Disruption', weight: 10 }, { label: 'Infrastructure Age', weight: 8 }, { label: 'Economic Value', weight: 3 }]
function scoreColor(s) { return s >= 75 ? '#16A34A' : s >= 60 ? '#D97706' : '#DC2626' }

function Card({ children, className = '' }) { return <div className={`bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] ${className}`} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>{children}</div> }
function SL({ children }) { return <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">{children}</p> }
function InfoRow({ label, value }) {
  return <div className="flex items-start justify-between py-2 border-b border-[#F3F4F6] dark:border-[#27272A] last:border-0"><span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{label}</span><span className="text-[12px] text-[#0F172A] dark:text-[#F8FAFC] font-medium text-right ml-4">{value || '—'}</span></div>
}

function ProjectPanel({ project, conflict, isHigher }) {
  if (!project) return null
  const score = isHigher ? conflict.projectAScore : conflict.projectBScore
  return (
    <Card className="p-5 flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full ${isHigher ? 'bg-[#EEF2FF] dark:bg-[#131629] text-[#4338CA] dark:text-[#818CF8]' : 'bg-[#F8FAFC] dark:bg-[#1A1F2B] text-[#6B7280] dark:text-[#9CA3AF]'}`}>
          {isHigher ? '★ Higher Priority' : 'Lower Priority'}
        </span>
        <span className="text-[24px] font-bold leading-none" style={{ color: scoreColor(score) }}>{score}</span>
      </div>
      <div>
        <h3 className="text-[15px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug mb-2">{project.title}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${DEPT_STYLES[project.department] || ''}`}>{project.department}</span>
          <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[project.type] || ''}`}>{project.type}</span>
        </div>
      </div>
      <div>
        <InfoRow label="Start date" value={formatDate(project.startDate)} />
        <InfoRow label="End date"   value={formatDate(project.endDate)} />
        <InfoRow label="Officer"    value={project.officerName} />
        <InfoRow label="Ward"       value={project.ward} />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-3">MCDM breakdown</p>
        <div className="flex flex-col gap-2.5">
          {MCDM_CRITERIA.map(c => (
            <div key={c.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">{c.label}</span>
                <span className="text-[10px] font-semibold text-[#9CA3AF]">{c.weight}%</span>
              </div>
              <div className="h-[4px] bg-[#F3F4F6] dark:bg-[#27272A] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: isHigher ? '#5E6AD2' : '#9CA3AF', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default function OfficerConflictDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const conflict = conflicts.find(c => c.id === id)

  if (!conflict) {
    return <div className="flex flex-col items-center justify-center h-64"><p className="text-[15px] text-[#6B7280]">Conflict not found</p><button onClick={() => navigate('/officer/conflicts')} className="mt-3 text-[13px] text-[#5E6AD2]">← Back</button></div>
  }

  const projectA = projects.find(p => p.id === conflict.projectAId)
  const projectB = projects.find(p => p.id === conflict.projectBId)
  const days     = daysSince(conflict.detectedAt)
  const status   = STATUS_CONFIG[conflict.status] || STATUS_CONFIG.unresolved
  const severity = SEVERITY_CONFIG[conflict.severity] || SEVERITY_CONFIG.low

  const allDates = [projectA?.startDate, projectA?.endDate, projectB?.startDate, projectB?.endDate].filter(Boolean).map(d => new Date(d))
  const minDate  = new Date(Math.min(...allDates))
  const maxDate  = new Date(Math.max(...allDates))
  const totalMs  = maxDate - minDate
  function barStyle(start, end, color) {
    const left  = ((new Date(start) - minDate) / totalMs) * 100
    const width = ((new Date(end) - new Date(start)) / totalMs) * 100
    return { left: `${left}%`, width: `${width}%`, backgroundColor: color }
  }

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Back */}
      <button onClick={() => navigate('/officer/conflicts')} className="flex items-center gap-1.5 text-[13px] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors w-fit">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Conflicts
      </button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${severity.bg} ${severity.color}`}>{severity.text}</span>
          <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: status.dot }} />{status.text}
          </span>
          <span className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280]">Detected {days}d ago</span>
        </div>
        <h1 className="text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{conflict.projectADept} ↔ {conflict.projectBDept} Clash</h1>
        <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] mt-1">{conflict.overlapDescription}</p>
      </div>

      {/* View-only notice */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-[8px] bg-[#EEF2FF] dark:bg-[#131629] border border-[#C7D2FE] dark:border-[#252870]">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#5E6AD2] flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p className="text-[13px] text-[#4338CA] dark:text-[#818CF8]">View only. Clash resolution is handled by the Admin. You will be notified when a decision is made.</p>
      </div>

      {/* System recommendation */}
      <Card className="p-5">
        <SL>System recommendation</SL>
        <p className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC]">
          Approve <span className="font-semibold">{conflict.projectADept}</span> project (MCDM {conflict.projectAScore}) and defer <span className="font-semibold">{conflict.projectBDept}</span> project (MCDM {conflict.projectBScore}).
        </p>
      </Card>

      {/* Two project panels */}
      <div className="grid grid-cols-2 gap-4">
        <ProjectPanel project={projectA} conflict={conflict} isHigher={true}  />
        <ProjectPanel project={projectB} conflict={conflict} isHigher={false} />
      </div>

      {/* Map placeholder */}
      <Card className="p-5">
        <SL>Overlap location</SL>
        <div className="rounded-[8px] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A]" style={{ height: '160px' }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151] mb-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <p className="text-[13px] text-[#9CA3AF] dark:text-[#6B7280]">{conflict.overlapDescription}</p>
          <p className="text-[11px] text-[#D1D5DB] dark:text-[#374151] mt-2">Interactive map in Phase 3</p>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-5">
        <SL>Timeline overlap</SL>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#5E6AD2]" /><span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{conflict.projectADept} — {projectA?.title?.split('—')[0]?.trim()}</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#9CA3AF]" /><span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{conflict.projectBDept} — {projectB?.title?.split('—')[0]?.trim()}</span></div>
          </div>
          <div className="relative" style={{ height: '56px' }}>
            {projectA && <div className="absolute h-5 rounded-full top-0 flex items-center px-2" style={barStyle(projectA.startDate, projectA.endDate, '#5E6AD2')}><span className="text-[10px] font-semibold text-white truncate">{formatDateShort(projectA.startDate)}</span></div>}
            {projectB && <div className="absolute h-5 rounded-full bottom-0 flex items-center px-2" style={barStyle(projectB.startDate, projectB.endDate, '#9CA3AF')}><span className="text-[10px] font-semibold text-white truncate">{formatDateShort(projectB.startDate)}</span></div>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#9CA3AF]">{formatDateShort(minDate.toISOString())}</span>
            <span className="text-[12px] font-medium text-[#DC2626] dark:text-[#FCA5A5]">{conflict.overlapDays} days overlap</span>
            <span className="text-[11px] text-[#9CA3AF]">{formatDateShort(maxDate.toISOString())}</span>
          </div>
        </div>
      </Card>

      {/* Resolution history */}
      {conflict.adminNote && (
        <Card className="p-5">
          <SL>Resolution history</SL>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-semibold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border border-[#E0E7FF] dark:border-[#252870]">RK</div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{conflict.resolution?.resolvedBy || 'Admin'} <span className="font-normal text-[#6B7280] dark:text-[#9CA3AF]">· {conflict.resolution?.type === 'approve_both' ? 'Approved both' : 'Rejected lower priority'}</span></p>
              <p className="text-[12px] text-[#9CA3AF] mt-0.5">{formatDate(conflict.resolution?.resolvedAt)}</p>
              <p className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC] mt-2 leading-relaxed">{conflict.adminNote}</p>
              {conflict.resolution?.suggestedDate && <p className="text-[12px] text-[#6B7280] mt-1">Suggested date: <span className="font-medium">{formatDate(conflict.resolution.suggestedDate)}</span></p>}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}