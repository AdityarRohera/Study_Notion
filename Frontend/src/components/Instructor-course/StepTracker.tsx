import { Check } from "lucide-react";

const STEPS = ["Course information", "Course builder", "Publish"];

/** Three-step progress rail for the course creation flow. */
export default function StepTracker({ current = 1 }: { current?: number }) {
  return (
    <nav aria-label="Course creation progress" className="w-full">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        {STEPS.map((label, index) => {
          const step = index + 1;
          const isDone = step < current;
          const isActive = step === current;
          const isLast = step === STEPS.length;

          return (
            <li
              key={label}
              className="flex flex-1 items-center gap-3 sm:gap-4"
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300 ${
                  isDone
                    ? "border-brand-400 bg-brand-400 text-ink-950"
                    : isActive
                      ? "border-brand-400 bg-brand-400/12 text-brand-300"
                      : "border-ink-700 bg-ink-900 text-ink-500"
                }`}
              >
                {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : step}
              </span>

              <span
                className={`whitespace-nowrap text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : isDone
                      ? "text-ink-200"
                      : "text-ink-500"
                }`}
              >
                {label}
              </span>

              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`ml-2 hidden h-px flex-1 transition-colors duration-300 sm:block ${
                    isDone ? "bg-brand-400/60" : "bg-ink-800"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
