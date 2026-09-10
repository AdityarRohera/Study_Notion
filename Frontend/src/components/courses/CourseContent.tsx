import { useState } from "react";

import CourseSection from "./CourseSection";
import { formatDuration } from "../../Services/operations/common";

function CourseContent({ courseContent, duration }: any) {
  const [allCollapsed, setAllCollapsed] = useState(false);

  const sections = Array.isArray(courseContent) ? courseContent : [];
  const totalSections = sections.length;
  const totalLectures = sections.reduce(
    (acc: number, sec: any) => acc + (sec.sectionLecture?.length ?? 0),
    0
  );
  const totalDuration = formatDuration(duration);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Course content
        </h2>

        <div className="flex flex-col gap-2 text-sm text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{totalSections} sections</span>
            <span aria-hidden="true">•</span>
            <span>{totalLectures} lectures</span>
            <span aria-hidden="true">•</span>
            <span>{totalDuration} total length</span>
          </p>

          <button
            type="button"
            className="self-start text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200 sm:self-auto"
            onClick={() => setAllCollapsed((prev) => !prev)}
          >
            {allCollapsed ? "Expand all sections" : "Collapse all sections"}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-800">
        {sections.map((section: any) => (
          <CourseSection
            key={section._id}
            data={section}
            forceCollapse={allCollapsed}
          />
        ))}
      </div>
    </section>
  );
}

export default CourseContent;
