// import React from 'react'

import { useEffect, useState } from "react";
import DragAndDropFile from "../commons/DragAndDropFile"
import InputField from "../commons/InputField"
import { uploadVideo } from "../../Services/operations/cloudinaryUpload";
import { useDispatch } from "react-redux";
import { createSubSection } from "../../Services/operations/instructorUtilis";
// import { useSelector} from "react-redux";
// import { type RootState } from "../../Services/strore";
import { deleteVideo } from "../../Services/operations/cloudinaryUpload";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

interface VideoLectureData {
  subSectionName: string;
  description: string;
  duration: number | null;   // <-- allow both
  videoUrl: string;
  courseSectionId: string;
  subSectionId: string;
  courseId: string;
}

function LectureEditing({lectureId , sectionId , subSectionName , description , duration , videoUrl , courseId , close , refreshSections} : any) {
  // console.log(videoUrl);
  console.log(sectionId , lectureId)
  // console.log(sectionId);
  // console.log(subSectionName);

    // const {AboutCourse} = useSelector((state : RootState) => state.full_course);

    // if(!AboutCourse) return <div>No Course Found</div>

  // All State Data
  const dispatch = useDispatch();
  const [videoLectureData , setVideoLectureData] = useState<VideoLectureData>({
                                                                  subSectionName,
                                                                  description,
                                                                  duration,
                                                                  videoUrl,
                                                                  courseSectionId: sectionId,
                                                                  subSectionId: lectureId,
                                                                  courseId: courseId
                                                      });

  const [videoTime , setVideoTime] = useState<any>({hours : '' , mins : '' , secs : ''});
  const [file, setFile] = useState<any>(null);

  console.log("Full video data - > " , videoLectureData);
  // console.log("Time Data -> " , videoTime);
  // console.log("file Data -> " , file);

  // fetch data if subSectionId exists
  useEffect(() => {
  if (subSectionName) {
    setVideoLectureData((prev) => ({
      ...prev,
      subSectionName,
      description,
      duration,
      videoUrl,
    }));

    if (duration) {
      const hrs = Math.floor(duration / 3600);
      const mins = Math.floor((duration % 3600) / 60);
      const secs = duration % 60;
      setVideoTime({ hours: hrs, mins, secs});
    }

    if (videoUrl) {
      // Convert the URL to a File object and store in state
      (async () => {
        try {
          const response = await fetch(videoUrl);
          // console.log('first response -> ' , response)
          const blob = await response.blob();
          // console.log('blob file -> ' , blob , "and type is  -> " , blob.type);

          // try to guess type from blob
          const fileType = blob.type || "video/mp4";

          const filename = `lecture-video.${fileType.split("/")[1] || "mp4"}`;
          // console.log("file name -> " , filename)
          const fileObj = new File([blob], filename, { type: fileType });
          // console.log("file obj -> " , fileObj);

          setFile(fileObj);
        } catch (err) {
          console.error("Error fetching video file:", err);
        }
      })();
    }
  }
}, [subSectionName, description, duration, videoUrl]);
    

  const VideoFormSubmitHandler = async (e: any) => {
  e.preventDefault();
  console.log("Inside video form submitted");

  // validation of form is pending...

  // Upload video to Cloudinary
  const url = await uploadVideo(file);
  console.log("Uploaded video URL:", url);

  if (!url) {
    toast("Video upload failed");
    return;
  }

  const { hours, mins, secs } = videoTime;
  const durationInSeconds =
    Number(hours) * 3600 + Number(mins) * 60 + Number(secs);

  // Build final object
  const finalVideoLectureData = {
    ...videoLectureData,
    duration: durationInSeconds,
    videoUrl: url,
  };

  // Update local state for UI consistency
  setVideoLectureData(finalVideoLectureData);

  // Use the latest data for API call
  const res = await createSubSection(dispatch, finalVideoLectureData);
  if(res){
    toast("Video subsection created!");
    close();
    refreshSections();
  }
};


  const changeHandler = (e : any) => {
      const {name , value} = e.target;
      setVideoLectureData((prev : any) => {
          return {
            ...prev , [name] : value
          }
      })
  }

  const timeChangeHandler = (e : any) => {
      const {name , value} = e.target;
      setVideoTime((prev : any) => {
          return {
            ...prev , [name] : value
          }
      })
  }


  const fileRemove = async (e: any) => {
  e.preventDefault();
  console.log('Inside file remove handler');

  if (!videoLectureData.videoUrl) {
    setFile(null);
    return;
  }

  try {
    const deleteFile = await deleteVideo(videoLectureData.videoUrl);
    console.log("Inside Drag and drop function -> ", deleteFile);

    if (deleteFile) {
      setFile(null);
      setVideoLectureData((prev : any) => ({
        ...prev,
        videoUrl: null,   // ✅ set to null instead of ''
        duration: null    // ✅ optional: also clear duration when video is gone
      }));
    }

  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

  
  return (
    // top-level div
     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/60">

      <form onSubmit={VideoFormSubmitHandler} className="bg-[#111827] text-white rounded-lg w-[600px] p-6 relative">

        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Editing Lecture</h2>
        </div>

        {/* Upload Video Box */}
        <DragAndDropFile text={"Video Lecture"} fileType={"lecture"} url={videoUrl} file={file} setFile={setFile} removeFile={fileRemove}/>

        {/* Lecture Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Lecture Title <span className="text-red-500">*</span>
          </label>
          <InputField type="text" size="xl" name="subSectionName" value={videoLectureData.subSectionName} placeholder="Enter Lecture Title..." changeHandler={changeHandler}/>
        </div>

        {/* Video Playback Time */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Video Playback Time <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
                <InputField type="number" size="xl"  placeholder="HH" name="hours" value={videoTime.hours} min={0} max={23} changeHandler={timeChangeHandler}/>
                <InputField type="number" size="xl"  placeholder="HH" name="mins" value={videoTime.mins} min={0} max={59} changeHandler={timeChangeHandler}/>
                <InputField type="number" size="xl"  placeholder="HH" name="secs" value={videoTime.secs} min={0} max={59} changeHandler={timeChangeHandler}/>
          </div>
        </div>

        {/* Lecture Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Lecture Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter Course Description.."
            className="w-full p-3 bg-[#1f2937] border border-gray-500 rounded-md text-white focus:outline-none"
            name="description"
            value={videoLectureData.description}
            onChange={changeHandler}
          ></textarea>
        </div>

        {/* Buttons */}
        <button type="button" onClick={() => close()} className="bg-[#374151] text-white px-6 py-2 rounded-md">
            Cancel
          </button>
        <div className="flex justify-end gap-4">
          {/* <button onClick={() => close()} className="bg-[#374151] text-white px-6 py-2 rounded-md">
            Cancel
          </button> */}

          <button type="submit" className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold">
            Save Edits
          </button>
        </div>

      </form>

      <Toaster/>
    </div>
  )
}

export default LectureEditing;
