import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { conflicts } from '../../data/mockData'

function daysSince(dateStr) {
  return Math.floor((new Date('2025-01-15') - new Date(dateStr)) / 86400000)
}

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
const DEPT_STYLES = { PWD: 'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]', JAL: 'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]', PVVNL: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]', Parks: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]' }
function scoreColor(s) { return s >= 75 ? '#16A34A' : s >= 60 ? '#D97706' : '#DC2626' }

function FilterSelect({ label, value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ minWidth: '150px', paddingRight: '32px' }}
      className="h-9 pl-3 text-[13px] rounded-[8px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1C1C1F] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/10 transition-all cursor-pointer">
      <option value="">{label}: All</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export default function OfficerConflicts() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const dept = user?.department || 'PWD'

  const [filterStatus, setFilterStatus] = useState('')

  const myConflicts = conflicts.filter(c => c.projectADept === dept || c.projectBDept === dept)
  const filtered    = useMemo(() => myConflicts.filter(c => !filterStatus || c.status === filterStatus), [myConflicts, filterStatus])

  const unresolvedCount      = myConflicts.filter(c => c.status === 'unresolved').length
  const pendingResponseCount = myConflicts.filter(c => c.status === 'pending_response').length
  const resolvedCount        = myConflicts.filter(c => c.status === 'resolved').length

  return (
    <div className="flex flex-col gap-5 h-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Stat cards */}
      <div className="flex gap-3 flex-shrink-0">
        {[
          { label: 'Unresolved',       sub: 'Needs action',    value: unresolvedCount,      danger: true  },
          { label: 'Pending Response', sub: 'Awaiting officer', value: pendingResponseCount, danger: false },
          { label: 'Resolved',         sub: 'Completed',        value: resolvedCount,        danger: false },
        ].map(s => (
          <div key={s.label} className="flex flex-col rounded-[8px] p-5 bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A]"
            style={{ borderTopWidth: '2px', borderTopColor: '#5E6AD2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', minWidth: '180px' }}>
            <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-3">{s.label}</p>
            <p className={`text-[36px] font-bold leading-none mb-1 ${s.danger && s.value > 0 ? 'text-[#DC2626] dark:text-[#FCA5A5]' : 'text-[#0F172A] dark:text-[#F8FAFC]'}`}>{s.value}</p>
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* View-only notice */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-[8px] bg-[#EEF2FF] dark:bg-[#131629] border border-[#C7D2FE] dark:border-[#252870] flex-shrink-0">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#5E6AD2] flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p className="text-[13px] text-[#4338CA] dark:text-[#818CF8]">Showing clashes involving <span className="font-semibold">{dept}</span> department projects. View only — clash resolution is handled by the Admin.</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus}
          options={[
            { value: 'unresolved', label: 'Unresolved' },
            { value: 'pending_response', label: 'Pending Response' },
            { value: 'resolved', label: 'Resolved' },
          ]}
        />
        <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF] ml-auto">{filtered.length} {filtered.length === 1 ? 'conflict' : 'conflicts'}</span>
        {filterStatus && <button onClick={() => setFilterStatus('')} className="text-[13px] text-[#5E6AD2] font-medium">Clear</button>}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p className="text-[15px] font-medium text-[#16A34A] dark:text-[#4ADE80]">No clashes found</p>
          </div>
        ) : filtered.map(c => {
          const days = daysSince(c.detectedAt)
          const st = STATUS_CONFIG[c.status] || STATUS_CONFIG.unresolved
          const sv = SEVERITY_CONFIG[c.severity] || SEVERITY_CONFIG.low
          return (
            <div key={c.id} onClick={() => navigate(`/officer/conflicts/${c.id}`)}
              className="px-5 py-4 bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] cursor-pointer transition-all hover:border-[#5E6AD2]/40 hover:bg-[#FAFAFA] dark:hover:bg-[#252529] flex flex-col gap-3"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">{c.projectATitle}</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${DEPT_STYLES[c.projectADept] || ''}`}>{c.projectADept}</span>
                    <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide">MCDM</span>
                    <span className="text-[14px] font-bold" style={{ color: scoreColor(c.projectAScore) }}>{c.projectAScore}</span>
                  </div>
                </div>
                <div className="flex items-center pt-1 flex-shrink-0">
                  <span className="text-[11px] font-bold text-[#9CA3AF] dark:text-[#6B7280] bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A] px-2.5 py-1 rounded-full">VS</span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1.5 items-end">
                  <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug text-right">{c.projectBTitle}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide">MCDM</span>
                    <span className="text-[14px] font-bold" style={{ color: scoreColor(c.projectBScore) }}>{c.projectBScore}</span>
                    <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${DEPT_STYLES[c.projectBDept] || ''}`}>{c.projectBDept}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#F3F4F6] dark:border-[#27272A]" />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-[#9CA3AF] flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] truncate">{c.overlapDescription}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${sv.bg} ${sv.color}`}>{sv.text}</span>
                  <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: st.dot }} />{st.text}
                  </span>
                  <div className="w-px h-4 bg-[#E5E5E5] dark:bg-[#27272A]" />
                  <span className="text-[12px] font-medium text-[#9CA3AF] dark:text-[#6B7280]">{days}d ago</span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`@keyframes civiq-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}