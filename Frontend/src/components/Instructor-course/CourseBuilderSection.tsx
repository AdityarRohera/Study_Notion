import { useState } from "react";
import SectionAndSubsectionHeading from "./SectionAndSubsectionHeading";
import LectureEditing from "./LectureEditing";

function CourseBuilderSection({
  sectionName,
  sectionId,
  sectionLecture,
  aboutCourseId,
  refreshSections
}: {
  sectionName: string;
  sectionId: string;
  sectionLecture: any[];
  aboutCourseId: string;
  refreshSections : () => void;
}) {
  const [openLectureId, setOpenLectureId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const OpenEditLectureHandler = (lectureId: string) => {
    setOpenLectureId(lectureId);
  };

  const closeEditLectureHandler = () => {
    setOpenLectureId(null);
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-md shadow p-4 mb-4">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <SectionAndSubsectionHeading heading={sectionName} />
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "⬆️" : "⬇️"}
        </button>
      </div>

      {/* Lectures */}
      {!collapsed && sectionLecture.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {sectionLecture.map((lecture) => {
            const { _id, subSectionName } = lecture;
            return (
              <div
                key={_id}
                className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
              >
                <div>
                  <p className="font-medium">{subSectionName}</p>
                  {/* <p className="text-gray-400 text-sm">{description}</p>
                  <p className="text-gray-500 text-xs">{duration} mins</p> */}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => OpenEditLectureHandler(_id)}
                    className="text-blue-400 hover:text-blue-200"
                  >
                    ✏️
                  </button>
                  <button className="text-red-500 hover:text-red-300">🗑️</button>
                </div>
              </div>
            );
          })}

          {/* Add Lecture */}
          {/* <button
            onClick={() => OpenEditLectureHandler("new")}
            className="text-yellow-400 font-semibold mt-2 hover:text-yellow-300 self-start"
          >
            + Add Lecture
          </button> */}
        </div>
      )}

      <button
            onClick={() => OpenEditLectureHandler("new")}
            className="text-yellow-400 font-semibold mt-2 hover:text-yellow-300 self-start"
          >
            + Add Lecture
          </button>

      {/* Lecture Editing Modal */}
      {openLectureId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-gray-900 text-white w-[500px] rounded-lg p-6 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={closeEditLectureHandler}
            >
              ✖️
            </button>
            <LectureEditing
              refreshSections = {refreshSections}
              courseId={aboutCourseId}
              lectureId={openLectureId === "new" ? undefined : openLectureId}
              sectionId={sectionId}
              subSectionName={
                sectionLecture.find((lec) => lec._id === openLectureId)?.subSectionName
              }
              description={
                sectionLecture.find((lec) => lec._id === openLectureId)?.description
              }
              duration={
                sectionLecture.find((lec) => lec._id === openLectureId)?.duration
              }
              videoUrl={
                sectionLecture.find((lec) => lec._id === openLectureId)?.videoUrl
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


