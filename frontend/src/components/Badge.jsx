// ─────────────────────────────────────────────
//  CIVIQ — Badge Component (JSX)
// ─────────────────────────────────────────────

const config = {
  approved:    { dot: 'bg-[#16A34A]', label: 'Approved',    lightBg: 'bg-[#F0FDF4]',   lightText: 'text-[#15803D]',  darkBg: 'dark:bg-[#0D1F14]', darkText: 'dark:text-[#4ADE80]'  },
  ongoing:     { dot: 'bg-[#5E6AD2]', label: 'Ongoing',     lightBg: 'bg-[#EEF2FF]',   lightText: 'text-[#4338CA]',  darkBg: 'dark:bg-[#131629]', darkText: 'dark:text-[#818CF8]'  },
  pending:     { dot: 'bg-[#94A3B8]', label: 'Pending',     lightBg: 'bg-[#F8FAFC]',   lightText: 'text-[#475569]',  darkBg: 'dark:bg-[#1A1F2B]', darkText: 'dark:text-[#64748B]'  },
  rejected:    { dot: 'bg-[#DC2626]', label: 'Rejected',    lightBg: 'bg-[#FEF2F2]',   lightText: 'text-[#B91C1C]',  darkBg: 'dark:bg-[#1F0A0A]', darkText: 'dark:text-[#F87171]'  },
  completed:   { dot: 'bg-[#64748B]', label: 'Completed',   lightBg: 'bg-[#F1F5F9]',   lightText: 'text-[#475569]',  darkBg: 'dark:bg-[#1A1F2B]', darkText: 'dark:text-[#64748B]'  },
  active:      { dot: 'bg-[#5E6AD2]', label: 'Active',      lightBg: 'bg-[#EEF2FF]',   lightText: 'text-[#4338CA]',  darkBg: 'dark:bg-[#131629]', darkText: 'dark:text-[#818CF8]'  },
  clash:       { dot: 'bg-[#DC2626] animate-pulse', label: 'Clash', lightBg: 'bg-[#FEF2F2]', lightText: 'text-[#B91C1C]', darkBg: 'dark:bg-[#1F0A0A]', darkText: 'dark:text-[#F87171]' },
  road:        { dot: 'bg-[#EA580C]', label: 'Road',        lightBg: 'bg-[#FFF7ED]',   lightText: 'text-[#C2410C]',  darkBg: 'dark:bg-[#1A0E05]', darkText: 'dark:text-[#FB923C]'  },
  water:       { dot: 'bg-[#2563EB]', label: 'Water',       lightBg: 'bg-[#EFF6FF]',   lightText: 'text-[#1D4ED8]',  darkBg: 'dark:bg-[#0A1220]', darkText: 'dark:text-[#60A5FA]'  },
  electricity: { dot: 'bg-[#CA8A04]', label: 'Electricity', lightBg: 'bg-[#FEFCE8]',   lightText: 'text-[#A16207]',  darkBg: 'dark:bg-[#181305]', darkText: 'dark:text-[#FACC15]'  },
  sewage:      { dot: 'bg-[#7C3AED]', label: 'Sewage',      lightBg: 'bg-[#F5F3FF]',   lightText: 'text-[#6D28D9]',  darkBg: 'dark:bg-[#130C22]', darkText: 'dark:text-[#A78BFA]'  },
  parks:       { dot: 'bg-[#16A34A]', label: 'Parks',       lightBg: 'bg-[#F0FDF4]',   lightText: 'text-[#15803D]',  darkBg: 'dark:bg-[#0D1F14]', darkText: 'dark:text-[#4ADE80]'  },
  other:       { dot: 'bg-[#94A3B8]', label: 'Other',       lightBg: 'bg-[#F8FAFC]',   lightText: 'text-[#475569]',  darkBg: 'dark:bg-[#1A1F2B]', darkText: 'dark:text-[#64748B]'  },
}

const sizeConfig = {
  sm: { pill: 'px-2 py-0.5 gap-1.5',  dot: 'w-1.5 h-1.5', text: 'text-[11px]' },
  md: { pill: 'px-2.5 py-1 gap-1.5',  dot: 'w-2 h-2',     text: 'text-[12px]' },
  lg: { pill: 'px-3 py-1.5 gap-2',    dot: 'w-2 h-2',     text: 'text-[13px]' },
}

export default function Badge({ variant, size = 'md', className = '' }) {
  const c = config[variant]
  const s = sizeConfig[size]
  if (!c) return null

  return (
    <span className={[
      'inline-flex items-center rounded-full font-medium flex-shrink-0',
      s.pill, s.text,
      c.lightBg, c.lightText,
      c.darkBg, c.darkText,
      className,
    ].join(' ')}>
      <span className={['rounded-full flex-shrink-0', s.dot, c.dot].join(' ')} />
      {c.label}
    </span>
  )
}
