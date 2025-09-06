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
// import Loading from "../commons/Loading";

interface VideoLectureData {
  subSectionName: string;
  description: string;
  duration: number | null;   // <-- allow both
  videoUrl: string;
  courseSectionId: string;
  subSectionId: string;
  courseId: string;
}

function LectureEditing({
  lectureId,
  sectionId,
  subSectionName,
  description,
  duration,
  videoUrl,
  courseId,
  close,
  refreshSections,
}: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const [videoLectureData, setVideoLectureData] = useState<VideoLectureData>({
    subSectionName,
    description,
    duration,
    videoUrl,
    courseSectionId: sectionId,
    subSectionId: lectureId,
    courseId: courseId,
  });

  const [videoTime, setVideoTime] = useState<any>({
    hours: "",
    mins: "",
    secs: "",
  });
  const [file, setFile] = useState<any>(null);

  // pre-fill when editing
  useEffect(() => {
    if (subSectionName) {
      setVideoLectureData((prev: any) => ({
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
        setVideoTime({ hours: hrs, mins, secs });
      }

      if (videoUrl) {
        (async () => {
          try {
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const fileType = blob.type || "video/mp4";
            const filename = `lecture-video.${fileType.split("/")[1] || "mp4"}`;
            const fileObj = new File([blob], filename, { type: fileType });
            setFile(fileObj);
          } catch (err) {
            console.error("Error fetching video file:", err);
          }
        })();
      }
    }
  }, [subSectionName, description, duration, videoUrl]);

  // ✅ submit handler with loading
  const VideoFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const url = await uploadVideo(file);
      if (!url) {
        toast("Video upload failed");
        return;
      }

      const { hours, mins, secs } = videoTime;
      const durationInSeconds =
        Number(hours) * 3600 + Number(mins) * 60 + Number(secs);

      const finalVideoLectureData = {
        ...videoLectureData,
        duration: durationInSeconds,
        videoUrl: url,
      };

      setVideoLectureData(finalVideoLectureData);

      const res = await createSubSection(dispatch, finalVideoLectureData);
      if (res) {
        toast("Video subsection created!");
        close();
        refreshSections();
      }
    } catch (err) {
      toast.error("Failed to save lecture");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setVideoLectureData((prev: any) => ({ ...prev, [name]: value }));
  };

  const timeChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setVideoTime((prev: any) => ({ ...prev, [name]: value }));
  };

  const fileRemove = async (e: any) => {
    e.preventDefault();
    if (!videoLectureData.videoUrl) {
      setFile(null);
      return;
    }

    try {
      const deleteFile = await deleteVideo(videoLectureData.videoUrl);
      if (deleteFile) {
        setFile(null);
        setVideoLectureData((prev: any) => ({
          ...prev,
          videoUrl: null,
          duration: null,
        }));
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/60">
      <form
        onSubmit={VideoFormSubmitHandler}
        className="bg-[#111827] text-white rounded-lg w-[600px] p-6 relative"
      >

         {/* ✅ Uploading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg z-50">
              <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold text-yellow-600">Uploading...</p>
            </div>
          )}

        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Editing Lecture</h2>
        </div>

        {/* Upload Video */}
        <DragAndDropFile
          text={"Video Lecture"}
          fileType={"lecture"}
          url={videoUrl}
          file={file}
          setFile={setFile}
          removeFile={fileRemove}
        />

        {/* Lecture Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Lecture Title <span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            size="xl"
            name="subSectionName"
            value={videoLectureData.subSectionName}
            placeholder="Enter Lecture Title..."
            changeHandler={changeHandler}
          />
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Video Playback Time <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <InputField
              type="number"
              size="xl"
              placeholder="HH"
              name="hours"
              value={videoTime.hours}
              min={0}
              max={23}
              changeHandler={timeChangeHandler}
            />
            <InputField
              type="number"
              size="xl"
              placeholder="MM"
              name="mins"
              value={videoTime.mins}
              min={0}
              max={59}
              changeHandler={timeChangeHandler}
            />
            <InputField
              type="number"
              size="xl"
              placeholder="SS"
              name="secs"
              value={videoTime.secs}
              min={0}
              max={59}
              changeHandler={timeChangeHandler}
            />
          </div>
        </div>

        {/* Description */}
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
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => close()}
            className="bg-[#374151] text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold"
          >
            Save Edits
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default LectureEditing;

