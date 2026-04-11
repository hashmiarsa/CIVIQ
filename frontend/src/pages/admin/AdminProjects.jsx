import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/mockData'

// ─── Helpers ───────────────────────────────────
function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function isThisMonth(dateStr) {
  const d = new Date(dateStr)
  const now = new Date('2025-01-15')
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

function isNextThreeMonths(dateStr) {
  const d = new Date(dateStr)
  const now = new Date('2025-01-15')
  const threeMonths = new Date('2025-04-15')
  return d >= now && d <= threeMonths
}

function isOverdue(project) {
  const end = new Date(project.endDate)
  const now = new Date('2025-01-15')
  return end < now && project.status !== 'rejected' && project.status !== 'approved'
}

// ─── Badge configs ─────────────────────────────
const STATUS_CONFIG = {
  pending:  { dot: '#94A3B8', text: 'Pending',  bg: 'bg-[#F8FAFC] dark:bg-[#1A1F2B]', color: 'text-[#475569] dark:text-[#64748B]' },
  approved: { dot: '#16A34A', text: 'Approved', bg: 'bg-[#F0FDF4] dark:bg-[#0D1F14]', color: 'text-[#15803D] dark:text-[#4ADE80]' },
  active:   { dot: '#5E6AD2', text: 'Active',   bg: 'bg-[#EEF2FF] dark:bg-[#131629]', color: 'text-[#4338CA] dark:text-[#818CF8]' },
  rejected: { dot: '#DC2626', text: 'Rejected', bg: 'bg-[#FEF2F2] dark:bg-[#1F0A0A]', color: 'text-[#B91C1C] dark:text-[#F87171]' },
}

const TYPE_STYLES = {
  Road:       'bg-[#FFF7ED] text-[#C2410C] dark:bg-[#1A0E05] dark:text-[#FB923C]',
  Water:      'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]',
  Sewage:     'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]',
  Electrical: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]',
  Parks:      'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  Other:      'bg-[#F8FAFC] text-[#475569] dark:bg-[#1A1F2B] dark:text-[#64748B]',
}

const DEPT_STYLES = {
  PWD:   'bg-[#EFF6FF] text-[#1D4ED8] dark:bg-[#0A1220] dark:text-[#60A5FA]',
  JAL:   'bg-[#F0FDF4] text-[#15803D] dark:bg-[#0D1F14] dark:text-[#4ADE80]',
  PVVNL: 'bg-[#FEFCE8] text-[#A16207] dark:bg-[#181305] dark:text-[#FACC15]',
  Parks: 'bg-[#F5F3FF] text-[#6D28D9] dark:bg-[#130C22] dark:text-[#A78BFA]',
}

// ─── Small components ──────────────────────────
function Badge({ label, className }) {
  return (
    <span className={`inline-flex items-center text-[12px] font-medium px-2.5 py-1 rounded-full ${className}`}>
      {label}
    </span>
  )
}

function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1 rounded-full ${c.bg} ${c.color}`}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.dot }} />
      {c.text}
    </span>
  )
}

function MCDMScore({ score }) {
  const color = score >= 75 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626'
  return (
    <div className="flex flex-col items-end gap-0.5 min-w-[52px]">
      <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide">MCDM</span>
      <span className="text-[18px] font-bold leading-none" style={{ color }}>{score}</span>
    </div>
  )
}

const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)

// ─── Filter Select — fixed min-width ───────────
function FilterSelect({ label, value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ minWidth: '160px' }}
      className="h-9 px-3 text-[13px] rounded-[8px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1C1C1F] text-[#0F172A] dark:text-[#F8FAFC] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/10 transition-all cursor-pointer"
    >
      <option value="">{label}: All</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

// ─── Project Card ──────────────────────────────
function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-5 px-5 py-4 bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] cursor-pointer transition-all hover:border-[#5E6AD2]/40 dark:hover:border-[#5E6AD2]/40 hover:bg-[#FAFAFA] dark:hover:bg-[#252529]"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* LEFT: Title + meta tags */}
      <div className="flex-1 min-w-0">
        {(project.hasClash || project.phase === 'phased') && (
          <div className="flex items-center gap-2 mb-1.5">
            {project.hasClash && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B91C1C] dark:text-[#F87171] bg-[#FEF2F2] dark:bg-[#1F0A0A] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" style={{ animation: 'civiq-pulse 1.5s ease-in-out infinite' }} />
                Clash detected
              </span>
            )}
            {project.phase === 'phased' && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF] px-2 py-0.5 rounded-full border border-[#E2E8F0] dark:border-[#27272A]"
                title="This is part of a multi-phase project. Future phases will be submitted separately."
              >
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                </svg>
                Phased
              </span>
            )}
          </div>
        )}
        <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate leading-snug">
          {project.title}
        </p>
        <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
          {project.departmentFull}
        </p>
      </div>

      {/* MIDDLE-LEFT: Dept + Type badges */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge label={project.department} className={DEPT_STYLES[project.department] || DEPT_STYLES.PWD} />
        <Badge label={project.type}       className={TYPE_STYLES[project.type] || TYPE_STYLES.Other} />
      </div>

      {/* DIVIDER */}
      <div className="w-px h-8 bg-[#E5E5E5] dark:bg-[#27272A] flex-shrink-0" />

      {/* MIDDLE-RIGHT: Status — standalone, prominent */}
      <div className="flex-shrink-0 w-[110px] flex justify-center">
        <StatusBadge status={project.status} />
      </div>

      {/* DIVIDER */}
      <div className="w-px h-8 bg-[#E5E5E5] dark:bg-[#27272A] flex-shrink-0" />

      {/* RIGHT: Timeline + Ward + MCDM + chevron */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide">Timeline</span>
          <span className="text-[13px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">
            {formatDateShort(project.startDate)} – {formatDateShort(project.endDate)}
          </span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[11px] font-semibold text-[#9CA3AF] dark:text-[#6B7280] uppercase tracking-wide">Ward</span>
          <span className="text-[13px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">{project.ward}</span>
        </div>
        <MCDMScore score={project.mcdmScore} />
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>

    </div>
  )
}

// ─── Admin Projects List ───────────────────────
export default function AdminProjects() {
  const navigate = useNavigate()

  const [search,       setSearch]       = useState('')
  const [filterDept,   setFilterDept]   = useState('')
  const [filterType,   setFilterType]   = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterTime,   setFilterTime]   = useState('')

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (search       && !p.title.toLowerCase().includes(search.toLowerCase())) return false
      if (filterDept   && p.department !== filterDept)   return false
      if (filterType   && p.type !== filterType)         return false
      if (filterStatus && p.status !== filterStatus)     return false
      if (filterTime) {
        if (filterTime === 'this_month'    && !isThisMonth(p.startDate))       return false
        if (filterTime === 'next_3_months' && !isNextThreeMonths(p.startDate)) return false
        if (filterTime === 'overdue'       && !isOverdue(p))                   return false
      }
      return true
    })
  }, [search, filterDept, filterType, filterStatus, filterTime])

  const hasFilters = search || filterDept || filterType || filterStatus || filterTime

  function clearFilters() {
    setSearch('')
    setFilterDept('')
    setFilterType('')
    setFilterStatus('')
    setFilterTime('')
  }

  return (
    <div className="flex flex-col gap-4 h-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-[#9CA3AF] pointer-events-none flex items-center">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects by name..."
            className="w-full h-10 pl-10 pr-4 text-[14px] rounded-[8px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#1C1C1F] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <FilterSelect
            label="Department"
            value={filterDept}
            onChange={setFilterDept}
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
            onChange={setFilterType}
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
            onChange={setFilterStatus}
            options={[
              { value: 'pending',  label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'active',   label: 'Active' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
          <FilterSelect
            label="Timeline"
            value={filterTime}
            onChange={setFilterTime}
            options={[
              { value: 'this_month',    label: 'Starting this month' },
              { value: 'next_3_months', label: 'Starting next 3 months' },
              { value: 'overdue',       label: 'Overdue' },
            ]}
          />

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-[13px] text-[#5E6AD2] hover:text-[#4A56C1] font-medium transition-colors">
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Project list ── */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-[#D1D5DB] dark:text-[#374151] mb-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p className="text-[15px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">No projects found</p>
            <p className="text-[13px] text-[#9CA3AF] dark:text-[#6B7280] mt-1">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 text-[13px] text-[#5E6AD2] hover:text-[#4A56C1] font-medium transition-colors">
              Clear all filters
            </button>
          </div>
        ) : (
          filtered.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/admin/projects/${project.id}`)}
            />
          ))
        )}
      </div>

      <style>{`@keyframes civiq-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}