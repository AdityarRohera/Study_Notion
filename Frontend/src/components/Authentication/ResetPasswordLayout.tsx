import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ResetPasswordType {
  heading: string;
  desc: string;
  children?: ReactNode;
  buttonText?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  submitHandler?: (e: any) => void;
}

/** Centred single-card shell shared by the whole password-reset flow. */
export const ResetPasswordLayout = ({
  heading,
  desc,
  children,
  buttonText,
  icon,
  footer,
  submitHandler,
}: ResetPasswordType) => {
  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-ink-950 px-4 py-14">
      <div className="sn-aurora" aria-hidden="true" />

      <div className="sn-card relative w-full max-w-md animate-fade-up p-7 sm:p-9">
        {icon && (
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300">
            {icon}
          </div>
        )}

        <h1 className="font-display text-2xl font-bold text-white">{heading}</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-400">{desc}</p>

        <form onSubmit={submitHandler} className="mt-7 space-y-5">
          {children}

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-400 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.99]"
          >
            {buttonText}
          </button>
        </form>

        {footer}

        <Link
          to="/login"
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink-400 transition-colors hover:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
};
