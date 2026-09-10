import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/** Catalog page hero: breadcrumb + category title + description. */
function AboutCourse({ heading, desc }: any) {
  return (
    <header className="relative overflow-hidden border-b border-ink-800 bg-ink-900">
      <div className="sn-aurora" aria-hidden="true" />

      <div className="sn-container-wide relative py-12 md:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
            <li>
              <Link to="/" className="transition-colors hover:text-ink-200">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-ink-600" aria-hidden />
            <li>
              <Link
                to="/courses"
                className="transition-colors hover:text-ink-200"
              >
                Catalog
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-ink-600" aria-hidden />
            <li aria-current="page" className="font-semibold text-brand-300">
              {heading}
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]">
          {heading}
        </h1>

        {desc && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-300 sm:text-lg">
            {desc}
          </p>
        )}
      </div>
    </header>
  );
}

export default AboutCourse;
