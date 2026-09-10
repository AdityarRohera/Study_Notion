import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import StepTracker from "./StepTracker";
import CourseForm from "./CourseForm";
import CourseBuilderComponent from "./CourseBuilderComponent";
import CourseTips from "./CourseTips";
import PublishSetting from "./PublishSetting";

const STEP_BY_VARIANT: Record<string, number> = {
  courseInfo: 1,
  courseBuilder: 2,
  publish: 3,
};

function NewCourseTemplete({
  varient,
  state,
}: {
  varient: string;
  state?: string;
}) {
  const navigate = useNavigate();

  const nextHandler = () => {
    if (varient === "courseInfo") {
      navigate(`/dashboard/mycourse/course-builder/${state}`);
    } else if (varient === "courseBuilder") {
      navigate(`/dashboard/mycourse/publish-course/${state}`);
    }
  };

  const prevHandler = () => {
    if (varient === "courseBuilder") {
      navigate(`/dashboard/mycourse/course-info/${state}`);
    } else if (varient === "publish") {
      navigate(`/dashboard/mycourse/course-builder/${state}`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <StepTracker current={STEP_BY_VARIANT[varient] ?? 1} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10">
        <div className="flex min-w-0 flex-col gap-6">
          {varient === "courseInfo" && <CourseForm state={state!} />}
          {varient === "courseBuilder" && <CourseBuilderComponent />}
          {varient === "publish" && <PublishSetting />}

          {/* Step navigation */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {varient !== "courseInfo" ? (
              <button
                type="button"
                onClick={prevHandler}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-700 px-5 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <span />
            )}

            {varient !== "publish" && (
              <button
                type="button"
                onClick={nextHandler}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
              >
                Next
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <CourseTips />
        </div>
      </div>
    </div>
  );
}

export default NewCourseTemplete;
