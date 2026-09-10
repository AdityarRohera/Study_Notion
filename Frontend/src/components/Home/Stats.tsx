const STATS = [
  { value: "120K+", label: "Active learners" },
  { value: "480+", label: "Hands-on courses" },
  { value: "92%", label: "Course completion" },
  { value: "4.8/5", label: "Average rating" },
];

/** Credibility band that sits directly under the hero. */
function Stats() {
  return (
    <section className="w-full border-y border-ink-800 bg-ink-900/40">
      <div className="sn-container-wide grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-ink-400 sm:text-sm sm:normal-case sm:tracking-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
