import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Rocket } from "lucide-react";

import { type RootState } from "../../Services/strore";
import {
  fetchSingleCourse,
  publishDraftCourse,
} from "../../Services/operations/instructorUtilis";

function PublishSetting() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [check, setCheck] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const publishCourseHandler = async () => {
    if (!check) {
      toast.error("Tick the box above to publish this course");
      return;
    }

    setPublishing(true);
    try {
      const res = await fetchSingleCourse();
      if (!res) {
        toast.error("Course Data is not field");
        return;
      }

      // now call api for publish course
      await publishDraftCourse(dispatch, navigate, token!);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="sn-card p-5 sm:p-7">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300">
        <Rocket className="h-5 w-5" />
      </div>

      <h2 className="font-display text-lg font-bold text-white sm:text-xl">
        Publish settings
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
        Publishing makes this course visible in the catalog and available to
        buy. You can unpublish later without losing any content.
      </p>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-ink-800 bg-ink-850 p-4 transition-colors hover:border-ink-700">
        <input
          type="checkbox"
          name="check-box"
          checked={check}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-ink-600 accent-brand-400"
          onChange={() => setCheck(!check)}
        />
        <span>
          <span className="block text-sm font-semibold text-white">
            Make this course public
          </span>
          <span className="mt-0.5 block text-xs text-ink-400">
            I've reviewed the course details, sections and lectures.
          </span>
        </span>
      </label>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-ink-800 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => navigate("/dashboard/mycourse")}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 px-5 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850"
        >
          Save as draft
        </button>

        <button
          type="button"
          onClick={publishCourseHandler}
          disabled={publishing}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {publishing ? "Publishing…" : "Save and publish"}
        </button>
      </div>
    </div>
  );
}

export default PublishSetting;
