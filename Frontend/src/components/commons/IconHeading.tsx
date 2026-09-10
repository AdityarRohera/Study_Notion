import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface IconHeadingType {
  icon: ReactNode;
  text: string;
  path: string;
  onNavigate?: () => void;
}

/** A single sidebar navigation item. */
function IconHeading({ path, icon, text, onNavigate }: IconHeadingType) {
  const location = useLocation();
  const isActive =
    location.pathname === path ||
    (path !== "/dashboard" && location.pathname.startsWith(path));

  return (
    <Link
      to={path}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-brand-400/12 text-brand-300"
          : "text-ink-300 hover:bg-ink-800 hover:text-white"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand-400 transition-opacity duration-200 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-base">
        {icon}
      </span>
      <span className="truncate">{text}</span>
    </Link>
  );
}

export default IconHeading;
