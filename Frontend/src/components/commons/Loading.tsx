import { Loader2 } from "lucide-react";

type SpinnerProps = {
  className?: string;
  label?: string;
};

/** Inline spinner — use inside buttons, cards and small regions. */
export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label={label}
      className={`animate-spin text-brand-400 ${className ?? "h-5 w-5"}`}
    />
  );
}

/**
 * Full-page loader used as a route-level fallback.
 * Deliberately calm: a soft brand halo instead of a hard black flash.
 */
function Loading({ message = "Loading" }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex min-h-[70vh] w-full items-center justify-center bg-ink-950 px-6"
    >
      <div className="sn-aurora" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/15" />
          <span className="absolute inset-2 rounded-full bg-brand-400/10" />
          <Loader2 className="relative h-10 w-10 animate-spin text-brand-400" />
        </div>

        <div className="text-center">
          <p className="font-display text-lg font-semibold tracking-tight text-white">
            {message}
            <span className="text-brand-400">…</span>
          </p>
          <p className="mt-1 text-sm text-ink-400">
            Just a moment while we get things ready.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
