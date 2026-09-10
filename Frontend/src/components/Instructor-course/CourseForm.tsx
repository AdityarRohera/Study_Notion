import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import InputField from "../commons/InputField";
import DragAndDropFile from "../commons/DragAndDropFile";
import { Spinner } from "../commons/Loading";
import { type RootState } from "../../Services/strore";
import { deleteImage, uploadImg } from "../../Services/operations/cloudinaryUpload";
import { fatchCategories } from "../../Services/operations/common";
import {
  createCourseForm,
  getSingleCourse,
} from "../../Services/operations/instructorUtilis";

export default function CourseForm({ state }: { state: string }) {
  const userId = useSelector((state: RootState) => state.auth.user._id);
  const { AboutCourse } = useSelector((state: RootState) => state.full_course);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const courseId = useParams();
  const navigate = useNavigate();

  const [createCourseData, setCreateCourseData] = useState<any>({
    courseName: "",
    courseDesc: "",
    user: `${userId}`,
    whatYouWillLearn: "",
    price: "",
    thumbnail: "",
    category: "",
    course: "",
  });

  const [file, setFile] = useState<any>(null);
  const [category, setCategory] = useState<any>([]);

  // fill form data if exist in database
  const preFillState = async () => {
    if (state === "new-course") return;

    if (state === "draft-course" || courseId.state) {
      let data;

      // Case 1: Draft course
      if (state === "draft-course" && courseId.state === "draft-course") {
        data = AboutCourse ?? (await getSingleCourse(dispatch))?.AboutCourse;
      }
      // Case 2: Specific course by ID
      else if (courseId.state) {
        data =
          AboutCourse ??
          (await getSingleCourse(dispatch, courseId.state))?.AboutCourse;
      }

      if (data) {
        const {
          courseName,
          courseDesc,
          whatYouWillLearn,
          price,
          thumbnail,
          category,
          _id,
        } = data;

        setCreateCourseData({
          courseName,
          courseDesc,
          whatYouWillLearn,
          price,
          thumbnail,
          category: category?._id || category,
          user: userId,
          course: _id,
        });

        if (thumbnail) {
          // Convert the URL to a File object and store in state
          (async () => {
            try {
              const response = await fetch(thumbnail);
              const blob = await response.blob();

              const fileType = blob.type || "image/mp4";
              const filename = `lecture-video.${fileType.split("/")[1] || "mp4"}`;
              const fileObj = new File([blob], filename, { type: fileType });

              setFile(fileObj);
            } catch (err) {
              console.error("Error fetching video file:", err);
            }
          })();
        }
      }
    }
  };

  useEffect(() => {
    preFillState();
  }, []);

  // course data change handler
  const courseDataHandler = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCreateCourseData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // course data submit handler
  const courseDataSubmitHandler = async (e: any) => {
    e.preventDefault();

    setLoad(true);

    try {
      // 1. Upload image
      const thumbnailUrl = await uploadImg(file);

      if (!thumbnailUrl || typeof thumbnailUrl !== "string") {
        toast.error("No thumbnail uploaded");
        return;
      }

      // 2. Prepare final data
      const finalCourseData = {
        ...createCourseData,
        thumbnail: thumbnailUrl,
      };

      setCreateCourseData(finalCourseData);

      // 3. Save course
      const createRes = await createCourseForm(finalCourseData);
      if (createRes) {
        navigate("/dashboard/mycourse/course-info/draft-course");
      }

      toast.success("Course saved");
    } catch (err) {
      console.error("Error saving course:", err);
      toast.error("Failed to save course");
    } finally {
      setLoad(false);
    }
  };

  // get category handler
  const getCategories = async () => {
    const categories = await fatchCategories();
    if (categories) setCategory(categories);
  };

  // file remove handler
  const fileRemove = async () => {
    if (!createCourseData.thumbnail) {
      setFile(null);
      return;
    }

    const deleteFile = await deleteImage(createCourseData.thumbnail);
    if (deleteFile) {
      setFile(null);
      setCreateCourseData((prev: any) => {
        return { ...prev, thumbnail: "" };
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form
      onSubmit={courseDataSubmitHandler}
      className="sn-card flex flex-col gap-6 p-5 sm:p-7"
    >
      <div>
        <label htmlFor="Course-title" className="sn-label">
          Course title <span className="text-danger-400">*</span>
        </label>
        <InputField
          type="text"
          id="Course-title"
          size="xl"
          placeholder="e.g. Modern React from scratch"
          name="courseName"
          value={createCourseData.courseName}
          changeHandler={courseDataHandler}
        />
      </div>

      <div>
        <label htmlFor="courseDesc" className="sn-label">
          Short description <span className="text-danger-400">*</span>
        </label>
        <textarea
          id="courseDesc"
          className="sn-field min-h-28 resize-y"
          placeholder="One or two sentences on what this course covers and who it's for."
          name="courseDesc"
          value={createCourseData.courseDesc}
          onChange={courseDataHandler}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="sn-label">
            Price (₹) <span className="text-danger-400">*</span>
          </label>
          <InputField
            classNameProp="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            id="price"
            size="xl"
            placeholder="0 for free"
            name="price"
            value={createCourseData.price}
            changeHandler={courseDataHandler}
          />
        </div>

        <div>
          <label htmlFor="category" className="sn-label">
            Category <span className="text-danger-400">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={createCourseData.category}
            onChange={courseDataHandler}
            className="sn-field"
          >
            <option value="">Choose a category</option>
            {category?.map((cat: any) => {
              const { _id, name } = cat;
              return (
                <option key={_id} value={_id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <DragAndDropFile
        text="Course thumbnail"
        file={file}
        setFile={setFile}
        removeFile={fileRemove}
        accept="image/*"
        hint="PNG or JPG, up to 6MB"
      />

      <div>
        <label htmlFor="whatYouWillLearn" className="sn-label">
          Benefits of the course <span className="text-danger-400">*</span>
        </label>
        <textarea
          id="whatYouWillLearn"
          className="sn-field min-h-28 resize-y"
          placeholder="What will learners be able to do by the end?"
          name="whatYouWillLearn"
          value={createCourseData.whatYouWillLearn}
          onChange={courseDataHandler}
        />
      </div>

      <div className="flex justify-end border-t border-ink-800 pt-6">
        <button
          type="submit"
          disabled={load}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 px-6 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {load ? (
            <>
              <Spinner className="h-4 w-4 text-ink-950" />
              Saving…
            </>
          ) : (
            "Save course details"
          )}
        </button>
      </div>
    </form>
  );
}
