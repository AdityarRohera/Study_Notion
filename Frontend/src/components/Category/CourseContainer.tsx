import { useSelector } from "react-redux";
import { Compass } from "lucide-react";

import CoursesTemplete from "./CoursesTemplete";
import type { RootState } from "../../Services/strore";
import { EmptyState } from "../commons/States";

function CourseContainer() {
  const { categoryCourses, someMoreCourses } = useSelector(
    (state: RootState) => state.category_courses
  );

  const hasCategoryCourses =
    Array.isArray(categoryCourses) && categoryCourses.length > 0;
  const hasMoreCourses =
    Array.isArray(someMoreCourses) && someMoreCourses.length > 0;

  return (
    <div className="bg-ink-950">
      <div className="sn-container-wide flex flex-col gap-16 py-14 md:gap-20 md:py-20">
        {hasCategoryCourses && (
          <CoursesTemplete
            heading="Courses to get you started"
            subheading="Hand-picked tracks that take you from the fundamentals to something you can actually put in a portfolio."
            filterBar={true}
            name="CategoryCourses"
          />
        )}

        {hasMoreCourses && (
          <CoursesTemplete
            heading="More courses in this space"
            subheading="Go wider once the fundamentals click — these pair well with the track above."
            name="SomeMoreCourses"
          />
        )}

        {!hasCategoryCourses && !hasMoreCourses && (
          <EmptyState
            title="This category is empty for now"
            description="We're still building out this catalog. Explore another category in the meantime — there's plenty to dig into."
            icon={<Compass className="h-6 w-6" />}
            action={{ label: "Back to home", to: "/" }}
            secondaryAction={{ label: "Contact us", to: "/contact" }}
          />
        )}
      </div>
    </div>
  );
}

export default CourseContainer;
