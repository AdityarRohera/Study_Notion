import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Compass, Search } from "lucide-react";

import { fatchCategories } from "../Services/operations/common";
import { HomePageExplore } from "../Data/homePageExplore";
import { Skeleton } from "../components/commons/Skeleton";
import { EmptyState } from "../components/commons/States";

function Courses() {
  const [categories, setCategories] = useState<any[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fatchCategories();
        if (!cancelled) setCategories(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setCategories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = (categories ?? []).filter((category: any) =>
    category.name?.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="bg-ink-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800">
        <div className="sn-aurora" aria-hidden="true" />
        <div className="absolute inset-0 sn-grid-lines" aria-hidden="true" />

        <div className="sn-container relative py-14 text-center md:py-20">
          <span className="sn-eyebrow">Catalog</span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Find the track that gets you{" "}
            <span className="sn-gradient-text">job-ready</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Browse by category, or start with one of the free foundations
            tracks. Every course ends in something you can put in a portfolio.
          </p>

          {/* Search */}
          <div className="mx-auto mt-9 max-w-lg">
            <label htmlFor="catalog-search" className="sr-only">
              Search categories
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search categories, e.g. Web Development"
                className="sn-field h-12 pl-11"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sn-container-wide sn-section">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              Browse by category
            </h2>
            <p className="mt-2 text-sm text-ink-400">
              Pick a discipline to see every course inside it.
            </p>
          </div>
          {categories !== null && (
            <p className="text-sm text-ink-500">
              {filtered.length} categor{filtered.length === 1 ? "y" : "ies"}
            </p>
          )}
        </div>

        <div className="mt-8">
          {categories === null ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="sn-card p-6">
                  <Skeleton className="h-11 w-11 rounded-xl" />
                  <Skeleton className="mt-5 h-5 w-2/3" />
                  <Skeleton className="mt-3 h-3 w-full" />
                  <Skeleton className="mt-2 h-3 w-4/5" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title={
                query ? `No categories match "${query}"` : "No categories yet"
              }
              description={
                query
                  ? "Try a broader term — or clear the search to see everything we offer."
                  : "The catalog is still being set up. Check back shortly."
              }
              icon={<Compass className="h-6 w-6" />}
              action={
                query
                  ? { label: "Clear search", onClick: () => setQuery("") }
                  : { label: "Back to home", to: "/" }
              }
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((category: any) => (
                <Link
                  key={category._id}
                  to={`/catalog/${category.name}?desc=${encodeURIComponent(
                    category.desc ?? ""
                  )}`}
                  state={category._id}
                  className="sn-card sn-card-hover group flex flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-800 text-brand-300 transition-colors duration-300 group-hover:bg-brand-400/15">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-brand-200">
                    {category.name}
                  </h3>
                  <p className="sn-clamp-3 mt-2 text-sm leading-relaxed text-ink-400">
                    {category.desc || "Explore the courses in this category."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Free starter tracks */}
      <section className="border-t border-ink-800 bg-ink-900/30">
        <div className="sn-container-wide sn-section">
          <div className="mx-auto max-w-2xl text-center">
            <span className="sn-eyebrow">Start for free</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Foundations, at no cost
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-400 sm:text-base">
              These tracks stay free permanently. They're the fastest way to
              find out whether this style of learning suits you.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HomePageExplore[0]?.courses.map((course) => (
              <article key={course.heading} className="sn-card sn-card-hover p-6">
                <span className="sn-badge bg-success-500/15 text-success-400">
                  Free
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {course.heading.trim()}
                </h3>
                <p className="sn-clamp-3 mt-2 text-sm leading-relaxed text-ink-400">
                  {course.description}
                </p>
                <p className="mt-5 border-t border-ink-800 pt-4 text-xs text-ink-500">
                  {course.level} · {course.lessionNumber} lessons
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-400 px-7 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow"
            >
              Create a free account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
