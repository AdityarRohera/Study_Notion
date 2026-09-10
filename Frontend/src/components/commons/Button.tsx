import type { ReactElement } from "react";

/**
 * Shared button.
 *
 * The original API (variant / size / text / icons / onClick / onchange) is kept
 * intact so every existing call site keeps working; sizes are now padding-based
 * instead of fixed pixel boxes so buttons no longer overflow on small screens.
 */
interface ButtonProps {
  variant: "primary" | "secondary" | "redish" | "outline" | "ghost";
  size: "sm" | "md" | "lg" | "xl";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  onchange?: (e: any) => void;
  onClick?: (e: any) => void;
}

const buttonVariant = {
  primary:
    "bg-brand-400 text-ink-950 shadow-soft hover:bg-brand-300 hover:shadow-glow active:bg-brand-500",
  secondary:
    "bg-ink-800 text-ink-50 border border-ink-700 hover:bg-ink-750 hover:border-ink-600",
  redish:
    "bg-danger-500 text-white shadow-soft hover:bg-danger-600 active:bg-danger-600",
  outline:
    "bg-transparent text-brand-300 border border-brand-400/60 hover:bg-brand-400/10 hover:border-brand-400",
  ghost: "bg-transparent text-ink-200 hover:bg-ink-800 hover:text-white",
};

const sizeVariant = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-10 px-4 text-sm sm:text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] sm:text-base",
  xl: "h-12 w-full px-6 text-base",
};

const commonVariant =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold cursor-pointer select-none whitespace-nowrap transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98]";

function Button({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  className,
  type = "button",
  disabled,
  ariaLabel,
  onchange,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel ?? text}
      className={`${buttonVariant[variant]} ${sizeVariant[size]} ${
        commonVariant
      } ${className ?? ""}`}
      onChange={onchange}
      onClick={onClick}
    >
      {startIcon ? <span className="shrink-0">{startIcon}</span> : null}
      {text}
      {endIcon ? <span className="shrink-0">{endIcon}</span> : null}
    </button>
  );
}

export default Button;
