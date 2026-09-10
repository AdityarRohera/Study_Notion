import { GraduationCap } from "lucide-react";

import EnrolledCourseCard from "./EnrolledCourseCard";
import { EmptyState } from "../commons/States";

function EnrolledCoursesContainer({ enrolledCourses }: any) {
  const courses = Array.isArray(enrolledCourses) ? enrolledCourses : [];

  if (courses.length === 0) {
    return (
      <EmptyState
        title="You haven't enrolled in a course yet"
        description="Pick a track that matches where you want to be in six months. Most learners start with a free course to find their footing."
        icon={<GraduationCap className="h-6 w-6" />}
        action={{ label: "Browse courses", to: "/courses" }}
        secondaryAction={{ label: "Back to home", to: "/" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course: any) => {
        const { _id, courseName, thumbnail } = course.courseId ?? {};
        return (
          <EnrolledCourseCard
            key={_id}
            id={_id}
            image={thumbnail}
            courseName={courseName}
            progress={course.progress ?? 0}
          />
        );
      })}
    </div>
  );
}

export default EnrolledCoursesContainer;
