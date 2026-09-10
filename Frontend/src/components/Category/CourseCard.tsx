import { Link } from "react-router-dom";
import { Star, Users } from "lucide-react";

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80";

/** Renders 5 stars with a half-lit final star when the rating warrants it. */
function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i;
        return (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              filled
                ? "fill-brand-400 text-brand-400"
                : half
                  ? "fill-brand-400/40 text-brand-400"
                  : "text-ink-600"
            }`}
          />
        );
      })}
    </span>
  );
}

const CourseCard = ({ data }: any) => {
  const {
    courseName,
    instructor,
    TotalNumberRated,
    totalSum,
    price,
    _id,
    thumbnail,
    courseDesc,
  } = data;

  // Guard against divide-by-zero on brand-new courses.
  const rating =
    TotalNumberRated > 0 ? Number(totalSum) / Number(TotalNumberRated) : 0;
  const ratingLabel = rating > 0 ? rating.toFixed(1) : "New";

  const instructorName = instructor
    ? `${instructor.firstName ?? ""} ${instructor.lastName ?? ""}`.trim()
    : "StudyNotion";

  return (
    <Link
      to={`/course/${_id}`}
      className="sn-card sn-card-hover group flex h-full flex-col overflow-hidden focus-visible:outline-offset-4"
    >
      <div className="relative aspect-video overflow-hidden bg-ink-850">
        <img
          src={thumbnail || FALLBACK_THUMBNAIL}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent opacity-60"
          aria-hidden="true"
        />

        {TotalNumberRated > 0 && rating >= 4.5 && (
          <span className="sn-badge absolute left-3 top-3 bg-brand-400 text-ink-950">
            Bestseller
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="sn-clamp-2 font-display text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-brand-200">
          {courseName}
        </h3>

        {courseDesc && (
          <p className="sn-clamp-2 mt-2 text-sm leading-relaxed text-ink-400">
            {courseDesc}
          </p>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-400">
          <Users className="h-3.5 w-3.5" />
          {instructorName}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-bold text-brand-300">
            {ratingLabel}
          </span>
          <RatingStars rating={rating} />
          <span className="text-xs text-ink-500">
            ({TotalNumberRated ?? 0})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-display text-lg font-extrabold text-white">
            ₹{price}
          </span>
          <span className="text-xs font-semibold text-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View course →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
