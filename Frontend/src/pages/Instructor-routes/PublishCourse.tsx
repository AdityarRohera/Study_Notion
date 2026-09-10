import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/commons/DashboardLayout";
import NewCourseTemplete from "../../components/Instructor-course/NewCourseTemplete";

function PublishCourse() {
  const { state } = useParams(); // "draft-course" or "new-course"

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard" },
        { label: "My Courses", to: "/dashboard/mycourse" },
        { label: "Publish" },
      ]}
      title="Publish your course"
      subtitle="One last check, then make it visible to learners."
    >
      <NewCourseTemplete varient="publish" state={state} />
    </DashboardLayout>
  );
}

export default PublishCourse;
