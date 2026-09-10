import { useSelector } from "react-redux";
import { BookOpen } from "lucide-react";

import CourseCard from "./CourseCard";
import type { RootState } from "../../Services/strore";
import { CourseGridSkeleton } from "../commons/Skeleton";
import { EmptyState } from "../commons/States";

/**
 * Responsive course grid. The previous version was a single horizontally
 * scrolling row with a 400px min height, which cut cards off on every screen
 * size; this reflows 1 → 2 → 3 → 4 columns.
 */
function CardContainer({ name }: { name: string }) {
  const { categoryCourses, someMoreCourses, topSellingCourses } = useSelector(
    (state: RootState) => state.category_courses
  );
  const { loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <CourseGridSkeleton count={4} />;
  }

  const source =
    name === "CategoryCourses"
      ? categoryCourses
      : name === "SomeMoreCourses"
        ? someMoreCourses
        : name === "TopSellingCourses"
          ? topSellingCourses
          : null;

  const courses = Array.isArray(source) ? source : [];

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses here yet"
        description="This shelf is still being stocked. Try another category — new courses land every week."
        icon={<BookOpen className="h-6 w-6" />}
        action={{ label: "Browse all courses", to: "/courses" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course: any, index: number) => (
        <CourseCard key={course?._id ?? index} data={course} />
      ))}
    </div>
  );
}

export default CardContainer;
