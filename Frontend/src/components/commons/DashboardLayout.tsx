import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import MenuBar, { useMenuGroups } from "./MenuBar";

type Crumb = { label: string; to?: string };

/**
 * App-shell for every /dashboard route.
 *
 * Replaces the old `w-[15%] + w-[85%]` split, which produced an unusable
 * 50px-wide sidebar on phones. The rail is sticky from `lg` up; below that the
 * same navigation becomes a horizontally scrollable tab strip.
 */
function DashboardLayout({
  title,
  subtitle,
  breadcrumbs,
  actions,
  children,
  contentClassName,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}) {
  const groups = useMenuGroups();
  const location = useLocation();
  const flatItems = groups.flatMap((group) => group.items);

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] bg-ink-950">
      {/* Desktop rail */}
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 lg:block">
        <MenuBar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav strip */}
        <div className="border-b border-ink-800 bg-ink-900 lg:hidden">
          <div className="scrollbar-hidden flex gap-1.5 overflow-x-auto px-4 py-3">
            {flatItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/dashboard" &&
                  location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-400/12 text-brand-300"
                      : "text-ink-300 hover:bg-ink-800 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="whitespace-nowrap">{item.text}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className={`flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 ${
            contentClassName ?? ""
          }`}
        >
          {(breadcrumbs?.length || title || actions) && (
            <header className="mb-8">
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav aria-label="Breadcrumb" className="mb-3">
                  <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-400 sm:text-sm">
                    {breadcrumbs.map((crumb, i) => {
                      const isLast = i === breadcrumbs.length - 1;
                      return (
                        <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
                          {i > 0 && (
                            <ChevronRight
                              className="h-3.5 w-3.5 text-ink-600"
                              aria-hidden="true"
                            />
                          )}
                          {crumb.to && !isLast ? (
                            <Link
                              to={crumb.to}
                              className="transition-colors hover:text-ink-200"
                            >
                              {crumb.label}
                            </Link>
                          ) : (
                            <span
                              aria-current={isLast ? "page" : undefined}
                              className={
                                isLast ? "font-semibold text-brand-300" : ""
                              }
                            >
                              {crumb.label}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  {title && (
                    <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                      {subtitle}
                    </p>
                  )}
                </div>

                {actions && (
                  <div className="flex shrink-0 items-center gap-3">
                    {actions}
                  </div>
                )}
              </div>
            </header>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
