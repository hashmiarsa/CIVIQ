import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { projects, conflicts, auditLogs, users } from '../../data/mockData'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
function formatCurrency(n) {
  if (!n) return '—'
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
  return `₹${(n / 100000).toFixed(2)} L`
}
function timeAgo(dateStr) {
  if (!dateStr) return '—'
  const days = Math.floor((new Date('2025-01-15') - new Date(dateStr)) / 86400000)
  return days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`
}
function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
function getActionLabel(action) {
  const map = { project_approved: 'Approved project', project_rejected: 'Rejected project', project_submitted: 'Submitted project', conflict_resolved: 'Resolved conflict' }
  return map[action] || action
}

const MCDM_CRITERIA = [
  { label: 'Condition Severity', weight: 26 },
  { label: 'Population & Facility Impact', weight: 21 },
  { label: 'Seasonal Compatibility', weight: 16 },
  { label: 'Execution Readiness', weight: 16 },
  { label: 'Citizen Disruption', weight: 10 },
  { label: 'Infrastructure Age', weight: 8 },
  { label: 'Economic Value', weight: 3 },
]

const STATUS_CONFIG = {
  pending:  { dot: '#94A3B8', text: 'Pending',  bg: 'bg-[#F8FAFC] dark:bg-[#1A1F2B]', color: 'text-[#475569] dark:text-[#64748B]' },
  approved: { dot: '#16A34A', text: 'Approved', bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]' },
  active:   { dot: '#5E6AD2', text: 'Active',   bg: 'bg-[#EEF2FF] dark:bg-[#131629]', color: 'text-[#4338CA] dark:text-[#818CF8]' },
  rejected: { dot: '#DC2626', text: 'Rejected', bg: 'bg-[#FEF2F2] dark:bg-[#1F0A0A]', color: 'text-[#B91C1C] dark:text-[#F87171]' },
}
const TYPE_STYLES = { Road: 'bg-[#FFF7ED] text-[#C2410C] dark:bg-[#1A0E05] dark:text-[#FB923C]', Water: 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]', Sewage: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]', Electrical: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]', Parks: 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]', Other: 'bg-[#F8FAFC] text-[#475569] dark:bg-[#1A1F2B] dark:text-[#64748B]' }
const DEPT_STYLES = { PWD: 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]', JAL: 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]', PVVNL: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]', Parks: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]' }

function Card({ children, className = '' }) {
  return <div className={`bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] ${className}`} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>{children}</div>
}
function SectionLabel({ children }) {
  return <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">{children}</p>
}
function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-[#F3F4F6] dark:border-[#27272A] last:border-0">
      <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] w-40 flex-shrink-0">{label}</span>
      <span className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC] font-medium text-right">{value || '—'}</span>
    </div>
  )
}

export default function OfficerProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const dept = user?.department || 'PWD'

  const project = projects.find(p => p.id === id)
  const [supervisorId, setSupervisorId] = useState(project?.supervisorId || '')
  const [supervisorSaved, setSupervisorSaved] = useState(false)

  if (!project) {
    return <div className="flex flex-col items-center justify-center h-64"><p className="text-[15px] text-[#6B7280]">Project not found</p><button onClick={() => navigate('/officer/projects')} className="mt-3 text-[13px] text-[#5E6AD2]">← Back</button></div>
  }

  const clash = conflicts.find(c => (c.projectAId === project.id || c.projectBId === project.id) && c.status === 'unresolved')
  const pendingConflict = conflicts.find(c => (c.projectAId === project.id || c.projectBId === project.id) && c.status === 'pending_response')
  const projectAudit = auditLogs.filter(a => a.resourceId === project.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  const supervisors = users.filter(u => u.role === 'supervisor' && u.department === dept)
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.pending
  const scoreColor = project.mcdmScore >= 75 ? '#16A34A' : project.mcdmScore >= 60 ? '#D97706' : '#DC2626'

  function handleAssignSupervisor() { setSupervisorSaved(true) }

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Back */}
      <button onClick={() => navigate('/officer/projects')} className="flex items-center gap-1.5 text-[13px] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors w-fit">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2.5">
            <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${DEPT_STYLES[project.department] || ''}`}>{project.department}</span>
            <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[project.type] || ''}`}>{project.type}</span>
            <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1 rounded-full ${status.bg} ${status.color}`}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: status.dot }} />
              {status.text}
            </span>
            {project.hasClash && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B91C1C] dark:text-[#F87171] bg-[#FEF2F2] dark:bg-[#1F0A0A] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }} />
                Clash detected
              </span>
            )}
          </div>
          <h1 className="text-[22px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">{project.title}</h1>
          <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] mt-1">{project.departmentFull}</p>
        </div>
        {/* Officer actions */}
        <div className="flex items-center gap-2 flex-shrink-0 mt-1">
          {project.status === 'pending' && (
            <button onClick={() => navigate(`/officer/projects/new`)}
              className="h-9 px-4 text-[13px] font-medium text-[#6B7280] dark:text-[#9CA3AF] border border-[#E2E8F0] dark:border-[#27272A] rounded-[6px] hover:bg-[#F8FAFC] dark:hover:bg-[#18181B] transition-colors">
              Edit project
            </button>
          )}
          {pendingConflict && (
            <button onClick={() => navigate(`/officer/projects/${project.id}/respond`)}
              className="h-9 px-4 text-[13px] font-medium text-white bg-[#DC2626] rounded-[6px] hover:bg-[#B91C1C] transition-colors flex items-center gap-2">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Respond to rejection
            </button>
          )}
        </div>
      </div>

      {/* Clash alert */}
      {clash && (
        <div onClick={() => navigate(`/officer/conflicts/${clash.id}`)}
          className="flex items-center gap-3 px-4 py-3 rounded-[8px] bg-[#FEF2F2] dark:bg-[#1F0A0A] border border-[#FECACA] dark:border-[#7F1D1D] cursor-pointer hover:border-[#DC2626]/60 transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-[#DC2626] flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#B91C1C] dark:text-[#F87171]">Clash detected with another project</p>
            <p className="text-[12px] text-[#B91C1C]/80 dark:text-[#F87171]/70 truncate mt-0.5">{clash.overlapDescription}</p>
          </div>
          <span className="text-[12px] text-[#DC2626] font-medium flex items-center gap-1">View conflict <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        </div>
      )}

      {/* Rejection info */}
      {project.status === 'rejected' && project.rejectionReason && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-[8px] bg-[#FFFBEB] dark:bg-[#181305] border border-[#FCD34D] dark:border-[#854F0B]">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" className="text-[#D97706] flex-shrink-0 mt-0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#92400E] dark:text-[#FACC15]">Project rejected by admin</p>
            <p className="text-[12px] text-[#92400E]/80 dark:text-[#FACC15]/80 mt-0.5">{project.rejectionReason}</p>
            {project.suggestedDate && <p className="text-[12px] font-medium text-[#92400E] dark:text-[#FACC15] mt-1">Suggested start date: {formatDate(project.suggestedDate)}</p>}
          </div>
        </div>
      )}

      {/* ROW 1: MCDM + Map */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 2fr' }}>
        <Card className="p-5">
          <SectionLabel>MCDM priority score</SectionLabel>
          <div className="flex items-end gap-4 mb-5 pb-5 border-b border-[#F3F4F6] dark:border-[#27272A]">
            <span className="text-[56px] font-bold leading-none" style={{ color: scoreColor }}>{project.mcdmScore}</span>
            <div className="flex flex-col pb-1 gap-0.5">
              <span className="text-[16px] font-medium text-[#9CA3AF] dark:text-[#6B7280]">/ 100</span>
              <span className="text-[12px] font-medium" style={{ color: scoreColor }}>{project.mcdmScore >= 75 ? 'High priority' : project.mcdmScore >= 60 ? 'Medium priority' : 'Low priority'}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {MCDM_CRITERIA.map(c => (
              <div key={c.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{c.label}</span>
                  <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280]">{c.weight}%</span>
                </div>
                <div className="h-[5px] bg-[#F3F4F6] dark:bg-[#27272A] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[#5E6AD2]" style={{ width: `${project.mcdmScore}%`, transition: 'width 0.4s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 flex flex-col">
          <SectionLabel>Location</SectionLabel>
          <div className="flex-1 rounded-[8px] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A]" style={{ minHeight: '200px' }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151] mb-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <p className="text-[14px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">{project.ward}</p>
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-1 text-center px-4">{project.address}</p>
            <p className="text-[11px] text-[#D1D5DB] dark:text-[#374151] mt-3">Interactive map in Phase 3</p>
          </div>
        </Card>
      </div>

      {/* ROW 2: Project info full width */}
      <Card className="p-5">
        <SectionLabel>Project information</SectionLabel>
        <div className="mb-4 pb-4 border-b border-[#F3F4F6] dark:border-[#27272A]">
          <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-2">Description</p>
          <p className="text-[14px] text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">{project.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-12">
          <div>
            <InfoRow label="Submission date" value={formatDate(project.submittedAt)} />
            <InfoRow label="Start date"      value={formatDate(project.startDate)} />
            <InfoRow label="End date"        value={formatDate(project.endDate)} />
            <InfoRow label="Estimated cost"  value={formatCurrency(project.estimatedCost)} />
            <InfoRow label="Budget source"   value={project.budgetSource} />
          </div>
          <div>
            <InfoRow label="Tender number" value={project.tenderNumber} />
            <InfoRow label="Contractor"    value={project.contractorName ? `${project.contractorName} · ${project.contractorFirm}` : '—'} />
            <InfoRow label="Ward"          value={project.ward} />
            <InfoRow label="Zone"          value={project.zone} />
            {/* Assign supervisor */}
            <div className="flex items-start justify-between py-2.5 border-b border-[#F3F4F6] dark:border-[#27272A] last:border-0">
              <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] w-40 flex-shrink-0">Supervisor</span>
              <div className="flex items-center gap-2">
                {supervisorSaved ? (
                  <span className="text-[13px] font-medium text-[#16A34A] dark:text-[#4ADE80]">
                    ✓ {supervisors.find(s => s.id === supervisorId)?.name || 'Assigned'}
                  </span>
                ) : (
                  <>
                    <select value={supervisorId} onChange={e => setSupervisorId(e.target.value)}
                      style={{ paddingRight: '24px' }}
                      className="h-8 pl-2 text-[12px] rounded-[6px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1C1C1F] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#5E6AD2] cursor-pointer">
                      <option value="">Not assigned</option>
                      {supervisors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    {supervisorId && (
                      <button onClick={handleAssignSupervisor}
                        className="h-8 px-2.5 text-[12px] font-medium text-white bg-[#5E6AD2] rounded-[6px] hover:bg-[#4A56C1] transition-colors">
                        Assign
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ROW 3: Audit trail */}
      <Card className="p-5">
        <SectionLabel>Audit trail</SectionLabel>
        {projectAudit.length === 0 ? (
          <p className="text-[13px] text-[#9CA3AF] text-center py-4">No actions recorded yet</p>
        ) : (
          <div className="flex flex-col">
            {projectAudit.map((log, i) => (
              <div key={log.id} className={`flex items-start gap-3 py-3 ${i < projectAudit.length - 1 ? 'border-b border-[#F3F4F6] dark:border-[#27272A]' : ''}`}>
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-semibold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border border-[#E0E7FF] dark:border-[#252870]">{getInitials(log.userName)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#0F172A] dark:text-[#F8FAFC]"><span className="font-semibold">{log.userName}</span><span className="text-[#6B7280] dark:text-[#9CA3AF]"> · {getActionLabel(log.action)}</span></p>
                  {log.description && <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-0.5">{log.description}</p>}
                </div>
                <span className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] flex-shrink-0">{timeAgo(log.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <style>{`@keyframes civiq-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}