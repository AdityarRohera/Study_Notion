import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Layers, Plus } from "lucide-react";

import InputField from "../commons/InputField";
import CourseBuilderSection from "./CourseBuilderSection";
import { Spinner } from "../commons/Loading";
import { ListRowSkeleton } from "../commons/Skeleton";
import {
  createSection,
  fetchSingleCourse,
} from "../../Services/operations/instructorUtilis";

function CourseBuilderComponent() {
  const [aboutCourse, setAboutCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [loading, setLoading] = useState(false); // for fetching course
  const [creating, setCreating] = useState(false); // for creating section
  const { state } = useParams();
  const dispatch = useDispatch();

  // Fetch course data
  const fetchCourseData = async () => {
    try {
      setLoading(true);

      let fullCourse;

      // Case 1: If courseId exists -> fetch by ID
      if (state && state !== "draft-course") {
        fullCourse = await fetchSingleCourse(state);
      }
      // Case 2: Otherwise fetch draft
      else {
        fullCourse = await fetchSingleCourse();
      }

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
    } finally {
      setLoading(false);
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
      setCreating(false); // stop loading
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div className="sn-card flex flex-col gap-6 p-5 sm:p-7">
      <div>
        <h2 className="font-display text-lg font-bold text-white sm:text-xl">
          Course builder
        </h2>
        <p className="mt-1.5 text-sm text-ink-400">
          Add a section for each major topic, then add lectures inside it.
        </p>
      </div>

      {loading ? (
        <ListRowSkeleton count={2} />
      ) : sections.length > 0 ? (
        <div className="flex flex-col gap-3">
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
      ) : (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-ink-700 bg-ink-850/50 px-6 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-800 text-brand-300">
            <Layers className="h-5 w-5" />
          </span>
          <p className="mt-4 text-sm font-semibold text-white">
            No sections yet
          </p>
          <p className="mt-1.5 max-w-sm text-sm text-ink-400">
            Start with something like "Getting started" — you can rename and
            reorder sections at any time.
          </p>
        </div>
      )}

      {/* Create section input */}
      <div className="flex flex-col gap-3 border-t border-ink-800 pt-6">
        <label htmlFor="new-section" className="sn-label">
          Section name
        </label>
        <InputField
          type="text"
          id="new-section"
          size="xl"
          placeholder="Add a section to build your course"
          value={newSectionName}
          changeHandler={(e) => setNewSectionName(e.target.value)}
        />

        <button
          type="button"
          onClick={CreateSectionHandler}
          disabled={creating}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand-400/60 text-sm font-semibold text-brand-300 transition-all duration-200 hover:bg-brand-400/10 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start sm:px-5"
        >
          {creating ? (
            <>
              <Spinner className="h-4 w-4" />
              Adding…
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add section
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CourseBuilderComponent;
