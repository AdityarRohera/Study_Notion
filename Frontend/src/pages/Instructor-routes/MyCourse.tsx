import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Plus } from "lucide-react";

import DashboardLayout from "../../components/commons/DashboardLayout";
import SingleCourse from "../../components/Instructor-course/SingleCourse";
import CoursePopup from "../../components/Instructor-course/CoursePopup";
import { ListRowSkeleton } from "../../components/commons/Skeleton";
import { EmptyState, ErrorState } from "../../components/commons/States";
import {
  getInstructorCourses,
  getSingleCourse,
} from "../../Services/operations/instructorUtilis";
import { type RootState } from "../../Services/strore";

function MyCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [instructorCourses, setInstructorCourses] = useState<any>(null);
  const [failed, setFailed] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const popUpRef = useRef<any>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.loading);

  // Redirect unauthenticated visitors after render, never during it.
  useEffect(() => {
    if (!token && !localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [token]);

  const openPopUp = () => setPopupOpen(true);
  const closePopUp = () => setPopupOpen(false);

  const newCourseHandler = async () => {
    const course = await getSingleCourse(dispatch);
    if (!course) navigate(`/dashboard/mycourse/course-info/new-course`);
    else openPopUp();
  };

  const getCourses = async () => {
    setFailed(false);
    try {
      const data = await getInstructorCourses(
        dispatch,
        token ?? localStorage.getItem("token")
      );
      setInstructorCourses(Array.isArray(data) ? data : []);
    } catch {
      setFailed(true);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const courses = Array.isArray(instructorCourses) ? instructorCourses : [];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard" },
        { label: "My Courses" },
      ]}
      title="My courses"
      subtitle="Everything you've published or have in progress, in one place."
      actions={
        <button
          type="button"
          onClick={newCourseHandler}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {loading ? "Loading…" : "New course"}
        </button>
      }
    >
      {failed ? (
        <ErrorState
          title="We couldn't load your courses"
          onRetry={getCourses}
        />
      ) : instructorCourses === null ? (
        <ListRowSkeleton count={3} />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses yet"
          description="Start with a working title and an outline — you can refine everything before you publish."
          icon={<BookOpen className="h-6 w-6" />}
          action={{ label: "Create your first course", onClick: newCourseHandler }}
        />
      ) : (
        <div className="sn-card overflow-hidden">
          {/* Column headers — desktop only; each row is self-describing on mobile */}
          <div className="hidden grid-cols-[minmax(0,1fr)_7rem_7rem_6rem] items-center gap-4 border-b border-ink-800 px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-500 lg:grid">
            <span>Course</span>
            <span className="text-center">Duration</span>
            <span className="text-center">Price</span>
            <span className="text-center">Actions</span>
          </div>

          <div className="divide-y divide-ink-800">
            {courses.map((course: any) => (
              <SingleCourse key={course._id} data={course} />
            ))}
          </div>
        </div>
      )}

      {popupOpen && (
        <div ref={popUpRef}>
          <CoursePopup close={closePopUp} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyCourse;
