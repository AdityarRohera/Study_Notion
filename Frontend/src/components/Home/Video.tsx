const BANNER_SRC =
  "https://my-study-notion.vercel.app/static/media/banner.8e687823b1422880cc3f.mp4";

/**
 * Product banner clip. Previously an unplayable <video> with no controls and a
 * typo'd height; now a framed, muted, looping showcase that stays 16:9 on every
 * viewport.
 */
function Video() {
  return (
    <section className="sn-container-wide w-full pb-6">
      <div className="relative mx-auto max-w-5xl">
        <div
          className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-brand-400/15 via-accent-400/10 to-brand-400/15 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 shadow-lifted">
          <video
            src={BANNER_SRC}
            className="aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A short look at learning on StudyNotion"
          />
        </div>
      </div>
    </section>
  );
}

export default Video;
