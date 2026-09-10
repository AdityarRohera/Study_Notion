import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AboutFullCourse from "../components/courses/AboutFullCourse";
import WhatYouWillLearn from "../components/courses/WhatYouWillLearn";
import CourseContent from "../components/courses/CourseContent";
import AboutInstructor from "../components/courses/AboutInstructor";
import BuyCourseCard from "../components/courses/BuyCourseCard";
import Loading from "../components/commons/Loading";
import { ErrorState } from "../components/commons/States";
import { fetchSingleCourse } from "../Services/operations/instructorUtilis";

function FullCourse() {
  const state = useParams();
  const [aboutCourse, setAboutCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [failed, setFailed] = useState(false);

  const fetchCourseData = async () => {
    setFailed(false);
    try {
      const fullCourse = await fetchSingleCourse(state.id);
      if (fullCourse) {
        setAboutCourse(fullCourse.AboutCourse);

        // sections now contain subsections
        setSections(
          fullCourse.courseContent.map((sec: any) => ({
            _id: sec._id,
            sectionName: sec.sectionName,
            sectionLecture: sec.subSection || [], // subsections embedded
          }))
        );
      } else {
        setFailed(true);
      }
    } catch (err: any) {
      console.error("Error fetching course:", err.message);
      setFailed(true);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  if (failed) {
    return (
      <div className="sn-container py-20">
        <ErrorState
          title="We couldn't load this course"
          description="The course may have been unpublished, or the connection dropped on the way. Try again in a moment."
          onRetry={fetchCourseData}
        />
      </div>
    );
  }

  if (!aboutCourse) {
    return <Loading message="Loading course" />;
  }

  return (
    <div className="bg-ink-950 pb-16 md:pb-24">
      <AboutFullCourse AboutCourse={aboutCourse} />

      <div className="sn-container-wide">
        <div className="grid gap-8 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          {/* Purchase panel: first on mobile, sticky sidebar on desktop */}
          <div className="order-first lg:order-last">
            <div className="lg:sticky lg:top-24">
              <BuyCourseCard
                id={aboutCourse._id}
                amount={aboutCourse.price}
                courseName={aboutCourse.courseName}
                thumbnail={aboutCourse.thumbnail}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-8 lg:gap-10">
            <WhatYouWillLearn AboutCourse={aboutCourse} />
            <CourseContent
              courseContent={sections}
              duration={aboutCourse.totalLength}
            />
            <AboutInstructor InstructorData={aboutCourse.instructor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullCourse;
