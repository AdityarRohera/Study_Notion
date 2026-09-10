import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";

type Action = {
  label: string;
  to?: string;
  onClick?: () => void;
};

function ActionButton({ action, tone }: { action: Action; tone: "solid" | "quiet" }) {
  const cls =
    tone === "solid"
      ? "bg-brand-400 text-ink-950 hover:bg-brand-300 hover:shadow-glow"
      : "border border-ink-700 text-ink-200 hover:border-ink-600 hover:text-white";

  const base = `inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${cls}`;

  if (action.to) {
    return (
      <Link to={action.to} className={base}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={base}>
      {action.label}
    </button>
  );
}

/** Friendly "nothing here yet" panel with a way forward. */
export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: Action;
  secondaryAction?: Action;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-700 bg-ink-900/60 px-6 py-14 text-center ${
        className ?? ""
      }`}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-800 text-brand-300">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>

      <h3 className="font-display text-lg font-bold text-white sm:text-xl">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-400">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {action && <ActionButton action={action} tone="solid" />}
          {secondaryAction && (
            <ActionButton action={secondaryAction} tone="quiet" />
          )}
        </div>
      )}
    </div>
  );
}

/** Recoverable error panel — always offers a retry. */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now. Please check your connection and try again.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center rounded-2xl border border-danger-500/30 bg-danger-500/[0.06] px-6 py-14 text-center ${
        className ?? ""
      }`}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-500/15 text-danger-400">
        <AlertTriangle className="h-6 w-6" />
      </div>

      <h3 className="font-display text-lg font-bold text-white sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-300">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}

export default EmptyState;
