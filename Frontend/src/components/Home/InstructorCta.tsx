import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, Wallet } from "lucide-react";

const HIGHLIGHTS = [
  { Icon: Users, label: "Reach 120K+ learners" },
  { Icon: Wallet, label: "Keep 85% of revenue" },
  { Icon: BarChart3, label: "Live course analytics" },
];

/** Closing conversion band aimed at prospective instructors. */
function InstructorCta() {
  return (
    <section className="sn-container-wide w-full">
      <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-850 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="sn-aurora" aria-hidden="true" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="sn-eyebrow">Become an instructor</span>

            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Teach what you know.{" "}
              <span className="sn-gradient-text">Get paid for it.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-300">
              Instructors on StudyNotion use our course builder to go from
              outline to published track without touching a video editor
              timeline. You bring the expertise; we handle hosting, payments and
              the student experience.
            </p>

            <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
              {HIGHLIGHTS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm font-medium text-ink-200"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/15 text-brand-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-400 px-7 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
              >
                Start teaching
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-ink-700 px-7 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-800"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          {/* Earnings snapshot */}
          <div className="rounded-2xl border border-ink-800 bg-ink-950/70 p-6 shadow-lifted backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
              This month
            </p>
            <p className="mt-2 font-display text-4xl font-extrabold text-white">
              ₹1,84,200
            </p>
            <p className="mt-1 text-sm text-success-400">
              +18.4% vs last month
            </p>

            <div className="mt-7 flex h-28 items-end gap-2" aria-hidden="true">
              {[38, 52, 45, 68, 61, 84, 100].map((height, i) => (
                <span
                  key={i}
                  style={{ height: `${height}%` }}
                  className={`flex-1 rounded-t-md transition-all duration-500 ${
                    i === 6 ? "bg-brand-400" : "bg-ink-700"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-800 pt-5">
              <div>
                <p className="text-xs text-ink-400">Enrolments</p>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  1,942
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-400">Avg. rating</p>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  4.9
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstructorCta;
