// import React from 'react'
import { useParams } from "react-router-dom";
import CourseContentCard from "../../components/EnrolledCourses/CourseContentCard ";
import { getSubSection } from "../../Services/operations/purchasedCoursesUtilis";
import { useEffect, useState } from "react";
import Loading from "../../components/commons/Loading";
// import toast from "react-hot-toast";
// import LecturePlayer from "../../components/commons/LecturePlayer";
// import { useNavigate } from "react-router-dom";

function EnrolledCourseSubSection() {
  const {sectionId} = useParams();
//   const navigate = useNavigate();
  console.log(sectionId)

  const [subContentData , setSubContentData] = useState<any>(null);

  console.log(subContentData)

    const getSubSectionHandler = async() => {
        const res = await getSubSection(sectionId)
        console.log(res);
        if(res){
            setSubContentData(res.Section.subSection);
        }
    }

    useEffect(() => {
        getSubSectionHandler();
    } , [])

    if(!subContentData){
        return <Loading/>
    }

//   const subSections = subContentData["68a7126044275c85325fc12d"] || [];

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-10">
  <h1 className="text-3xl font-bold mb-8">📖 Sub sections</h1>

  {/* Grid for lectures */}
  {subContentData.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      {subContentData.map((sub: any) => (
        <CourseContentCard
          key={sub.id}
          title={sub.subSectionName}
          subtitle={sub.description}
          extra={`Duration: ${sub.duration} mins`}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRrawJYvUrow_FNaZXahuaSRX00SlcHD97g&s"
          onClick={() =>
                    window.open(`/watch/${encodeURIComponent(sub.videoUrl)}`, "_blank")
                  }
        />
      ))}
    </div>
  ) : (
    <p className="text-gray-400">No subsections found for this course.</p>
  )}
</div>
    
  );
}

export default EnrolledCourseSubSection;