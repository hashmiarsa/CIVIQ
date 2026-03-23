// ─────────────────────────────────────────────
//  CIVIQ — Sidebar
//  Supabase pill active style — NO left border
//  Transparent logo — sits directly on sidebar bg
//  Unified dark bg with page (Linear consistency)
//  Collapsed: 56px icons only
//  Expanded:  260px icon + label
// ─────────────────────────────────────────────

interface SidebarProps {
  role?: 'admin' | 'officer' | 'supervisor'
  activeItem?: string
  onNavigate?: (item: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  darkMode?: boolean
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  count?: number
  countColor?: 'muted' | 'danger'
  collapsed?: boolean
  onClick?: () => void
}

// ─── Nav Item — Supabase pill ──────────────────
function NavItem({
  icon, label, active = false,
  count, countColor = 'muted',
  collapsed = false, onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={[
        'w-full flex items-center rounded-[6px] transition-all duration-150 select-none',
        collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5',
        active
          ? [
              // Light: Linear gray pill #EBEBEB + near-black text
              'bg-[#EBEBEB] text-[#0F172A]',
              // Dark: dark pill + white text
              'dark:bg-[#1E293B] dark:text-[#F8FAFC]',
            ].join(' ')
          : [
              'text-[#6B7280] dark:text-[#9CA3AF]',
              'hover:bg-[#EBEBEB] hover:text-[#0F172A]',
              'dark:hover:bg-[#1E293B] dark:hover:text-[#F8FAFC]',
            ].join(' '),
      ].join(' ')}
    >
      <span className="flex items-center justify-center flex-shrink-0" style={{ width: 18, height: 18 }}>
        {icon}
      </span>

      {!collapsed && (
        <>
          <span className={[
            'text-[14px] leading-none flex-1 min-w-0 text-left',
            active ? 'font-semibold' : 'font-normal',
          ].join(' ')}>
            {label}
          </span>
          {count !== undefined && count > 0 && (
            <span className={[
              'text-[12px] font-medium flex-shrink-0',
              countColor === 'danger'
                ? 'text-[#DC2626] dark:text-[#FCA5A5]'
                : 'text-[#9CA3AF] dark:text-[#6B7280]',
            ].join(' ')}>
              {count}
            </span>
          )}
        </>
      )}
    </button>
  )
}

// ─── Icons ─────────────────────────────────────
const I = {
  dashboard:  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  projects:   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  conflicts:  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  map:        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  complaints: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  audit:      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  users:      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  tasks:      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  settings:   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
}

// ─── Nav configs ───────────────────────────────
const adminNav = [
  { id: 'dashboard',  label: 'Dashboard',  icon: I.dashboard,  count: undefined, countColor: 'muted'  as const },
  { id: 'projects',   label: 'Projects',   icon: I.projects,   count: 24,        countColor: 'muted'  as const },
  { id: 'conflicts',  label: 'Conflicts',  icon: I.conflicts,  count: 3,         countColor: 'danger' as const },
  { id: 'map',        label: 'City Map',   icon: I.map,        count: undefined, countColor: 'muted'  as const },
  { id: 'complaints', label: 'Complaints', icon: I.complaints, count: 7,         countColor: 'muted'  as const },
  { id: 'audit',      label: 'Audit Log',  icon: I.audit,      count: undefined, countColor: 'muted'  as const },
  { id: 'users',      label: 'Users',      icon: I.users,      count: undefined, countColor: 'muted'  as const },
  { id: 'settings',   label: 'Settings',   icon: I.settings,   count: undefined, countColor: 'muted'  as const },
]

const officerNav = [
  { id: 'dashboard',  label: 'Dashboard',   icon: I.dashboard,  count: undefined, countColor: 'muted'  as const },
  { id: 'projects',   label: 'My Projects', icon: I.projects,   count: 8,         countColor: 'muted'  as const },
  { id: 'conflicts',  label: 'Conflicts',   icon: I.conflicts,  count: 1,         countColor: 'danger' as const },
  { id: 'map',        label: 'City Map',    icon: I.map,        count: undefined, countColor: 'muted'  as const },
  { id: 'complaints', label: 'Complaints',  icon: I.complaints, count: undefined, countColor: 'muted'  as const },
  { id: 'settings',   label: 'Settings',    icon: I.settings,   count: undefined, countColor: 'muted'  as const },
]

const supervisorNav = [
  { id: 'dashboard', label: 'Dashboard', icon: I.dashboard, count: undefined, countColor: 'muted' as const },
  { id: 'tasks',     label: 'My Tasks',  icon: I.tasks,     count: 3,         countColor: 'muted' as const },
  { id: 'settings',  label: 'Settings',  icon: I.settings,  count: undefined, countColor: 'muted' as const },
]

// ─── CIVIQ Logo Icon ───────────────────────────
function CiviqLogo({ size = 28, dark = false }: { size?: number; dark?: boolean }) {
  const road  = dark ? '#FFFFFF' : '#0D2145'
  const lane  = dark ? 'rgba(255,255,255,0.35)' : 'rgba(13,33,69,0.35)'
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="0"    y="11.5" width="28" height="5"   fill={road} rx="0.5"/>
      <rect x="11.5" y="0"    width="5"  height="28"  fill={road} rx="0.5"/>
      <rect x="0"    y="10"   width="10.5" height="1.5" fill={lane}/>
      <rect x="17.5" y="10"   width="10.5" height="1.5" fill={lane}/>
      <rect x="0"    y="16.5" width="10.5" height="1.5" fill={lane}/>
      <rect x="17.5" y="16.5" width="10.5" height="1.5" fill={lane}/>
      <rect x="10"   y="0"    width="1.5" height="10.5" fill={lane}/>
      <rect x="16.5" y="0"    width="1.5" height="10.5" fill={lane}/>
      <rect x="10"   y="17.5" width="1.5" height="10.5" fill={lane}/>
      <rect x="16.5" y="17.5" width="1.5" height="10.5" fill={lane}/>
      {/* Center — brand accent always */}
      <circle cx="14" cy="14" r="3.5" fill="#5E6AD2"/>
      <circle cx="14" cy="14" r="1.5" fill="white"/>
    </svg>
  )
}

// ─── Logo Wordmark ─────────────────────────────
// Light: navy text + accent dots
// Dark:  white text + accent dots (dots stay brand color)
function LogoWordmark({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? '#FFFFFF' : '#0D2145'
  return (
    <svg
      viewBox="0 0 108 28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      style={{ display: 'block' }}
    >
      <text x="0"  y="22" fontFamily="'Inter', sans-serif" fontSize="24" fontWeight="800" letterSpacing="-0.5" fill={textColor}>C</text>
      <text x="17" y="22" fontFamily="'Inter', sans-serif" fontSize="24" fontWeight="800" fill={textColor}>ı</text>
      <circle cx="20" cy="3" r="2.5" fill="#5E6AD2"/>
      <text x="24" y="22" fontFamily="'Inter', sans-serif" fontSize="24" fontWeight="800" fill={textColor}>V</text>
      <text x="41" y="22" fontFamily="'Inter', sans-serif" fontSize="24" fontWeight="800" fill={textColor}>ı</text>
      <circle cx="44" cy="3" r="2.5" fill="#5E6AD2"/>
      <text x="48" y="22" fontFamily="'Inter', sans-serif" fontSize="24" fontWeight="800" fill={textColor}>Q</text>
    </svg>
  )
}

// ─── Sidebar ───────────────────────────────────
export function Sidebar({
  role = 'admin',
  activeItem = 'dashboard',
  onNavigate,
  collapsed = false,
  onToggleCollapse,
  darkMode = false,
}: SidebarProps) {
  const navItems = role === 'admin' ? adminNav : role === 'officer' ? officerNav : supervisorNav

  return (
    <div className={[
      'flex flex-col h-full flex-shrink-0 transition-all duration-200',
      'bg-[#F7F7F7] dark:bg-[#0F0F0F]',
      collapsed ? 'w-[56px]' : 'w-[260px]',
    ].join(' ')}>

      {/* ── Logo — same height and border as navbar ── */}
      <div className={[
        'flex items-center h-20 flex-shrink-0',
        // 'border-b border-[#E5E5E5] dark:border-[#1E293B]',
        collapsed ? 'justify-center px-0' : 'px-4 gap-3',
      ].join(' ')}>
        {/* Logo icon and wordmark — same height, same baseline */}
        <div className="flex items-center gap-3">
          <CiviqLogo size={26} dark={darkMode} />
          {!collapsed && (
            <LogoWordmark dark={darkMode} />
          )}
        </div>
      </div>

      {/* ── Nav ── */}
      <div className={[
        'flex-1 overflow-y-auto py-2',
        collapsed ? 'px-2' : 'px-3',
      ].join(' ')}>
        {navItems.map(item => (
          <div key={item.id} className="mb-0.5">
            <NavItem
              icon={item.icon}
              label={item.label}
              active={activeItem === item.id}
              count={item.count}
              countColor={item.countColor}
              collapsed={collapsed}
              onClick={() => onNavigate?.(item.id)}
            />
          </div>
        ))}
      </div>

      {/* ── Collapse — no divider line, icon only ── */}
      <div className={[
        'py-3',
        collapsed ? 'flex justify-center px-0' : 'flex justify-end px-3',
      ].join(' ')}>
        <button
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[#9CA3AF] hover:text-[#374151] dark:hover:text-[#CBD5E1] hover:bg-[#EBEBEB] dark:hover:bg-[#1E293B] transition-all duration-150"
        >
          {collapsed ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="0.75" y="0.75" width="4" height="14.5" rx="2" fill="currentColor" opacity="0.15"/>
              <path d="M7 5L10 8L7 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="0.75" y="0.75" width="4" height="14.5" rx="2" fill="currentColor" opacity="0.15"/>
              <path d="M9 5L6 8L9 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

    </div>
  )
}

export default Sidebar