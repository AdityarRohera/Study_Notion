import {
  Award,
  Code2,
  MessagesSquare,
  Route,
  ShieldCheck,
  Timer,
} from "lucide-react";

const FEATURES = [
  {
    Icon: Code2,
    title: "Build, don't just watch",
    body: "Every module ends in a project you ship. You leave with a portfolio, not a playlist history.",
  },
  {
    Icon: Route,
    title: "Clear learning paths",
    body: "Curated tracks tell you exactly what to learn next, so you never stall on 'what now?'.",
  },
  {
    Icon: MessagesSquare,
    title: "Mentor feedback",
    body: "Submit work and get specific, actionable reviews from engineers working in the field.",
  },
  {
    Icon: Timer,
    title: "Designed for real weeks",
    body: "Lessons are sized for 25-minute sessions, so progress survives a busy job or semester.",
  },
  {
    Icon: Award,
    title: "Certificates that hold up",
    body: "Verified completion backed by the projects you built — shareable straight to LinkedIn.",
  },
  {
    Icon: ShieldCheck,
    title: "Lifetime access",
    body: "Courses keep getting updated as the ecosystem moves. Your access never expires.",
  },
];

/** "Why StudyNotion" value-proposition grid. */
function Features() {
  return (
    <section className="sn-container-wide w-full">
      <div className="mx-auto max-w-2xl text-center">
        <span className="sn-eyebrow">Why StudyNotion</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
          Everything you need to actually{" "}
          <span className="sn-gradient-text">finish</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-400">
          Most people don't quit learning because it's hard — they quit because
          it's unclear. We removed the guesswork.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ Icon, title, body }) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink-700 hover:shadow-lifted"
          >
            <span
              className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-400/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-ink-800 text-brand-300 transition-colors duration-300 group-hover:bg-brand-400/15">
              <Icon className="h-5 w-5" />
            </div>

            <h3 className="relative mt-5 font-display text-lg font-bold text-white">
              {title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-ink-400">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Features;
