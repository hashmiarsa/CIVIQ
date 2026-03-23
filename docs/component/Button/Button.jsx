import { useState } from "react";

// ─────────────────────────────────────────────
//  CIVIQ — Button Component
//  Color system: #5E6AD2 accent · cool gray scale
//  Variants: primary · secondary · ghost · tinted · destructive · compact · icon
//  Sizes: sm · md · lg
//  States: default · hover · active · disabled · loading
// ─────────────────────────────────────────────

const Spinner = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    className="animate-spin"
  >
    <circle
      cx="7" cy="7" r="5.5"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="1.5"
    />
    <path
      d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Size config ───────────────────────────────
const sizeConfig = {
  sm: {
    padding:   "px-3 py-1.5",
    text:      "text-xs",
    height:    "h-7",
    iconSize:  14,
    gap:       "gap-1.5",
    radius:    "rounded-[5px]",
  },
  md: {
    padding:   "px-4 py-2",
    text:      "text-sm",
    height:    "h-9",
    iconSize:  15,
    gap:       "gap-2",
    radius:    "rounded-[6px]",
  },
  lg: {
    padding:   "px-5 py-2.5",
    text:      "text-sm",
    height:    "h-10",
    iconSize:  16,
    gap:       "gap-2",
    radius:    "rounded-[6px]",
  },
};

// ─── Variant config ────────────────────────────
const variantConfig = {
  primary: {
    base:     "bg-[#5E6AD2] text-white border border-[#5E6AD2]",
    hover:    "hover:bg-[#4A56C1] hover:border-[#4A56C1]",
    active:   "active:bg-[#3D4DB8] active:border-[#3D4DB8]",
    disabled: "disabled:bg-[#A1A1AA] disabled:border-[#A1A1AA] disabled:text-white",
    dark:     "dark:hover:bg-[#6E7ADE] dark:hover:border-[#6E7ADE]",
  },
  secondary: {
    base:     "bg-[#FFFFFF] text-[#09090B] border border-[#E4E4E7]",
    hover:    "hover:bg-[#F4F4F5] hover:border-[#D4D4D8]",
    active:   "active:bg-[#E4E4E7]",
    disabled: "disabled:bg-[#F4F4F5] disabled:text-[#A1A1AA] disabled:border-[#E4E4E7]",
    dark:     "dark:bg-[#232326] dark:text-[#FAFAFA] dark:border-[#27272A] dark:hover:bg-[#2A2A2D] dark:hover:border-[#3F3F46]",
  },
  ghost: {
    base:     "bg-transparent text-[#3F3F46] border border-transparent",
    hover:    "hover:bg-[#F4F4F5] hover:text-[#09090B]",
    active:   "active:bg-[#E4E4E7]",
    disabled: "disabled:text-[#A1A1AA]",
    dark:     "dark:text-[#A1A1AA] dark:hover:bg-[#1C1C1F] dark:hover:text-[#FAFAFA]",
  },
  tinted: {
    base:     "bg-[#ECEEFE] text-[#5E6AD2] border border-[#ECEEFE]",
    hover:    "hover:bg-[#DDE0FC] hover:border-[#DDE0FC]",
    active:   "active:bg-[#CDD2FA]",
    disabled: "disabled:bg-[#F4F4F5] disabled:text-[#A1A1AA] disabled:border-[#F4F4F5]",
    dark:     "dark:bg-[#1E2260] dark:text-[#9BA3F0] dark:border-[#1E2260] dark:hover:bg-[#252870] dark:hover:border-[#252870]",
  },
  destructive: {
    base:     "bg-[#DC2626] text-white border border-[#DC2626]",
    hover:    "hover:bg-[#B91C1C] hover:border-[#B91C1C]",
    active:   "active:bg-[#991B1B]",
    disabled: "disabled:bg-[#A1A1AA] disabled:border-[#A1A1AA] disabled:text-white",
    dark:     "dark:hover:bg-[#B91C1C]",
  },
};

// ─── Base Button ───────────────────────────────
function Button({
  variant = "primary",
  size = "md",
  children,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  shortcut,
  onClick,
  type = "button",
  className = "",
}) {
  const s = sizeConfig[size];
  const v = variantConfig[variant];

  const isDisabled = disabled || loading;

  const base = [
    "inline-flex items-center justify-center font-medium select-none",
    "transition-all duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2] focus-visible:ring-offset-2",
    "active:scale-[0.98]",
    s.height,
    s.padding,
    s.text,
    s.gap,
    s.radius,
    v.base,
    !isDisabled && v.hover,
    !isDisabled && v.active,
    v.dark,
    isDisabled && "cursor-not-allowed opacity-60",
    isDisabled && v.disabled,
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={base}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading ? (
        <Spinner size={s.iconSize} />
      ) : (
        iconLeft && (
          <span className="shrink-0" style={{ width: s.iconSize, height: s.iconSize }}>
            {iconLeft}
          </span>
        )
      )}

      {children && (
        <span className="leading-none">{children}</span>
      )}

      {!loading && iconRight && (
        <span className="shrink-0" style={{ width: s.iconSize, height: s.iconSize }}>
          {iconRight}
        </span>
      )}

      {shortcut && !loading && (
        <span className={[
          "ml-1 font-mono leading-none opacity-60",
          size === "sm" ? "text-[10px]" : "text-[11px]",
        ].join(" ")}>
          {shortcut}
        </span>
      )}
    </button>
  );
}

// ─── Icon-only Button ──────────────────────────
function IconButton({
  variant = "ghost",
  size = "md",
  icon,
  disabled = false,
  loading = false,
  onClick,
  className = "",
  label,
}) {
  const s = sizeConfig[size];
  const v = variantConfig[variant];
  const isDisabled = disabled || loading;

  const iconOnlySizes = { sm: "w-7 h-7", md: "w-9 h-9", lg: "w-10 h-10" };

  const base = [
    "inline-flex items-center justify-center shrink-0",
    "transition-all duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2] focus-visible:ring-offset-2",
    "active:scale-[0.98]",
    iconOnlySizes[size],
    s.radius,
    v.base,
    !isDisabled && v.hover,
    !isDisabled && v.active,
    v.dark,
    isDisabled && "cursor-not-allowed opacity-60",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={base}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {loading ? (
        <Spinner size={s.iconSize} />
      ) : (
        <span style={{ width: s.iconSize, height: s.iconSize }} className="flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
}

// ─── Named exports ─────────────────────────────
export const PrimaryButton     = (props) => <Button variant="primary"     {...props} />;
export const SecondaryButton   = (props) => <Button variant="secondary"   {...props} />;
export const GhostButton       = (props) => <Button variant="ghost"       {...props} />;
export const TintedButton      = (props) => <Button variant="tinted"      {...props} />;
export const DestructiveButton = (props) => <Button variant="destructive" {...props} />;
export { IconButton };

export default Button;
