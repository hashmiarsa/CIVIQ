import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/mockData'

// ─── Type color config ─────────────────────────
const TYPE_CONFIG = {
  Road:       { dot: '#EA580C', label: 'Road' },
  Water:      { dot: '#2563EB', label: 'Water' },
  Electrical: { dot: '#CA8A04', label: 'Electrical' },
  Sewage:     { dot: '#7C3AED', label: 'Sewage' },
  Parks:      { dot: '#16A34A', label: 'Parks' },
  Other:      { dot: '#6B7280', label: 'Other' },
}

const STATUS_CONFIG = {
  pending:  { dot: '#94A3B8', text: 'Pending',  bg: 'bg-[#F8FAFC] dark:bg-[#1A1F2B]', color: 'text-[#475569] dark:text-[#64748B]' },
  approved: { dot: '#16A34A', text: 'Approved', bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]' },
  active:   { dot: '#5E6AD2', text: 'Active',   bg: 'bg-[#EEF2FF] dark:bg-[#131629]', color: 'text-[#4338CA] dark:text-[#818CF8]' },
  rejected: { dot: '#DC2626', text: 'Rejected', bg: 'bg-[#FEF2F2] dark:bg-[#1F0A0A]', color: 'text-[#B91C1C] dark:text-[#F87171]' },
}

const DEPT_STYLES = {
  PWD:   'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]',
  JAL:   'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  PVVNL: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]',
  Parks: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]',
}

const TYPE_BADGE = {
  Road:       'bg-[#FFF7ED] text-[#C2410C] dark:bg-[#1A0E05] dark:text-[#FB923C]',
  Water:      'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]',
  Sewage:     'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]',
  Electrical: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]',
  Parks:      'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  Other:      'bg-[#F8FAFC] text-[#475569] dark:bg-[#1A1F2B] dark:text-[#64748B]',
}

// ─── Filter Select ─────────────────────────────
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

// ─── Admin Map ─────────────────────────────────
export default function AdminMap() {
  const navigate = useNavigate()

  const [filterDept,    setFilterDept]    = useState('')
  const [filterType,    setFilterType]    = useState('')
  const [filterStatus,  setFilterStatus]  = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  // Simulate clicking a "marker" — in Phase 3 this will be triggered by Leaflet
  // For now we place clickable dots in the placeholder to demonstrate the UX
  const visibleProjects = projects.filter(p => {
    if (filterDept   && p.department !== filterDept)   return false
    if (filterType   && p.type !== filterType)         return false
    if (filterStatus && p.status !== filterStatus)     return false
    return true
  })

  const hasFilters = filterDept || filterType || filterStatus

  function clearFilters() {
    setFilterDept('')
    setFilterType('')
    setFilterStatus('')
    setSelectedProject(null)
  }

  const selected = selectedProject
    ? projects.find(p => p.id === selectedProject)
    : null

  const selectedStatus = selected ? STATUS_CONFIG[selected.status] : null
  const selectedType   = selected ? TYPE_CONFIG[selected.type]     : null

  return (
    <div className="flex flex-col gap-4 h-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Filter bar ── */}
      <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
        <FilterSelect
          label="Department"
          value={filterDept}
          onChange={v => { setFilterDept(v); setSelectedProject(null) }}
          options={[
            { value: 'PWD',   label: 'PWD' },
            { value: 'JAL',   label: 'Jal Nigam' },
            { value: 'PVVNL', label: 'PVVNL' },
            { value: 'Parks', label: 'Parks' },
          ]}
        />
        <FilterSelect
          label="Type"
          value={filterType}
          onChange={v => { setFilterType(v); setSelectedProject(null) }}
          options={[
            { value: 'Road',       label: 'Road' },
            { value: 'Water',      label: 'Water' },
            { value: 'Sewage',     label: 'Sewage' },
            { value: 'Electrical', label: 'Electrical' },
            { value: 'Parks',      label: 'Parks' },
          ]}
        />
        <FilterSelect
          label="Status"
          value={filterStatus}
          onChange={v => { setFilterStatus(v); setSelectedProject(null) }}
          options={[
            { value: 'pending',  label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'active',   label: 'Active' },
            { value: 'rejected', label: 'Rejected' },
          ]}
        />
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">
            {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'} on map
          </span>
          {hasFilters && (
            <button onClick={clearFilters} className="text-[13px] text-[#5E6AD2] hover:text-[#4A56C1] font-medium transition-colors">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Main: Map + Drawer ── */}
      <div className="flex-1 min-h-0 grid gap-4" style={{ gridTemplateColumns: '1fr 300px' }}>

        {/* ── Map placeholder ── */}
        <div
          className="rounded-[8px] bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A] flex flex-col overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          {/* Map area — simulated markers */}
          <div className="flex-1 relative flex items-center justify-center">

            {/* Simulated project markers scattered on map */}
            {visibleProjects.map((p, i) => {
              // Deterministic positions based on index for demo
              const positions = [
                { top: '20%', left: '30%' }, { top: '35%', left: '55%' },
                { top: '55%', left: '25%' }, { top: '45%', left: '70%' },
                { top: '65%', left: '50%' }, { top: '25%', left: '70%' },
                { top: '70%', left: '35%' }, { top: '50%', left: '42%' },
              ]
              const pos = positions[i % positions.length]
              const typeColor = TYPE_CONFIG[p.type]?.dot || '#6B7280'
              const isSelected = selectedProject === p.id

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(isSelected ? null : p.id)}
                  className="absolute transition-all"
                  style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                  title={p.title}
                >
                  <div
                    className="rounded-full border-2 border-white dark:border-[#18181B] transition-all"
                    style={{
                      width: isSelected ? '20px' : '14px',
                      height: isSelected ? '20px' : '14px',
                      backgroundColor: typeColor,
                      boxShadow: isSelected ? `0 0 0 3px ${typeColor}40` : '0 1px 3px rgba(0,0,0,0.2)',
                      animation: p.hasClash ? 'civiq-pulse 1.5s ease-in-out infinite' : 'none',
                    }}
                  />
                </button>
              )
            })}

            {/* Empty state when all filtered out */}
            {visibleProjects.length === 0 && (
              <div className="text-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151] mx-auto mb-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                  <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
                </svg>
                <p className="text-[14px] font-medium text-[#9CA3AF] dark:text-[#6B7280]">No projects match filters</p>
              </div>
            )}

            {/* Phase 3 label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="text-[11px] text-[#D1D5DB] dark:text-[#374151] bg-[#FFFFFF] dark:bg-[#1C1C1F] px-3 py-1 rounded-full border border-[#E5E5E5] dark:border-[#27272A]">
                Interactive Leaflet map · Phase 3
              </span>
            </div>
          </div>

          {/* Legend bar */}
          <div className="flex-shrink-0 border-t border-[#E5E5E5] dark:border-[#27272A] px-5 py-3 flex items-center gap-5 flex-wrap bg-[#FFFFFF] dark:bg-[#1C1C1F]">
            <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide">Legend</span>
            {Object.entries(TYPE_CONFIG).map(([type, config]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: config.dot }} />
                <span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{type}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }} />
              <span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">Clash</span>
            </div>
          </div>
        </div>

        {/* ── Right drawer panel ── */}
        <div
          className="rounded-[8px] bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] flex flex-col overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          {!selected ? (
            /* ── Empty state — no marker selected ── */
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F8FAFC] dark:bg-[#18181B] border border-[#E5E5E5] dark:border-[#27272A] flex items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#6B7280] dark:text-[#9CA3AF]">No project selected</p>
                <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-1 leading-relaxed">
                  Click any marker on the map to see project details here
                </p>
              </div>
              <p className="text-[11px] text-[#D1D5DB] dark:text-[#374151]">
                {visibleProjects.length} marker{visibleProjects.length !== 1 ? 's' : ''} visible
              </p>
            </div>
          ) : (
            /* ── Selected project info ── */
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-shrink-0 px-4 py-3 border-b border-[#E5E5E5] dark:border-[#27272A] flex items-center justify-between">
                <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em]">
                  Project details
                </p>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[#9CA3AF] hover:text-[#6B7280] dark:hover:text-[#9CA3AF] transition-colors"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {/* Type dot + title */}
                <div className="flex items-start gap-2.5">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: selectedType?.dot || '#6B7280' }} />
                  <h3 className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                    {selected.title}
                  </h3>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${DEPT_STYLES[selected.department] || DEPT_STYLES.PWD}`}>
                    {selected.department}
                  </span>
                  <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${TYPE_BADGE[selected.type] || TYPE_BADGE.Other}`}>
                    {selected.type}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${selectedStatus?.bg} ${selectedStatus?.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedStatus?.dot }} />
                    {selectedStatus?.text}
                  </span>
                </div>

                {/* Info rows */}
                <div className="flex flex-col">
                  {[
                    { label: 'Ward',        value: selected.ward },
                    { label: 'Officer',     value: selected.officerName },
                    { label: 'Start date',  value: new Date(selected.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                    { label: 'End date',    value: new Date(selected.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                    { label: 'MCDM Score',  value: `${selected.mcdmScore} / 100` },
                  ].map(row => (
                    <div key={row.label} className="flex items-start justify-between py-2 border-b border-[#F3F4F6] dark:border-[#27272A] last:border-0">
                      <span className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF]">{row.label}</span>
                      <span className="text-[12px] font-medium text-[#0F172A] dark:text-[#F8FAFC] text-right ml-4">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Clash warning */}
                {selected.hasClash && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-[6px] bg-[#FEF2F2] dark:bg-[#1F0A0A] border border-[#FECACA] dark:border-[#7F1D1D]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }} />
                    <p className="text-[12px] font-medium text-[#B91C1C] dark:text-[#F87171]">Clash detected</p>
                  </div>
                )}
              </div>

              {/* Footer — link to detail */}
              <div className="flex-shrink-0 p-4 border-t border-[#E5E5E5] dark:border-[#27272A]">
                <button
                  onClick={() => navigate(`/admin/projects/${selected.id}`)}
                  className="w-full h-9 flex items-center justify-center gap-2 text-[13px] font-medium text-white bg-[#5E6AD2] rounded-[6px] hover:bg-[#4A56C1] transition-colors"
                >
                  View full project
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`@keyframes civiq-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}