
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
import Loading from "../commons/Loading";

function CourseBuilderComponent() {
  const [aboutCourse, setAboutCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [loading, setLoading] = useState(false);       // for fetching course
  const [creating, setCreating] = useState(false);     // for creating section
  const { state } = useParams();
  const dispatch = useDispatch();

  // Fetch course data
  const fetchCourseData = async () => {
    try {
      setLoading(true); // start loading
      const fullCourse = await fetchSingleCourse(state);
      if (fullCourse) {
        setAboutCourse(fullCourse.AboutCourse);
        setSections(
          fullCourse.courseContent.map((sec: any) => ({
            _id: sec._id,
            sectionName: sec.sectionName,
            sectionLecture: sec.subSection || [],
          }))
        );
      }
    } catch (err: any) {
      console.error("Error fetching course:", err.message);
      toast.error("Failed to fetch course");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Create new section
  const CreateSectionHandler = async () => {
    if (!newSectionName) return toast.error("Empty section field");
    if (!aboutCourse?._id) return toast.error("Course not loaded yet");

    try {
      setCreating(true); // start loading
      await createSection(dispatch, newSectionName, aboutCourse._id);
      setNewSectionName("");
      await fetchCourseData(); // refresh sections
    } catch (err) {
      toast.error("Failed to add section");
    } finally {
      setCreating(true); // stop loading
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  // ✅ Show loading while fetching/creating
  if (loading || creating) {
    return <Loading />;
  }

  return (
    <div className="border flex flex-col gap-5 w-[45vw] p-5">
      <Heading text="Course Builder" />

      {/* Render sections */}
      {sections.length > 0 && (
        <div className="border bg-gray-700 text-white flex flex-col gap-5 p-2">
          {sections.map((section: any) => (
            <CourseBuilderSection
              key={section._id}
              aboutCourseId={aboutCourse._id}
              sectionName={section.sectionName}
              sectionId={section._id}
              sectionLecture={section.sectionLecture}
              refreshSections={fetchCourseData}
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
          className="flex items-center justify-center gap-2 w-[200px] py-2.5 text-lg font-semibold 
                   text-yellow-300 border border-yellow-300 rounded-xl 
                   hover:bg-yellow-300 hover:text-black transition-colors duration-200"
        >
          + Add Section
        </button>
      </div>

      <Toaster />
    </div>
  );
}

export default CourseBuilderComponent;

