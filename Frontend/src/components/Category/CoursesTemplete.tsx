import { useState } from "react";

import CardContainer from "./CardContainer";

interface CourseTempleteType {
  heading: string;
  subheading?: string;
  filterBar?: boolean;
  name: string;
}

const FILTERS = ["Most Popular", "New", "Trending"];

function CoursesTemplete({
  heading,
  subheading,
  filterBar,
  name,
}: CourseTempleteType) {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <section className="flex flex-col gap-6 text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">
              {subheading}
            </p>
          )}
        </div>

        {filterBar && (
          <div
            role="tablist"
            aria-label="Sort courses"
            className="scrollbar-hidden flex gap-1 overflow-x-auto rounded-xl border border-ink-800 bg-ink-900 p-1"
          >
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-ink-800 text-brand-300"
                      : "text-ink-400 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <CardContainer name={name} />
    </section>
  );
}

export default CoursesTemplete;
