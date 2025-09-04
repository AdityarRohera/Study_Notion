
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import InputField from "../commons/InputField";
import Heading from "../commons/Heading";
import CourseBuilderSection from "./CourseBuilderSection";
// import { fetchSingleCourse } from "../services/courseService"; // your API
// import { createSection } from "../services/courseActions"; // your createSection function
import { fetchSingleCourse } from "../../Services/operations/instructorUtilis";
import { createSection } from "../../Services/operations/instructorUtilis";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function CourseBuilderComponent() {
  const [aboutCourse, setAboutCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const {state} = useParams();
  const dispatch = useDispatch();
  console.log(state)

  // console.log(aboutCourse)

  // Fetch course data
  const fetchCourseData = async () => {
    try {
      const fullCourse = await fetchSingleCourse(state);
      if (fullCourse) {
        setAboutCourse(fullCourse.AboutCourse);

        // ✅ sections now contain subsections
        setSections(
          fullCourse.courseContent.map((sec: any) => ({
            _id: sec._id,
            sectionName: sec.sectionName,
            sectionLecture: sec.subSection || [], // subsections embedded
          }))
        );
      }
    } catch (err: any) {
      console.error("Error fetching course:", err.message);
      toast.error("Failed to fetch course");
    }
  };

  // Create new section
  const CreateSectionHandler = async () => {
    if (!newSectionName) return toast.error("Empty section field");
    if (!aboutCourse?._id) return toast.error("Course not loaded yet");

    await createSection(dispatch, newSectionName, aboutCourse._id);
    setNewSectionName("");

    // Refetch after adding section
    fetchCourseData();
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="border flex flex-col gap-5 w-[45vw] p-5">
      <Heading text="Course Builder" />

      {/* Render sections */}
      {sections.length > 0 && (
        <div className="border bg-gray-700 text-white flex flex-col gap-5 p-2">
          {sections.map((section: any) => (
            <CourseBuilderSection
              key={section._id}
              aboutCourseId = {aboutCourse._id}
              sectionName={section.sectionName}
              sectionId={section._id}
              sectionLecture={section.sectionLecture}
              refreshSections={fetchCourseData}  // pass embedded subsections
            />
          ))}
        </div>
      )}

      {/* Create section input */}
      <div className="flex flex-col gap-5 justify-center">
        <InputField
          type="text"
          size="xl"
          placeholder="Add a section to build your course"
          value={newSectionName}
          changeHandler={(e) => setNewSectionName(e.target.value)}
        />

        <button
          onClick={CreateSectionHandler}
          className="text-2xl text-yellow-300 border rounded-xl p-2 w-[200px]"
        >
          + Create Section
        </button>
      </div>

      <Toaster />
    </div>
  );
}

export default CourseBuilderComponent;

