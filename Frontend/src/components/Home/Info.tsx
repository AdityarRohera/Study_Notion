import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

type InfoProps = {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  body?: string;
  bullets?: string[];
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
};

/**
 * Copy column used by the two split "code + story" home sections.
 * Content is driven by props so the same layout can tell two different stories.
 */
export default function Info({
  eyebrow = "Learn by doing",
  title = "Unlock your coding potential with our online courses.",
  highlight = "coding potential",
  body = "Every course is designed and taught by engineers who ship for a living. You write real code from lesson one, and get feedback on the projects you build.",
  bullets = [
    "Guided projects reviewed by mentors",
    "Bite-sized lessons that fit a busy week",
    "Lifetime access, including future updates",
  ],
  primaryCta = { label: "Try it yourself", to: "/signup" },
  secondaryCta = { label: "Learn more", to: "/about" },
}: InfoProps) {
  const [before, after] = highlight
    ? title.split(highlight)
    : [title, undefined];

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center">
      {eyebrow && <span className="sn-eyebrow">{eyebrow}</span>}

      <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.125rem]">
        {before}
        {after !== undefined && (
          <>
            <span className="sn-gradient-text">{highlight}</span>
            {after}
          </>
        )}
      </h2>

      <p className="mt-4 text-base leading-relaxed text-ink-300">{body}</p>

      {bullets?.length > 0 && (
        <ul className="mt-6 space-y-3">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500/15 text-success-400">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-ink-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to={primaryCta.to}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 px-6 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
        >
          {primaryCta.label}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <Link
          to={secondaryCta.to}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 px-6 text-sm font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-850"
        >
          {secondaryCta.label}
        </Link>
      </div>
    </div>
  );
}
