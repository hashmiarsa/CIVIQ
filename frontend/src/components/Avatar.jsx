import { forwardRef } from 'react'

// ─── Size config ───────────────────────────────
const sizeConfig = {
  sm: { box: 'w-6 h-6',       text: 'text-[10px]', dot: 'w-[7px] h-[7px]',  dotPos: '-bottom-[1px] -right-[1px]', border: 'border-[1.5px]' },
  md: { box: 'w-8 h-8',       text: 'text-[11px]', dot: 'w-[8px] h-[8px]',  dotPos: '-bottom-[1px] -right-[1px]', border: 'border-[1.5px]' },
  lg: { box: 'w-10 h-10',     text: 'text-[13px]', dot: 'w-[10px] h-[10px]',dotPos: 'bottom-0 right-0',           border: 'border-2'       },
  xl: { box: 'w-[52px] h-[52px]', text: 'text-[16px]', dot: 'w-[12px] h-[12px]',dotPos: 'bottom-[1px] right-[1px]', border: 'border-2'   },
}

// ─── Avatar ────────────────────────────────────
export default function Avatar({ initials = '?', src, size = 'md', online = false, alt = '' }) {
  const s = sizeConfig[size]
  return (
    <div className="relative inline-flex flex-shrink-0">
      <div className={[s.box, 'rounded-full flex items-center justify-center overflow-hidden bg-[#F4F4F5] dark:bg-[#1C1C1F] border border-[#E4E4E7] dark:border-[#27272A] transition-colors duration-150'].join(' ')}>
        {src ? (
          <img src={src} alt={alt || initials} className="w-full h-full object-cover" />
        ) : (
          <span className={[s.text, 'font-medium select-none leading-none text-[#71717A] dark:text-[#52525B]'].join(' ')}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      {online && (
        <span className={[s.dot, s.dotPos, s.border, 'absolute rounded-full bg-[#16A34A] border-[#FFFFFF] dark:border-[#141414]'].join(' ')} />
      )}
    </div>
  )
}

// ─── Avatar Group ──────────────────────────────
export function AvatarGroup({ avatars, max = 3, size = 'sm' }) {
  const visible  = avatars.slice(0, max)
  const overflow = avatars.length - max
  const s        = sizeConfig[size]
  const overlapMap = { sm: '-ml-2', md: '-ml-2.5', lg: '-ml-3', xl: '-ml-4' }

  return (
    <div className="flex items-center">
      {visible.map((av, i) => (
        <div key={i} className={[i > 0 ? overlapMap[size] : '', 'relative'].join(' ')} style={{ zIndex: visible.length - i }}>
          <div className={[s.box, 'rounded-full flex items-center justify-center overflow-hidden bg-[#F4F4F5] dark:bg-[#1C1C1F] border-[1.5px] border-[#FFFFFF] dark:border-[#141414]'].join(' ')}>
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
        <div className={[overlapMap[size], 'relative'].join(' ')} style={{ zIndex: 0 }}>
          <div className={[s.box, 'rounded-full flex items-center justify-center bg-[#F4F4F5] dark:bg-[#1C1C1F] border-[1.5px] border-[#FFFFFF] dark:border-[#141414]', s.text, 'font-medium text-[#A1A1AA] dark:text-[#3F3F46] select-none'].join(' ')}>
            +{overflow}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Avatar with Name ──────────────────────────
export function AvatarWithName({ initials, src, name, subtitle, size = 'md', online = false }) {
  const gapMap = { sm: 'gap-2', md: 'gap-2.5', lg: 'gap-3', xl: 'gap-3' }
  return (
    <div className={['flex items-center', gapMap[size]].join(' ')}>
      <Avatar initials={initials} src={src} size={size} online={online} />
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[#09090B] dark:text-[#FAFAFA] truncate leading-tight">{name}</p>
        {subtitle && <p className="text-[11px] text-[#A1A1AA] dark:text-[#52525B] truncate leading-tight mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}
