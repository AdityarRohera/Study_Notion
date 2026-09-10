import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/commons/DashboardLayout";
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete";

function CourseInfo() {
  const { state } = useParams();

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard" },
        { label: "My Courses", to: "/dashboard/mycourse" },
        { label: "Course Information" },
      ]}
      title="Add course information"
      subtitle="Tell learners what this course covers and who it's for. You can edit all of it before publishing."
    >
      <NewCourseTemplete varient="courseInfo" state={state} />
    </DashboardLayout>
  );
}

export default CourseInfo;
