import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import DragAndDropFile from "../commons/DragAndDropFile";
import InputField from "../commons/InputField";
import { Spinner } from "../commons/Loading";
import {
  deleteVideo,
  uploadVideo,
} from "../../Services/operations/cloudinaryUpload";
import { createSubSection } from "../../Services/operations/instructorUtilis";

interface VideoLectureData {
  subSectionName: string;
  description: string;
  duration: number | null;
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
  const [loading, setLoading] = useState(false);

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

  const VideoFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = await uploadVideo(file);
      if (!url) {
        toast.error("Video upload failed");
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
        toast.success("Lecture saved");
        close();
        refreshSections();
      }
    } catch (err) {
      toast.error("Failed to save lecture");
    } finally {
      setLoading(false);
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
    <form onSubmit={VideoFormSubmitHandler} className="relative">
      {/* Uploading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-xl bg-ink-900/85 backdrop-blur-sm">
          <Spinner className="h-9 w-9" />
          <p className="mt-4 text-sm font-semibold text-brand-300">
            Uploading lecture…
          </p>
        </div>
      )}

      <h2 className="pr-8 font-display text-lg font-bold text-white">
        {lectureId ? "Edit lecture" : "Add a lecture"}
      </h2>
      <p className="mt-1.5 text-sm text-ink-400">
        Upload the video, then give learners a title and a short description.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <DragAndDropFile
          text="Video lecture"
          file={file}
          setFile={setFile}
          removeFile={fileRemove}
          accept="video/*"
          hint="MP4 recommended, up to 12MB"
        />

        <div>
          <label htmlFor="subSectionName" className="sn-label">
            Lecture title <span className="text-danger-400">*</span>
          </label>
          <InputField
            type="text"
            id="subSectionName"
            size="xl"
            name="subSectionName"
            value={videoLectureData.subSectionName}
            placeholder="e.g. Setting up your environment"
            changeHandler={changeHandler}
          />
        </div>

        <div>
          <span className="sn-label">
            Video playback time <span className="text-danger-400">*</span>
          </span>
          <div className="grid grid-cols-3 gap-3">
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

        <div>
          <label htmlFor="lecture-description" className="sn-label">
            Lecture description <span className="text-danger-400">*</span>
          </label>
          <textarea
            id="lecture-description"
            placeholder="What does this lecture cover?"
            className="sn-field min-h-24 resize-y"
            name="description"
            value={videoLectureData.description}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-ink-800 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => close()}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 px-5 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Save lecture
        </button>
      </div>
    </form>
  );
}

export default LectureEditing;
