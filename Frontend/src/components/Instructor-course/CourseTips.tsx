import { Lightbulb } from "lucide-react";

const TIPS = [
  "Set a price, or make the course free to build an audience first.",
  "Thumbnails look sharpest at 1024×576 (16:9).",
  "The overview video is what most people watch before buying — lead with the outcome.",
  "Use the Course Builder to group lessons into sections learners can finish in one sitting.",
  "Add topics inside a section to create lessons, quizzes and assignments.",
  "Anything in Additional Data shows up on the public course page.",
  "Announcements notify every enrolled student — use them sparingly.",
];

export default function CourseTips() {
  return (
    <aside className="sn-card p-5 sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-base font-bold text-brand-300">
        <Lightbulb className="h-4 w-4" />
        Course upload tips
      </h2>

      <ul className="mt-4 space-y-3">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/70"
              aria-hidden="true"
            />
            <span className="text-sm leading-relaxed text-ink-400">{tip}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
