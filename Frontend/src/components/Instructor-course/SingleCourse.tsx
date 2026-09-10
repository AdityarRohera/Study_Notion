import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Check, Clock } from "lucide-react";

import { getSingleCourse } from "../../Services/operations/instructorUtilis";
import { formatDuration } from "../../Services/operations/common";

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";

export default function SingleCourse({ data }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseName, courseDesc, price, thumbnail, totalLength, status, _id } =
    data;

  const isDraft = status === "Draft";

  const editCourseHandler = async () => {
    const res = await getSingleCourse(dispatch, _id);
    if (res) {
      navigate(`/dashboard/mycourse/course-info/${_id}`);
    }
  };

  return (
    <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_7rem_7rem_6rem] lg:items-center lg:gap-4">
      {/* Thumbnail + info */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-ink-850 sm:aspect-auto sm:h-24 sm:w-40">
          <img
            className="h-full w-full object-cover"
            src={thumbnail || FALLBACK_THUMBNAIL}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="font-display text-base font-bold text-white sm:text-lg">
            {courseName}
          </h3>
          <p className="sn-clamp-2 text-sm leading-relaxed text-ink-400">
            {courseDesc}
          </p>

          <span
            className={`sn-badge w-fit ${
              isDraft
                ? "bg-ink-800 text-ink-300"
                : "bg-success-500/15 text-success-400"
            }`}
          >
            {isDraft ? (
              <Clock className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            )}
            {status}
          </span>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 lg:justify-center">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-500 lg:hidden">
          Duration
        </span>
        <span className="text-sm font-semibold text-ink-200">
          {formatDuration(totalLength)}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 lg:justify-center">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-500 lg:hidden">
          Price
        </span>
        <span className="text-sm font-bold text-success-400">₹{price}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 lg:justify-center">
        <button
          type="button"
          onClick={editCourseHandler}
          aria-label={`Edit ${courseName}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 text-ink-300 transition-all duration-200 hover:border-accent-500/50 hover:bg-accent-500/10 hover:text-accent-300"
        >
          <MdEdit className="text-lg" />
        </button>

        <button
          type="button"
          aria-label={`Delete ${courseName}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 text-ink-300 transition-all duration-200 hover:border-danger-500/50 hover:bg-danger-500/10 hover:text-danger-400"
        >
          <RiDeleteBin6Line className="text-lg" />
        </button>
      </div>
    </div>
  );
}
