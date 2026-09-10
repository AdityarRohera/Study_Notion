import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, Home, LifeBuoy } from "lucide-react";

const SUGGESTIONS = [
  {
    Icon: Compass,
    title: "Browse the catalog",
    body: "Find a track by category or skill level.",
    to: "/courses",
  },
  {
    Icon: Home,
    title: "Go to the homepage",
    body: "Start from the top and find your way.",
    to: "/",
  },
  {
    Icon: LifeBuoy,
    title: "Contact support",
    body: "Think this is a broken link? Tell us.",
    to: "/contact",
  },
];

function NoPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-ink-950">
      <div className="sn-aurora" aria-hidden="true" />
      <div className="absolute inset-0 sn-grid-lines" aria-hidden="true" />

      <div className="sn-container relative py-16 text-center md:py-24">
        <p className="font-display text-[6rem] font-extrabold leading-none sm:text-[9rem]">
          <span className="sn-gradient-text">404</span>
        </p>

        <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
          This page took a different track
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-400">
          The page you're looking for doesn't exist, moved, or the link was
          mistyped. Nothing you've done is lost.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ink-700 px-6 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-400 px-6 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow"
          >
            Take me home
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
          {SUGGESTIONS.map(({ Icon, title, body, to }) => (
            <Link
              key={title}
              to={to}
              className="sn-card sn-card-hover group p-5 text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-brand-300 transition-colors duration-300 group-hover:bg-brand-400/15">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-sm font-bold text-white">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-400">
                {body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoPage;
