import { Check } from "lucide-react";

function WhatYouWillLearn({ AboutCourse }: any) {
  const { whatYouWillLearn }: any = AboutCourse;

  // The field may arrive as a single string or as an array of bullets.
  const learnItems = (
    Array.isArray(whatYouWillLearn) ? whatYouWillLearn : [whatYouWillLearn]
  ).filter(Boolean);

  if (learnItems.length === 0) return null;

  return (
    <section className="sn-card p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
        What you'll learn
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
        {learnItems.map((item: string, idx: number) => (
          <div key={idx} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500/15 text-success-400">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <p className="text-sm leading-relaxed text-ink-200">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatYouWillLearn;
