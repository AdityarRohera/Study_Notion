import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layers } from "lucide-react";

import CourseContentCard from "../../components/EnrolledCourses/CourseContentCard ";
import DashboardLayout from "../../components/commons/DashboardLayout";
import { CourseGridSkeleton } from "../../components/commons/Skeleton";
import { EmptyState, ErrorState } from "../../components/commons/States";
import { fetchSingleCourse } from "../../Services/operations/instructorUtilis";

const SECTION_IMAGE =
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80";

function EnrolledCourseSections() {
  const [courseContent, setCourseContent] = useState<any>(null);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const state = useParams();

  const fetchFullCourseHandler = async () => {
    setFailed(false);
    try {
      const fullCourse = await fetchSingleCourse(state.courseId);
      if (fullCourse) {
        setCourseContent(fullCourse.courseContent ?? []);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
  };

  useEffect(() => {
    fetchFullCourseHandler();
  }, []);

  const sections = Array.isArray(courseContent) ? courseContent : [];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard/my-profile" },
        { label: "Enrolled Courses", to: "/dashboard/enrolled-courses" },
        { label: "Sections" },
      ]}
      title="Course sections"
      subtitle="Work through the sections in order, or jump straight to what you need."
    >
      {failed ? (
        <ErrorState onRetry={fetchFullCourseHandler} />
      ) : courseContent === null ? (
        <CourseGridSkeleton count={3} />
      ) : sections.length === 0 ? (
        <EmptyState
          title="No sections published yet"
          description="The instructor is still building this course. You'll see sections here as soon as they're published."
          icon={<Layers className="h-6 w-6" />}
          action={{ label: "Back to my courses", to: "/dashboard/enrolled-courses" }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((course: any) => (
            <CourseContentCard
              key={course._id}
              title={course.sectionName}
              subtitle={`${course.totalLecture ?? 0} lectures in this section`}
              extra="View lectures"
              image={SECTION_IMAGE}
              onClick={() => navigate(`/dashboard/lectures/${course._id}`)}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default EnrolledCourseSections;
