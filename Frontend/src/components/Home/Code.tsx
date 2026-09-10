import type { ReactNode } from "react";

type CodeProps = {
  filename?: string;
  variant?: "html" | "js";
};

const HTML_LINES: ReactNode[] = [
  <>
    <span className="text-ink-400">&lt;!</span>
    <span className="text-danger-300">DOCTYPE</span>
    <span className="text-ink-200"> html</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;</span>
    <span className="text-danger-300">html</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;</span>
    <span className="text-danger-300">head</span>
    <span className="text-ink-400">&gt;</span>
    <span className="text-ink-400">&lt;</span>
    <span className="text-danger-300">title</span>
    <span className="text-ink-400">&gt;</span>
    <span className="text-ink-200">My first page</span>
    <span className="text-ink-400">&lt;/</span>
    <span className="text-danger-300">title</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;</span>
    <span className="text-danger-300">link</span>{" "}
    <span className="text-brand-300">rel</span>
    <span className="text-ink-400">=</span>
    <span className="text-success-400">"stylesheet"</span>{" "}
    <span className="text-brand-300">href</span>
    <span className="text-ink-400">=</span>
    <span className="text-success-400">"styles.css"</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;/</span>
    <span className="text-danger-300">head</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;</span>
    <span className="text-danger-300">body</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    {"  "}
    <span className="text-ink-400">&lt;</span>
    <span className="text-danger-300">h1</span>
    <span className="text-ink-400">&gt;</span>
    <span className="text-ink-200">Hello, world</span>
    <span className="text-ink-400">&lt;/</span>
    <span className="text-danger-300">h1</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;/</span>
    <span className="text-danger-300">body</span>
    <span className="text-ink-400">&gt;</span>
  </>,
  <>
    <span className="text-ink-400">&lt;/</span>
    <span className="text-danger-300">html</span>
    <span className="text-ink-400">&gt;</span>
  </>,
];

const JS_LINES: ReactNode[] = [
  <>
    <span className="text-accent-300">const</span>{" "}
    <span className="text-ink-200">track = </span>
    <span className="text-success-400">'full-stack'</span>
  </>,
  <>
    <span className="text-accent-300">const</span>{" "}
    <span className="text-ink-200">weeks = </span>
    <span className="text-brand-200">12</span>
  </>,
  <span className="text-ink-500">{"// ship something every single week"}</span>,
  <>
    <span className="text-accent-300">function</span>{" "}
    <span className="text-brand-300">plan</span>
    <span className="text-ink-200">(track, weeks) {"{"}</span>
  </>,
  <>
    {"  "}
    <span className="text-accent-300">return</span>{" "}
    <span className="text-ink-200">Array.</span>
    <span className="text-brand-300">from</span>
    <span className="text-ink-200">({"{ length: weeks }"},</span>
  </>,
  <>
    {"    "}
    <span className="text-ink-200">(_, i) =&gt; </span>
    <span className="text-success-400">{"`${track} · week ${i + 1}`"}</span>
    <span className="text-ink-200">)</span>
  </>,
  <span className="text-ink-200">{"}"}</span>,
  <>
    <span className="text-brand-300">console</span>
    <span className="text-ink-200">.log(</span>
    <span className="text-brand-300">plan</span>
    <span className="text-ink-200">(track, weeks))</span>
  </>,
  <span className="text-success-400">
    {"// → 'full-stack · week 1' … 'week 12'"}
  </span>,
];

/** Syntax-highlighted code panel used by the split home sections. */
export default function Code({ filename, variant = "html" }: CodeProps) {
  const lines = variant === "js" ? JS_LINES : HTML_LINES;
  const label = filename ?? (variant === "js" ? "roadmap.js" : "index.html");

  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 shadow-card">
      <div className="flex items-center gap-2 border-b border-ink-800 bg-ink-900 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success-500/70" />
        <span className="ml-2 font-mono text-xs text-ink-400">{label}</span>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-7 sm:text-sm">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-5 shrink-0 select-none text-right text-ink-600">
                {i + 1}
              </span>
              <span className="whitespace-pre">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
