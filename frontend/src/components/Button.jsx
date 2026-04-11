// ─────────────────────────────────────────────
//  CIVIQ — Button (JSX)
//  Variants: primary · secondary · danger · ghost
//  Sizes: sm · md · lg
//  States: loading spinner · disabled
// ─────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14" height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <circle
        cx="7" cy="7" r="5.5"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon,
}) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-medium leading-none select-none',
    'rounded-[6px] transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#5E6AD2]',
    (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ')

  const variants = {
    primary:   'bg-[#5E6AD2] hover:bg-[#4A56C1] text-white dark:hover:bg-[#6E7ADE]',
    secondary: 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] dark:bg-[#1E293B] dark:hover:bg-[#252529] dark:text-[#F8FAFC]',
    danger:    'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
    ghost:     'bg-transparent hover:bg-[#F1F5F9] text-[#6B7280] hover:text-[#0F172A] dark:hover:bg-[#1E293B] dark:hover:text-[#F8FAFC]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-[12px]',
    md: 'px-4 py-2 text-[14px]',
    lg: 'px-5 py-2.5 text-[14px]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[base, variants[variant], sizes[size], className].join(' ')}
    >
      {loading ? <Spinner /> : icon ? <span className="flex-shrink-0">{icon}</span> : null}
      {children}
    </button>
  )
}
