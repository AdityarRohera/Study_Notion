import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

function EnrolledCourseCard({ id, image, courseName, progress = 0 }: any) {
  const navigate = useNavigate();

  const viewCourseHandler = () => {
    navigate(`/dashboard/enrolled-courses/${id}`);
  };

  const started = progress > 0;

  return (
    <article className="sn-card sn-card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-ink-850">
        <img
          src={image || FALLBACK_THUMBNAIL}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"
          aria-hidden="true"
        />

        <span
          className={`sn-badge absolute right-3 top-3 ${
            started
              ? "bg-brand-400 text-ink-950"
              : "bg-ink-950/80 text-ink-200 backdrop-blur"
          }`}
        >
          {started ? `${progress}% complete` : "Not started"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="sn-clamp-2 font-display text-base font-bold leading-snug text-white">
          {courseName}
        </h3>

        {/* Progress */}
        <div className="mt-4">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-ink-800"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${courseName} progress`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-ink-500">
            {started
              ? "Keep going — you're making progress"
              : "Start your first lesson"}
          </p>
        </div>

        <button
          type="button"
          onClick={viewCourseHandler}
          className="mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink-800 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-400 hover:text-ink-950 active:scale-[0.99]"
        >
          <PlayCircle className="h-4 w-4" />
          {started ? "Continue course" : "Start course"}
        </button>
      </div>
    </article>
  );
}

export default EnrolledCourseCard;
