import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/commons/DashboardLayout";
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete";

function CourseBuilder() {
  const { state } = useParams();

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard" },
        { label: "My Courses", to: "/dashboard/mycourse" },
        { label: "Course Builder" },
      ]}
      title="Build your course"
      subtitle="Group your lessons into sections. Learners see these as the course outline."
    >
      <NewCourseTemplete varient="courseBuilder" state={state} />
    </DashboardLayout>
  );
}

export default CourseBuilder;
