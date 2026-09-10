import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  Handshake,
  HeartHandshake,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "120K+", label: "Learners" },
  { value: "480+", label: "Courses" },
  { value: "40+", label: "Countries" },
];

const VALUES = [
  {
    Icon: Target,
    title: "Outcomes over hours watched",
    body: "We measure ourselves on what learners can build afterwards, not on how long they sat through a video. Every course ends in something shippable.",
  },
  {
    Icon: HeartHandshake,
    title: "Teaching is a craft",
    body: "Our instructors are practising engineers who get editorial support, so the explanation is as good as the expertise behind it.",
  },
  {
    Icon: Compass,
    title: "No dead ends",
    body: "Learning stalls when you don't know what comes next. Structured tracks always answer that question for you.",
  },
  {
    Icon: Users,
    title: "Access first",
    body: "A meaningful share of our catalog is free, permanently. Money should never be the reason someone stops learning.",
  },
];

const TIMELINE = [
  {
    year: "2019",
    title: "A study group that got out of hand",
    body: "Four engineers started recording weekend sessions for friends switching careers. Word spread faster than the recordings did.",
  },
  {
    year: "2021",
    title: "The first structured track",
    body: "We replaced scattered tutorials with a 12-week full-stack path. Completion rates went from 9% to over 60%.",
  },
  {
    year: "2023",
    title: "Instructors joined the platform",
    body: "We opened the course builder so working engineers could publish their own tracks — with our editorial team alongside them.",
  },
  {
    year: "Today",
    title: "120,000 learners and counting",
    body: "From first line of code to first offer letter, in 40+ countries, with mentor feedback on every project submitted.",
  },
];

const TEAM = [
  { name: "Aditya Rohera", role: "Founder & Engineering", initials: "AR" },
  { name: "Nikhil Verma", role: "Head of Curriculum", initials: "NV" },
  { name: "Sara Khan", role: "Learning Design", initials: "SK" },
  { name: "Dev Patel", role: "Instructor Success", initials: "DP" },
];

function AboutUs() {
  return (
    <div className="bg-ink-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800">
        <div className="sn-aurora" aria-hidden="true" />
        <div className="absolute inset-0 sn-grid-lines" aria-hidden="true" />

        <div className="sn-container relative py-16 text-center md:py-24">
          <span className="sn-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            About StudyNotion
          </span>

          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            We're building the learning platform{" "}
            <span className="sn-gradient-text">we wished we had</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            StudyNotion started because good engineers kept telling us the same
            thing: the internet is full of tutorials, and almost none of them
            get you to the finish line. So we built something structured,
            practical and finishable.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-400 px-7 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow"
            >
              Start learning
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-ink-700 px-7 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-900"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-ink-800 bg-ink-900/40">
        <div className="sn-container-wide grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-ink-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="sn-container sn-section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="sn-eyebrow">Our mission</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Make a technical career reachable from anywhere
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300">
              A degree, a network and a city with tech jobs used to be the price
              of entry. That's a bad filter — it screens out talent, not
              incompetence.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-300">
              We think the honest replacement is proof of work: a portfolio of
              real projects, reviewed by people who do the job. That's what
              every StudyNotion track is designed to produce.
            </p>

            <div className="mt-8 rounded-2xl border border-ink-800 bg-ink-900 p-6">
              <Handshake className="h-6 w-6 text-brand-400" />
              <p className="mt-4 text-base leading-relaxed text-ink-200">
                "The goal was never to be the biggest catalog. It was to be the
                one where people actually finish."
              </p>
              <p className="mt-3 text-sm text-ink-400">
                Aditya Rohera · Founder
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-5 rounded-[2.5rem] bg-brand-400/[0.07] blur-3xl"
              aria-hidden="true"
            />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Learners collaborating around a laptop"
              loading="lazy"
              className="relative aspect-[4/3] w-full rounded-3xl border border-ink-800 object-cover shadow-lifted"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-ink-800 bg-ink-900/30">
        <div className="sn-container sn-section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="sn-eyebrow">What we believe</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Principles we actually design around
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map(({ Icon, title, body }) => (
              <article key={title} className="sn-card sn-card-hover p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-800 text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-400">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="sn-container sn-section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="sn-eyebrow">Our story</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
            From a weekend study group to a platform
          </h2>
        </div>

        <ol className="relative mt-12 space-y-8 border-l border-ink-800 pl-6 sm:pl-8">
          {TIMELINE.map((item) => (
            <li key={item.year} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-brand-400 ring-4 ring-ink-950 sm:-left-[2.4rem]"
                aria-hidden="true"
              />
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-300">
                {item.year}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="border-t border-ink-800 bg-ink-900/30">
        <div className="sn-container sn-section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="sn-eyebrow">The team</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Small team, opinionated about teaching
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((person) => (
              <article
                key={person.name}
                className="sn-card sn-card-hover p-6 text-center"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-lg font-extrabold text-ink-950">
                  {person.initials}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-ink-400">{person.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sn-container sn-section">
        <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-850 px-6 py-14 text-center sm:px-10">
          <div className="sn-aurora" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start something you'll actually finish?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink-300">
              Create a free account and take the first track. No card, no
              countdown.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-400 px-7 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow"
              >
                Create free account
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-ink-700 px-7 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-900"
              >
                Browse the catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
