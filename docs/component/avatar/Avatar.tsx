// ─────────────────────────────────────────────
//  CIVIQ — Avatar Component
//  Railway inspired — minimal, subtle, never loud
//
//  Light mode: soft gray bg · muted text · thin border
//  Dark mode:  dark surface bg · dim text · barely visible
//
//  Sizes:   sm (24px) · md (32px) · lg (40px) · xl (52px)
//  Types:   initials · image
//  Extras:  online dot · stacked group
//
//  Usage:
//    sm  — sidebar profile, table rows, dense lists
//    md  — navbar, card meta, user lists
//    lg  — profile headers, conflict detail
//    xl  — profile page, settings
// ─────────────────────────────────────────────

// ─── Types ─────────────────────────────────────
type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  initials?: string
  src?: string
  size?: AvatarSize
  online?: boolean
  alt?: string
  className?: string
}

interface AvatarGroupProps {
  avatars: Array<{ initials: string; src?: string }>
  max?: number
  size?: AvatarSize
  className?: string
}

// ─── Size config ───────────────────────────────
const sizeConfig: Record<AvatarSize, {
  box:     string
  text:    string
  dot:     string
  dotPos:  string
  border:  string
}> = {
  sm: {
    box:    'w-6 h-6',
    text:   'text-[10px]',
    dot:    'w-[7px] h-[7px]',
    dotPos: '-bottom-[1px] -right-[1px]',
    border: 'border-[1.5px]',
  },
  md: {
    box:    'w-8 h-8',
    text:   'text-[11px]',
    dot:    'w-[8px] h-[8px]',
    dotPos: '-bottom-[1px] -right-[1px]',
    border: 'border-[1.5px]',
  },
  lg: {
    box:    'w-10 h-10',
    text:   'text-[13px]',
    dot:    'w-[10px] h-[10px]',
    dotPos: 'bottom-0 right-0',
    border: 'border-2',
  },
  xl: {
    box:    'w-[52px] h-[52px]',
    text:   'text-[16px]',
    dot:    'w-[12px] h-[12px]',
    dotPos: 'bottom-[1px] right-[1px]',
    border: 'border-2',
  },
}

// ─── Avatar Component ──────────────────────────
export default function Avatar({
  initials = '?',
  src,
  size = 'md',
  online = false,
  alt = '',
  className = '',
}: AvatarProps) {
  const s = sizeConfig[size]

  return (
    <div className={['relative inline-flex flex-shrink-0', className].join(' ')}>
      <div className={[
        s.box,
        'rounded-full flex items-center justify-center overflow-hidden',
        'bg-[#F4F4F5] dark:bg-[#1C1C1F]',
        'border border-[#E4E4E7] dark:border-[#27272A]',
        'transition-colors duration-150',
      ].join(' ')}>
        {src ? (
          <img
            src={src}
            alt={alt || initials}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={[
            s.text,
            'font-medium select-none leading-none',
            'text-[#71717A] dark:text-[#52525B]',
          ].join(' ')}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Online indicator */}
      {online && (
        <span className={[
          s.dot,
          s.dotPos,
          s.border,
          'absolute rounded-full',
          'bg-[#16A34A]',
          'border-[#FFFFFF] dark:border-[#141414]',
        ].join(' ')} />
      )}
    </div>
  )
}

// ─── Avatar Group ──────────────────────────────
// Stacked overlapping avatars with overflow count
export function AvatarGroup({
  avatars,
  max = 3,
  size = 'sm',
  className = '',
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max
  const s = sizeConfig[size]

  // Negative margin based on size
  const overlapMap: Record<AvatarSize, string> = {
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3',
    xl: '-ml-4',
  }

  return (
    <div className={['flex items-center', className].join(' ')}>
      {visible.map((av, i) => (
        <div
          key={i}
          className={[
            i > 0 ? overlapMap[size] : '',
            'relative',
          ].join(' ')}
          style={{ zIndex: visible.length - i }}
        >
          <div className={[
            s.box,
            'rounded-full flex items-center justify-center overflow-hidden',
            'bg-[#F4F4F5] dark:bg-[#1C1C1F]',
            'border-[1.5px] border-[#FFFFFF] dark:border-[#141414]',
          ].join(' ')}>
            {av.src ? (
              <img src={av.src} alt={av.initials} className="w-full h-full object-cover" />
            ) : (
              <span className={[s.text, 'font-medium select-none leading-none text-[#71717A] dark:text-[#52525B]'].join(' ')}>
                {av.initials.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      ))}

      {overflow > 0 && (
        <div
          className={[overlapMap[size], 'relative'].join(' ')}
          style={{ zIndex: 0 }}
        >
          <div className={[
            s.box,
            'rounded-full flex items-center justify-center',
            'bg-[#F4F4F5] dark:bg-[#1C1C1F]',
            'border-[1.5px] border-[#FFFFFF] dark:border-[#141414]',
            s.text,
            'font-medium text-[#A1A1AA] dark:text-[#3F3F46] select-none',
          ].join(' ')}>
            +{overflow}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Avatar with name ──────────────────────────
// Convenient compound component for user rows
interface AvatarWithNameProps {
  initials?: string
  src?: string
  name: string
  subtitle?: string
  size?: AvatarSize
  online?: boolean
  className?: string
}

export function AvatarWithName({
  initials,
  src,
  name,
  subtitle,
  size = 'md',
  online = false,
  className = '',
}: AvatarWithNameProps) {
  const gapMap: Record<AvatarSize, string> = {
    sm: 'gap-2',
    md: 'gap-2.5',
    lg: 'gap-3',
    xl: 'gap-3',
  }

  return (
    <div className={['flex items-center', gapMap[size], className].join(' ')}>
      <Avatar
        initials={initials}
        src={src}
        size={size}
        online={online}
      />
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[#09090B] dark:text-[#FAFAFA] truncate leading-tight">
          {name}
        </p>
        {subtitle && (
          <p className="text-[11px] text-[#A1A1AA] dark:text-[#52525B] truncate leading-tight mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
