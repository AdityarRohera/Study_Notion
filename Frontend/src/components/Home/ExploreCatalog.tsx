import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Signal } from "lucide-react";

import { HomePageExplore } from "../../Data/homePageExplore";

/**
 * Tabbed catalog preview driven by the existing HomePageExplore data.
 * Tabs scroll horizontally on phones instead of wrapping into a ragged block.
 */
function ExploreCatalog() {
  const [activeTag, setActiveTag] = useState(HomePageExplore[0]?.tag ?? "");

  const activeGroup =
    HomePageExplore.find((group) => group.tag === activeTag) ??
    HomePageExplore[0];

  return (
    <section className="sn-container-wide w-full">
      <div className="mx-auto max-w-2xl text-center">
        <span className="sn-eyebrow">Unlock your potential</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
          Explore our <span className="sn-gradient-text">catalog</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-400">
          Start free, then go deep. Pick a track that matches where you are today
          and where you want to be in six months.
        </p>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Course categories"
        className="scrollbar-hidden mt-10 flex gap-2 overflow-x-auto rounded-2xl border border-ink-800 bg-ink-900 p-1.5 sm:mx-auto sm:w-fit"
      >
        {HomePageExplore.map((group) => {
          const isActive = group.tag === activeTag;
          return (
            <button
              key={group.tag}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveTag(group.tag)}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-brand-400 text-ink-950 shadow-soft"
                  : "text-ink-300 hover:bg-ink-800 hover:text-white"
              }`}
            >
              {group.tag}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeGroup?.courses.map((course) => (
          <article
            key={`${activeGroup.tag}-${course.heading}`}
            className="sn-card sn-card-hover group flex animate-fade-up flex-col p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-bold text-white">
                {course.heading.trim()}
              </h3>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
            </div>

            <p className="sn-clamp-3 mt-3 flex-1 text-sm leading-relaxed text-ink-400">
              {course.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-ink-800 pt-4">
              <span className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
                <Signal className="h-3.5 w-3.5 text-brand-400" />
                {course.level}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
                <BookOpen className="h-3.5 w-3.5 text-accent-400" />
                {course.lessionNumber} lessons
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/courses"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-700 px-6 text-sm font-semibold text-ink-100 transition-all duration-300 hover:border-brand-400/50 hover:bg-brand-400/10 hover:text-brand-200"
        >
          View all courses
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export default ExploreCatalog;
