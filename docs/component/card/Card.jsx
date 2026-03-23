// ─────────────────────────────────────────────
//  CIVIQ — Card Component
//  Supabase color discipline:
//    Light: white card, light gray bg, black headings
//    Dark:  dark surface card, near-black bg, white headings
//  Single accent border on StatCard (#5E6AD2)
//  Only clashes get red number — everything else dark
// ─────────────────────────────────────────────

import { forwardRef } from 'react'

// ─── Types ─────────────────────────────────────
type CardVariant   = 'default' | 'selected' | 'danger' | 'wrapper'
type ProjectType   = 'road' | 'water' | 'electricity' | 'sewage' | 'parks' | 'other' | 'clash'
type ValueColor    = 'default' | 'accent' | 'danger' | 'success' | 'warning'
type SubLabelColor = 'default' | 'muted' | 'success' | 'danger' | 'warning'

// ─── Project type → left border color ─────────
const typeBorderColor: Record<ProjectType, string> = {
  road:        '#EA580C',
  water:       '#2563EB',
  electricity: '#CA8A04',
  sewage:      '#7C3AED',
  parks:       '#16A34A',
  other:       '#94A3B8',
  clash:       '#DC2626',
}

// ─── Progress bar color ───────────────────────
const progressBarColor = (pct: number): string => {
  if (pct >= 100) return '#5E6AD2'
  if (pct > 0)    return '#5E6AD2'
  return 'transparent'
}

// ─── Stat top border — single accent ALL cards ─
const ACCENT = '#5E6AD2'

// ─── Sub label colors — true neutral gray ─────
// Use Tailwind GRAY not SLATE (slate has blue undertone)
const subLabelColor: Record<SubLabelColor, string> = {
  default: 'text-[#6B7280] dark:text-[#9CA3AF]',
  muted:   'text-[#9CA3AF] dark:text-[#6B7280]',
  success: 'text-[#6B7280] dark:text-[#9CA3AF]',
  danger:  'text-[#DC2626] dark:text-[#FCA5A5]',
  warning: 'text-[#6B7280] dark:text-[#9CA3AF]',
}

// ─── Padding map ───────────────────────────────
const paddingMap = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-5' }

// ─────────────────────────────────────────────
//  BASE CARD
// ─────────────────────────────────────────────
interface CardProps {
  variant?: CardVariant
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'md',
}, ref) => {
  const clickable = Boolean(onClick) || hoverable
  const base = ['rounded-[8px] transition-all duration-150', paddingMap[padding]]

  if (variant === 'default') {
    base.push(
      'bg-[#FFFFFF] dark:bg-[#1C1C1F]',
      'border border-[#E2E8F0] dark:border-[#1E293B]',
    )
    if (clickable) base.push(
      'cursor-pointer',
      'hover:border-[#CBD5E1] dark:hover:border-[#334155]',
      'hover:bg-[#F8FAFC] dark:hover:bg-[#252529]',
      'active:scale-[0.995]',
    )
  }

  if (variant === 'selected') {
    base.push(
      'bg-[#F8FAFC] dark:bg-[#1C1C1F]',
      'border-[1.5px] border-[#5E6AD2]',
      clickable ? 'cursor-pointer active:scale-[0.995]' : '',
    )
  }

  if (variant === 'danger') {
    base.push(
      'bg-[#FEF2F2] dark:bg-[#1A0707]',
      'border border-[#FECACA] dark:border-[#7F1D1D]',
      clickable ? 'cursor-pointer active:scale-[0.995]' : '',
    )
  }

  if (variant === 'wrapper') {
    base.push(
      'bg-[#FFFFFF] dark:bg-[#1C1C1F]',
      'border border-[#E2E8F0] dark:border-[#1E293B]',
    )
  }

  return (
    <div
      ref={ref}
      className={[...base, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

// ─────────────────────────────────────────────
//  PROJECT CARD
// ─────────────────────────────────────────────
interface ProjectCardProps {
  title: string
  meta: string
  projectType: ProjectType
  progress?: number
  status: React.ReactNode
  typeBadge?: React.ReactNode
  extraBadges?: React.ReactNode
  date?: string
  onClick?: () => void
  selected?: boolean
  className?: string
}

const ProjectCard = ({
  title, meta, projectType, progress = 0,
  status, typeBadge, extraBadges, date,
  onClick, selected = false, className = '',
}: ProjectCardProps) => {
  const leftColor = typeBorderColor[projectType]
  const isDanger  = projectType === 'clash'

  return (
    <div
      className={[
        'rounded-[8px] overflow-hidden transition-all duration-150',
        isDanger
          ? 'bg-[#FEF2F2] dark:bg-[#1A0707] border border-[#FECACA] dark:border-[#7F1D1D]'
          : selected
            ? 'bg-[#F8FAFC] dark:bg-[#1C1C1F] border-[1.5px] border-[#5E6AD2]'
            : 'bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E2E8F0] dark:border-[#1E293B]',
        onClick ? 'cursor-pointer hover:border-[#CBD5E1] dark:hover:border-[#334155] hover:bg-[#F8FAFC] dark:hover:bg-[#252529] active:scale-[0.995]' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {/* Content */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
            {title}
          </p>
          <div className="flex-shrink-0">{status}</div>
        </div>
        <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] mb-4">{meta}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {typeBadge}
            {extraBadges}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {date && <span className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280]">{date}</span>}
            <span
              className="text-[12px] font-semibold"
              style={{ color: progress >= 100 ? '#5E6AD2' : progress > 0 ? '#5E6AD2' : '#9CA3AF' }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] bg-[#E2E8F0] dark:bg-[#1E293B]">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: progressBarColor(progress) }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
//  STAT CARD
//  Single accent border (#5E6AD2) on ALL cards
//  Only danger (clashes) gets red number
// ─────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
  valueColor?: ValueColor
  subLabel?: string
  subLabelColor?: SubLabelColor
  className?: string
}

const StatCard = ({
  label, value,
  valueColor = 'default',
  subLabel,
  subLabelColor: subColor = 'muted',
  className = '',
}: StatCardProps) => (
  <div
    className={[
      'bg-[#F8FAFC] dark:bg-[#18181B] rounded-[8px] px-5 pt-4 pb-5',
      'border border-[#E2E8F0] dark:border-[#1E293B]',
      className,
    ].join(' ')}
    style={{ borderTop: `2px solid ${ACCENT}` }}
  >
    <p className="text-[12px] font-medium text-[#6B7280] dark:text-[#9CA3AF] mb-3 leading-none uppercase tracking-wide">
      {label}
    </p>
    <p className={[
      'text-[32px] font-bold leading-none mb-2',
      valueColor === 'danger'
        ? 'text-[#DC2626] dark:text-[#FCA5A5]'
        : 'text-[#0F172A] dark:text-[#F8FAFC]',
    ].join(' ')}>
      {value}
    </p>
    {subLabel && (
      <p className={['text-[13px] leading-none', subLabelColor[subColor]].join(' ')}>
        {subLabel}
      </p>
    )}
  </div>
)

// ─── Sub-components ────────────────────────────
const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={['flex items-start justify-between gap-2 mb-3', className].join(' ')}>{children}</div>
)

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={['text-[15px] font-semibold leading-snug text-[#0F172A] dark:text-[#F8FAFC]', className].join(' ')}>
    {children}
  </p>
)

const CardMeta = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={['text-[12px] text-[#64748B] dark:text-[#475569] leading-none', className].join(' ')}>{children}</p>
)

const CardFooter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={['flex items-center gap-1.5 flex-wrap', className].join(' ')}>{children}</div>
)

const CardDivider = () => (
  <div className="h-px bg-[#E2E8F0] dark:border-[#1E293B] my-4" />
)

export default Card
export { ProjectCard, StatCard, CardHeader, CardTitle, CardMeta, CardFooter, CardDivider }