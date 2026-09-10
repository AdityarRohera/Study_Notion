import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "lucide-react";

import CourseContentCard from "../../components/EnrolledCourses/CourseContentCard ";
import DashboardLayout from "../../components/commons/DashboardLayout";
import { CourseGridSkeleton } from "../../components/commons/Skeleton";
import { EmptyState, ErrorState } from "../../components/commons/States";
import { getSubSection } from "../../Services/operations/purchasedCoursesUtilis";
import { formatDuration } from "../../Services/operations/common";

const LECTURE_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

function EnrolledCourseSubSection() {
  const { sectionId } = useParams();
  const [subContentData, setSubContentData] = useState<any>(null);
  const [failed, setFailed] = useState(false);

  const getSubSectionHandler = async () => {
    setFailed(false);
    try {
      const res = await getSubSection(sectionId);
      if (res) {
        setSubContentData(res.Section?.subSection ?? []);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
  };

  useEffect(() => {
    getSubSectionHandler();
  }, []);

  const lectures = Array.isArray(subContentData) ? subContentData : [];

  return (
    <DashboardLayout
      breadcrumbs={[
        { label: "Dashboard", to: "/dashboard/my-profile" },
        { label: "Enrolled Courses", to: "/dashboard/enrolled-courses" },
        { label: "Lectures" },
      ]}
      title="Lectures"
      subtitle="Pick a lecture to open it in the player."
    >
      {failed ? (
        <ErrorState onRetry={getSubSectionHandler} />
      ) : subContentData === null ? (
        <CourseGridSkeleton count={3} />
      ) : lectures.length === 0 ? (
        <EmptyState
          title="No lectures in this section yet"
          description="This section doesn't have any published lectures. Check back soon, or try another section."
          icon={<Video className="h-6 w-6" />}
          action={{
            label: "Back to sections",
            to: "/dashboard/enrolled-courses",
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {lectures.map((sub: any) => (
            <CourseContentCard
              key={sub._id ?? sub.id}
              title={sub.subSectionName}
              subtitle={sub.description}
              extra={
                sub.duration ? `Duration: ${formatDuration(sub.duration)}` : undefined
              }
              image={LECTURE_IMAGE}
              onClick={() =>
                window.open(
                  `/watch/${encodeURIComponent(sub.videoUrl)}`,
                  "_blank"
                )
              }
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default EnrolledCourseSubSection;
