import { Link } from "react-router-dom";
import { ChevronRight, Clock, Globe, Star, Users } from "lucide-react";

function AboutFullCourse({ AboutCourse }: any) {
  const {
    courseName,
    courseDesc,
    totalSum,
    TotalNumberRated,
    category,
    instructor,
  }: any = AboutCourse;

  const rating =
    TotalNumberRated > 0 ? Number(totalSum) / Number(TotalNumberRated) : 0;
  const ratingLabel = rating > 0 ? rating.toFixed(1) : "New";

  const instructorName = instructor
    ? `${instructor.firstName ?? ""} ${instructor.lastName ?? ""}`.trim()
    : "StudyNotion";

  return (
    <header className="relative overflow-hidden border-b border-ink-800 bg-ink-900">
      <div className="sn-aurora" aria-hidden="true" />

      <div className="sn-container-wide relative py-10 md:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
            <li>
              <Link to="/" className="transition-colors hover:text-ink-200">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 text-ink-600" aria-hidden />
            <li>
              <Link
                to="/courses"
                className="transition-colors hover:text-ink-200"
              >
                Courses
              </Link>
            </li>
            {category?.name && (
              <>
                <ChevronRight
                  className="h-3.5 w-3.5 text-ink-600"
                  aria-hidden
                />
                <li
                  aria-current="page"
                  className="font-semibold text-brand-300"
                >
                  {category.name}
                </li>
              </>
            )}
          </ol>
        </nav>

        <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {courseName}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-300">
          {courseDesc}
        </p>

        {/* Rating + enrolment */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="flex items-center gap-2">
            <span className="font-bold text-brand-300">{ratingLabel}</span>
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    rating >= i + 1
                      ? "fill-brand-400 text-brand-400"
                      : "text-ink-600"
                  }`}
                />
              ))}
            </span>
            <span className="text-ink-400">
              ({TotalNumberRated ?? 0} ratings)
            </span>
          </span>

          <span className="flex items-center gap-1.5 text-ink-400">
            <Users className="h-4 w-4" />
            Taught by{" "}
            <span className="font-semibold text-white">{instructorName}</span>
          </span>
        </div>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-400">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-400" />
            Updated recently
          </span>
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-brand-400" />
            English
          </span>
          {category?.name && (
            <span className="sn-badge border-ink-700 bg-ink-850 text-ink-200">
              {category.name}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default AboutFullCourse;
