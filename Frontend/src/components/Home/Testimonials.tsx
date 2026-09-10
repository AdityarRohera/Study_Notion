import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "I'd started three other courses and finished none of them. The weekly project structure here is the only thing that got me to the end — and that portfolio got me my first interview.",
    name: "Ananya Iyer",
    role: "Frontend Developer, Razorpay",
    initials: "AI",
  },
  {
    quote:
      "The mentor reviews are the real product. Someone actually read my code and told me why my state management was going to hurt later. You don't get that from a video.",
    name: "Marcus Bell",
    role: "Career switcher, ex-teacher",
    initials: "MB",
  },
  {
    quote:
      "I teach here now. The course builder let me publish a full track in a weekend, and the analytics show me exactly where students get stuck.",
    name: "Priya Raghavan",
    role: "Instructor · Backend Engineering",
    initials: "PR",
  },
];

/** Social proof. Scrolls as a snap carousel on phones, a grid on desktop. */
function Testimonials() {
  return (
    <section className="sn-container-wide w-full">
      <div className="mx-auto max-w-2xl text-center">
        <span className="sn-eyebrow">Learner stories</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
          Reviews from other{" "}
          <span className="sn-gradient-text">learners</span>
        </h2>
      </div>

      <div className="scrollbar-hidden mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="sn-card sn-card-hover flex w-[85%] shrink-0 snap-center flex-col p-6 sm:w-[70%] md:w-auto"
          >
            <Quote className="h-7 w-7 text-brand-400/40" aria-hidden="true" />

            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-200">
              {review.quote}
            </blockquote>

            <div className="mt-5 flex items-center gap-1" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-brand-400 text-brand-400"
                />
              ))}
            </div>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-800 pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-800 text-xs font-bold text-brand-300">
                {review.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">
                  {review.name}
                </span>
                <span className="block truncate text-xs text-ink-400">
                  {review.role}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
