import { Link, NavLink } from "react-router-dom";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const TRUST_POINTS = [
  "No credit card required",
  "Learn at your own pace",
  "Certificate on completion",
];

/**
 * Home hero. The old version was a centred block of lorem ipsum with a fixed
 * 70vw width; this is a real two-column hero that reflows down to one column
 * on tablet and phone.
 */
function BecomeInstructor() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="sn-aurora" aria-hidden="true" />
      <div className="absolute inset-0 sn-grid-lines" aria-hidden="true" />

      <div className="sn-container-wide relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        {/* Copy */}
        <div className="animate-fade-up text-center lg:text-left">
          <NavLink
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/70 py-1.5 pl-2 pr-4 text-sm font-medium text-ink-200 transition-all duration-300 hover:border-brand-400/50 hover:text-white"
          >
            <span className="rounded-full bg-brand-400 px-2.5 py-0.5 text-xs font-bold text-ink-950">
              New
            </span>
            Become an instructor
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </NavLink>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
            Empower your future with{" "}
            <span className="sn-gradient-text">coding skills</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg lg:mx-0">
            Learn by building. StudyNotion pairs structured, project-based
            courses with hands-on practice and mentor feedback — so you finish
            each track with work you can actually show an employer.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Link
              to="/signup"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-400 px-7 text-base font-semibold text-ink-950 shadow-soft transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
            >
              Start learning free
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/courses"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ink-700 px-7 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-900"
            >
              <PlayCircle className="h-5 w-5 text-brand-300" />
              Browse courses
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-ink-400"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-lg animate-fade-in lg:max-w-none">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-brand-400/[0.07] blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 shadow-lifted">
            {/* Editor chrome */}
            <div className="flex items-center gap-2 border-b border-ink-800 bg-ink-850 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-danger-500/80" />
              <span className="h-3 w-3 rounded-full bg-brand-400/80" />
              <span className="h-3 w-3 rounded-full bg-success-500/80" />
              <span className="ml-3 font-mono text-xs text-ink-400">
                first-project.jsx
              </span>
            </div>

            <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-7 sm:text-sm">
              <code>
                <span className="text-ink-500">01</span>{" "}
                <span className="text-accent-300">import</span>{" "}
                <span className="text-ink-200">{"{ useState }"}</span>{" "}
                <span className="text-accent-300">from</span>{" "}
                <span className="text-success-400">'react'</span>
                {"\n"}
                <span className="text-ink-500">02</span>
                {"\n"}
                <span className="text-ink-500">03</span>{" "}
                <span className="text-accent-300">export default function</span>{" "}
                <span className="text-brand-300">Progress</span>
                <span className="text-ink-200">() {"{"}</span>
                {"\n"}
                <span className="text-ink-500">04</span>{"   "}
                <span className="text-accent-300">const</span>{" "}
                <span className="text-ink-200">[done, setDone] =</span>{" "}
                <span className="text-brand-300">useState</span>
                <span className="text-ink-200">(</span>
                <span className="text-brand-200">12</span>
                <span className="text-ink-200">)</span>
                {"\n"}
                <span className="text-ink-500">05</span>
                {"\n"}
                <span className="text-ink-500">06</span>{"   "}
                <span className="text-accent-300">return</span>{" "}
                <span className="text-ink-200">(</span>
                {"\n"}
                <span className="text-ink-500">07</span>{"     "}
                <span className="text-ink-400">&lt;</span>
                <span className="text-danger-300">section</span>{" "}
                <span className="text-brand-300">className</span>
                <span className="text-ink-400">=</span>
                <span className="text-success-400">"streak"</span>
                <span className="text-ink-400">&gt;</span>
                {"\n"}
                <span className="text-ink-500">08</span>{"       "}
                <span className="text-ink-200">{"{done}"}</span>{" "}
                <span className="text-ink-200">lessons complete 🎉</span>
                {"\n"}
                <span className="text-ink-500">09</span>{"     "}
                <span className="text-ink-400">&lt;/</span>
                <span className="text-danger-300">section</span>
                <span className="text-ink-400">&gt;</span>
                {"\n"}
                <span className="text-ink-500">10</span>{"   "}
                <span className="text-ink-200">)</span>
                {"\n"}
                <span className="text-ink-500">11</span>{" "}
                <span className="text-ink-200">{"}"}</span>
              </code>
            </pre>
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -left-2 hidden items-center gap-3 rounded-2xl border border-ink-800 bg-ink-900/95 px-4 py-3 shadow-lifted backdrop-blur sm:flex lg:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-500/15 text-success-400">
              ✓
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                All tests passing
              </p>
              <p className="text-xs text-ink-400">Project 3 of 8 submitted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BecomeInstructor;
