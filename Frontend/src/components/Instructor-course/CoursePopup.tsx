import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, X } from "lucide-react";

import { deleteDraftCourse } from "../../Services/operations/instructorUtilis";
import type { RootState } from "../../Services/strore";

export default function CoursePopup({ close }: any) {
  const { loading } = useSelector((state: RootState) => state.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Escape closes, and the page behind shouldn't scroll while this is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  const handleContinue = () => {
    navigate(`/dashboard/mycourse/course-info/draft-course`);
  };

  const handleStartNew = async () => {
    // first call delete api and then navigate to new page
    const res = await deleteDraftCourse(dispatch);
    if (res) {
      navigate("/dashboard/mycourse/course-info/new-course");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-popup-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <div
        onClick={() => close()}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <div className="sn-card relative w-full max-w-md animate-scale-in p-6 sm:p-7">
        <button
          type="button"
          onClick={() => close()}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <h2
          id="course-popup-title"
          className="pr-8 font-display text-lg font-bold text-white"
        >
          You already have a course in progress
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-400">
          Continue where you left off, or discard the draft and start something
          new. Starting new permanently removes the current draft.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleStartNew}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-danger-500/40 px-5 text-sm font-semibold text-danger-400 transition-all duration-200 hover:bg-danger-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Deleting draft…" : "Discard and start new"}
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
          >
            Continue draft
          </button>
        </div>
      </div>
    </div>
  );
}
