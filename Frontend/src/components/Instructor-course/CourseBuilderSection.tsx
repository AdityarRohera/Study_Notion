import { useState } from "react";
import { ChevronDown, Pencil, Plus, Trash2, X } from "lucide-react";

import SectionAndSubsectionHeading from "./SectionAndSubsectionHeading";
import LectureEditing from "./LectureEditing";

function CourseBuilderSection({
  sectionName,
  sectionId,
  sectionLecture,
  aboutCourseId,
  refreshSections,
}: {
  sectionName: string;
  sectionId: string;
  sectionLecture: any[];
  aboutCourseId: string;
  refreshSections: () => void;
}) {
  const [openLectureId, setOpenLectureId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const OpenEditLectureHandler = (lectureId: string) => {
    setOpenLectureId(lectureId);
  };

  const closeEditLectureHandler = () => {
    setOpenLectureId(null);
  };

  const lectures = Array.isArray(sectionLecture) ? sectionLecture : [];

  return (
    <div className="overflow-hidden rounded-xl border border-ink-800 bg-ink-850">
      {/* Section header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <SectionAndSubsectionHeading heading={sectionName} />

        <button
          type="button"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand section" : "Collapse section"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-800 hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              collapsed ? "-rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {!collapsed && (
        <div className="flex flex-col gap-2 border-t border-ink-800 p-3">
          {lectures.map((lecture) => {
            const { _id, subSectionName } = lecture;
            return (
              <div
                key={_id}
                className="flex items-center justify-between gap-3 rounded-lg bg-ink-900 px-3.5 py-2.5 transition-colors hover:bg-ink-800"
              >
                <p className="truncate text-sm font-medium text-ink-200">
                  {subSectionName}
                </p>

                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => OpenEditLectureHandler(_id)}
                    aria-label={`Edit ${subSectionName}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-accent-500/10 hover:text-accent-300"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${subSectionName}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-danger-500/10 hover:text-danger-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => OpenEditLectureHandler("new")}
            className="inline-flex h-10 items-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-400/10"
          >
            <Plus className="h-4 w-4" />
            Add lecture
          </button>
        </div>
      )}

      {/* Lecture editing modal */}
      {openLectureId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={closeEditLectureHandler}
          />

          <div className="sn-card relative max-h-[85vh] w-full max-w-lg animate-scale-in overflow-y-auto p-5 sm:p-7">
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-800 hover:text-white"
              onClick={closeEditLectureHandler}
            >
              <X className="h-4 w-4" />
            </button>

            <LectureEditing
              refreshSections={refreshSections}
              courseId={aboutCourseId}
              lectureId={openLectureId === "new" ? undefined : openLectureId}
              sectionId={sectionId}
              subSectionName={
                lectures.find((lec) => lec._id === openLectureId)
                  ?.subSectionName
              }
              description={
                lectures.find((lec) => lec._id === openLectureId)?.description
              }
              duration={
                lectures.find((lec) => lec._id === openLectureId)?.duration
              }
              videoUrl={
                lectures.find((lec) => lec._id === openLectureId)?.videoUrl
              }
              close={closeEditLectureHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseBuilderSection;
