import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DashboardLayout from "../components/commons/DashboardLayout";
import EnrolledCoursesContainer from "../components/EnrolledCourses/EnrolledCoursesContainer";
import { CourseGridSkeleton } from "../components/commons/Skeleton";
import { ErrorState } from "../components/commons/States";
import { getEnrolledCourses } from "../Services/operations/purchasedCoursesUtilis";

function readFirstName() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw).firstName : null;
  } catch {
    return null;
  }
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<any>(null);
  const [failed, setFailed] = useState(false);
  const dispatch = useDispatch();

  const firstName = readFirstName();

  const fetchCourses = async () => {
    setFailed(false);
    try {
      const res = await getEnrolledCourses(dispatch);
      if (res) {
        setEnrolledCourses(res.enrolledCourses ?? []);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const count = Array.isArray(enrolledCourses) ? enrolledCourses.length : 0;

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard/my-profile" },
        { label: "Enrolled Courses" },
      ]}
      title={`${greeting()}${firstName ? `, ${firstName}` : ""}`}
      subtitle={
        enrolledCourses === null
          ? "Fetching your library…"
          : count > 0
            ? `You have ${count} course${count === 1 ? "" : "s"} in your library.`
            : "Your library is ready whenever you are."
      }
    >
      <section className="flex flex-col gap-6">
        <h2 className="font-display text-lg font-bold text-white sm:text-xl">
          Enrolled courses
        </h2>

        {failed ? (
          <ErrorState
            title="We couldn't load your courses"
            description="Your session may have expired, or the connection dropped. Try again — nothing has been lost."
            onRetry={fetchCourses}
          />
        ) : enrolledCourses === null ? (
          <CourseGridSkeleton count={3} />
        ) : (
          <EnrolledCoursesContainer enrolledCourses={enrolledCourses} />
        )}
      </section>
    </DashboardLayout>
  );
}

export default EnrolledCourses;
