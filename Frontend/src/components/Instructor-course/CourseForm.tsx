import { useEffect, useState } from "react";
import InputField from "../commons/InputField";
import { uploadImg } from "../../Services/operations/cloudinaryUpload";
import { fatchCategories } from "../../Services/operations/common";
import { useSelector} from "react-redux";
import { type RootState } from "../../Services/strore";
import { createCourseForm } from "../../Services/operations/instructorUtilis";
// import { useNavigate } from "react-router-dom";
import { getSingleCourse } from "../../Services/operations/instructorUtilis";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import DragAndDropFile from "../commons/DragAndDropFile";
import { deleteImage } from "../../Services/operations/cloudinaryUpload";
import { useParams } from "react-router-dom";
import Loading from "../commons/Loading";

// interface courseFormType {
//   courseName : string;
//   courseDesc : string;
//   user : any;
//   whatYouWillLearn : string;
//   price : string;
//   thumbnail : string;
//   category : any;
//   _id : any;
// }


// components/CourseForm.tsx
export default function CourseForm({state} : {state : string}) {

  const userId = useSelector((state : RootState) => state.auth.user._id);
  const {AboutCourse} = useSelector((state : RootState) => state.full_course);
  const [load , setLoad] = useState(false);
  const dispatch = useDispatch();
  const courseId = useParams();
  // console.log(courseId)

  const[createCourseData , setCreateCourseData] = useState<any>({courseName : '' , courseDesc : '' , user :`${userId}` , whatYouWillLearn : '' , price:'' , thumbnail:'' , category:'' , course : ''});


  const[file , setFile] = useState<any>(null);
  const[category , setCategory] = useState<any>([]);
  // const categoryRef = useRef<string | null>('');

  // console.log(createCourseData)

  // fill form data if exist in database
  const preFillState = async () => {
  if (state === "new-course") return;

  if (state === "draft-course" || courseId) {
    // pick AboutCourse if exists, else fetch from API
    const data = AboutCourse ?? (await getSingleCourse(dispatch))?.AboutCourse;

    if (data) {
      const {courseName , courseDesc , whatYouWillLearn , price , thumbnail , category , _id} = data;

      setCreateCourseData({
        courseName,
        courseDesc,
        whatYouWillLearn,
        price,
        thumbnail,
        category : category?._id || category,
        user: userId,
        course: _id
      });

      if (thumbnail) {
      // Convert the URL to a File object and store in state
      (async () => {
        try {
          const response = await fetch(thumbnail);
          // console.log('first response -> ' , response)
          const blob = await response.blob();
          // console.log('blob file -> ' , blob , "and type is  -> " , blob.type);

          // try to guess type from blob
          const fileType = blob.type || "image/mp4";

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
  }
};

   useEffect(() => {
        preFillState();
    } , []);

  // console.log(createCourseData)

  // const fileSaveHandler = async(e : any) => {
  //     // const {name} = e.target
  //     e.preventDefault();
  //     const thumbnailUrl = await uploadImg(file)
  //     if(thumbnailUrl){
  //       setCreateCourseData((prev : any) => {
  //         return {...prev , thumbnail : thumbnailUrl};
  //       })
  //     }
  // }

  // course data change handler
  const courseDataHandler = (e : any) => {
    e.preventDefault();
      const {name , value} = e.target;
      
      setCreateCourseData((prev: any) => ({
        ...prev,
        [name]: value,  // directly store the selected category _id
      }));
  }

  // course data submit handler
      const courseDataSubmitHandler = async (e: any) => {
      e.preventDefault();
      
      setLoad(true);
      
      try {
        // 1. Upload image
        const thumbnailUrl = await uploadImg(file);
        console.log("Thumbnail uploaded:", thumbnailUrl);
      
        if (!thumbnailUrl) {
          toast("No thumbnail uploaded");
          return;
        }
      
        // 2. Prepare final data
        const finalCourseData = {
          ...createCourseData,
          thumbnail: thumbnailUrl,
        };
      
        setCreateCourseData(finalCourseData);
      
        console.log("Final data -> ", finalCourseData);
      
        // 3. Save course
        await createCourseForm(finalCourseData);
      
        toast.success("Course saved ✅");
      } catch (err) {
        console.error("Error saving course:", err);
        toast.error("Failed to save course ❌");
      } finally {
        // ✅ always reset load
        setLoad(false);
      }
    };


  // get category handler
  const getCategories = async() => {
      const categories = await fatchCategories();
      if (categories) setCategory(categories);
  }

  // file remove handler
  const fileRemove = async() => {
            console.log('Inside file remove handler');
    
            if(!createCourseData.thumbnail){
                setFile(null);
                return;
            }
            
            const deleteFile = await deleteImage(createCourseData.thumbnail);
            console.log("Inside Drag and drop function -> " , deleteFile);
            if(deleteFile){
              setFile(null);
              setCreateCourseData((prev : any) => {return {...prev , 'thumbnail':''}})
            }
        }

  useEffect(() => {
      getCategories();

      // fatch data if exist
      // const courseFormData = getformData()
  } , [])

  if(!category){
    return <Loading/>
  }

  if(load){
    return <Loading/>
  }

  return (
    <form onSubmit={courseDataSubmitHandler} className="bg-[#111827] text-white p-3 rounded-2xl shadow-md flex-1 border w-[45vw]">
      <div className="grid grid-cols-1 gap-10 p-4 bg-gray-900">

        <div>
            <label htmlFor="Course-title">Course Title <span className="text-red-400">*</span></label>
            <InputField type="text" size="xl" placeholder="Enter course Title" name="courseName" value={createCourseData.courseName} changeHandler={courseDataHandler}/>
        </div>

        <div>
            <label htmlFor="desc">Course Short Description <span className="text-red-400">*</span></label>
            <textarea
              className="bg-gray-50 border-0 border-b-2 border-white text-gray-900 text-xl rounded-lg  focus:ring-0 focus:border-white block w-full h-[100px] p-2.5 dark:bg-gray-700 dark:border-b-1 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white"
              placeholder="Enter Description" name="courseDesc" value={createCourseData.courseDesc} onChange={courseDataHandler}
            />
        </div>

        <div>
             <label htmlFor="price">Price <span className="text-red-400">*</span></label>
            <InputField type="text" size="xl" placeholder="Price"  name="price" value={createCourseData.price} changeHandler={courseDataHandler}/>
        </div>

       <div>
  <label htmlFor="category">
    Category <span className="text-red-400">*</span>
  </label>
  <select
    name="category"
    value={createCourseData.category}
    onChange={courseDataHandler}
    className="bg-gray-50 border-0 border-b-2 border-white text-gray-900 text-xl rounded-lg 
               focus:ring-0 focus:border-white block w-full p-2.5 
               dark:bg-gray-700 dark:border-b-1 dark:border-white dark:placeholder-gray-400 
               dark:text-white dark:focus:ring-0 dark:focus:border-white"
  >
    <option value="">Choose a Category</option>
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


        {/* <InputField type="text" size="xl" placeholder="Choose a Tag"/> */}

        {/* <div className="border border-dashed border-gray-600 p-4 rounded-md text-center">
          <p className="mb-1">Drag and drop an image, or <span className="text-yellow-400 cursor-pointer">Browse</span></p>
          <p className="text-xs text-gray-400">Max 6MB each (12MB for videos)</p>
          <p className="text-xs text-gray-400">Aspect ratio 16:9 & Recommended size 1024x576</p>
          <InputField type="file" size='xl' name="thumbnail" changeHandler={fileChangeHandler}/>
          <button onClick={fileSaveHandler} className="border p-2 rounded-2xl">UploadImg</button>
        </div> */}

        <DragAndDropFile text={"Upload Image"} file={file} setFile={setFile} removeFile={fileRemove}/>

        <div>
            <label htmlFor="desc">Benefit Of The Course <span className="text-red-400">*</span></label>
            <textarea
              className="bg-gray-50 border-0 border-b-2 border-white text-gray-900 text-xl rounded-lg  focus:ring-0 focus:border-white block w-full h-[100px] p-2.5 dark:bg-gray-700 dark:border-b-1 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white"
              placeholder="Write course learning" name="whatYouWillLearn" value={createCourseData.whatYouWillLearn} onChange={courseDataHandler}
            />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-md self-start mt-4 ml-[45%] w-[100px] cursor-pointer"
        >
          Save
        </button>
      </div>

        <Toaster/>
    </form>
  );
}