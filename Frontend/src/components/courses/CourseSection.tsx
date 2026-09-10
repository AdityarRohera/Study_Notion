import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import CourseSubSection from "./CourseSubSection";
import { formatDuration } from "../../Services/operations/common";

function CourseSection({ data, forceCollapse }: any) {
  const { sectionName, sectionLecture } = data;
  const [isVisible, setIsVisible] = useState(false);

  const lectures = Array.isArray(sectionLecture) ? sectionLecture : [];

  const sectionDuration = lectures.reduce(
    (acc: number, lecture: any) => acc + Number(lecture?.duration ?? 0),
    0
  );

  // Handle collapse / expand all
  useEffect(() => {
    if (forceCollapse) setIsVisible(false);
    else setIsVisible(true);
  }, [forceCollapse]);

  return (
    <div className="border-b border-ink-800 last:border-b-0">
      <button
        type="button"
        aria-expanded={isVisible}
        className="flex w-full items-center justify-between gap-4 bg-ink-900 px-4 py-4 text-left transition-colors duration-200 hover:bg-ink-850 sm:px-6"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-brand-400 transition-transform duration-300 ${
              isVisible ? "" : "-rotate-90"
            }`}
          />
          <span className="truncate font-semibold text-ink-100">
            {sectionName}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-3 text-xs text-ink-400 sm:gap-4 sm:text-sm">
          <span>{lectures.length} lectures</span>
          {sectionDuration > 0 && (
            <span className="hidden sm:inline">
              {formatDuration(sectionDuration)}
            </span>
          )}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isVisible ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {lectures.map((subSection: any) => (
            <CourseSubSection
              key={subSection._id}
              subSectionData={subSection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseSection;
