import { useState } from "react";
import { PlayCircle } from "lucide-react";

import { formatDuration } from "../../Services/operations/common";

function CourseSubSection({ subSectionData }: any) {
  const { subSectionName, description, duration } = subSectionData;
  const [isVisible, setIsVisible] = useState(false);

  const time = formatDuration(duration);
  const hasDescription = Boolean(description);

  return (
    <div className="border-t border-ink-800 bg-ink-950">
      <button
        type="button"
        aria-expanded={hasDescription ? isVisible : undefined}
        disabled={!hasDescription}
        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-ink-900 disabled:cursor-default disabled:hover:bg-transparent sm:px-6 sm:pl-12"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <PlayCircle className="h-4 w-4 shrink-0 text-ink-400" />
          <span className="truncate text-sm text-ink-200">
            {subSectionName}
          </span>
        </span>
        <span className="shrink-0 font-mono text-xs text-ink-500">{time}</span>
      </button>

      {hasDescription && (
        <div
          className={`grid transition-all duration-300 ease-out ${
            isVisible
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-4 pb-4 text-sm leading-relaxed text-ink-400 sm:px-6 sm:pl-[4.25rem]">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSubSection;
