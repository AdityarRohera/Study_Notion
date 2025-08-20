import { useEffect, useRef, useState } from "react";
import InputField from "../commons/InputField";
import { uploadImg } from "../../Services/operations/cloudinaryUpload";
import { fatchCategories } from "../../Services/operations/common";
import { useSelector} from "react-redux";
import { type RootState } from "../../Services/strore";
import { createCourseForm } from "../../Services/operations/instructorUtilis";
import { useNavigate } from "react-router-dom";
import { getSingleCourse } from "../../Services/operations/instructorUtilis";
import { useDispatch } from "react-redux";


// components/CourseForm.tsx
export default function CourseForm({state} : {state : string}) {

  const {_id} = useSelector((state : RootState) => state.auth.user);
  const {AboutCourse} = useSelector((state : RootState) => state.full_course);
  const dispatch = useDispatch();

  const[createCourseData , setCreateCourseData] = useState<any>({courseName : '' , courseDesc : '' , user :`${_id}` , whatYouWillLearn : '' , price:'' , thumbnail:'' , category:''});

  console.log(createCourseData)

  // fill form data if exist in database
  const preFillState = async() => {

       if(state == 'new-course') return;

       else if(state == 'draft-course'){
           // first get from react-state if exist 
           AboutCourse && (setCreateCourseData(AboutCourse));
             
           if(!AboutCourse){
             const fullCourse = await getSingleCourse(dispatch);
             fullCourse && (setCreateCourseData(fullCourse.AboutCourse));
           }
       }
  }

    useEffect(() => {
        preFillState();
    } , []);

  const Navigate = useNavigate();
  const[file , setFile] = useState<string | null>(null);
  const[category , setCategory] = useState<any>([]);
  const categoryRef = useRef<string | null>('');
  // console.log(createCourseData)

  const fileChangeHandler = (e: any) => {
      setFile(e.target.files);
  }

  const fileSaveHandler = async(e : any) => {
      // const {name} = e.target
      const thumbnailUrl = await uploadImg(e , file)
      if(thumbnailUrl){
        setCreateCourseData((prev : any) => {
          return {...prev , thumbnail : thumbnailUrl};
        })
      }
  }

  // course data change handler
  const courseDataHandler = (e : any) => {
    e.preventDefault();
      const {name , value} = e.target;
      
      if(name === 'category'){
          setCreateCourseData((prev : any) => {
              return {...prev , [name] :categoryRef.current}
           })
      } else {
        setCreateCourseData((prev : any) => {
        return {...prev , [name] : value}
        })
      }
  }

  // course data submit handler
  const courseDataSubmitHandler = (e : any) => {
        e.preventDefault();
        console.log(createCourseData);
        createCourseForm(createCourseData);
        Navigate('/dashboard/mycourse/course-builder');
  }

  // get category handler
  const getCategories = async() => {
      const categories = await fatchCategories();
      if (categories) setCategory(categories);
  }

  useEffect(() => {
      getCategories();

      // fatch data if exist
      // const courseFormData = getformData()
  } , [])

  if(!category){
    return(
      <div>Loading...</div>
    )
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
         <label htmlFor="category">Category <span className="text-red-400">*</span></label>
         <select name="category" onChange={courseDataHandler} className="bg-gray-50 border-0 border-b-2 border-white text-gray-900 text-xl rounded-lg  focus:ring-0 focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-b-1 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white">
          <option>Choose a Category</option>
          {     
                   category?.map((category : any) => {
                     const {_id ,name} = category;
                     categoryRef.current = _id
                      return <option key={_id} >{name}</option>
                 })
          }
        </select>
       </div>

        {/* <InputField type="text" size="xl" placeholder="Choose a Tag"/> */}

        <div className="border border-dashed border-gray-600 p-4 rounded-md text-center">
          <p className="mb-1">Drag and drop an image, or <span className="text-yellow-400 cursor-pointer">Browse</span></p>
          <p className="text-xs text-gray-400">Max 6MB each (12MB for videos)</p>
          <p className="text-xs text-gray-400">Aspect ratio 16:9 & Recommended size 1024x576</p>
          <InputField type="file" size='xl' name="thumbnail" changeHandler={fileChangeHandler}/>
          <button onClick={fileSaveHandler} className="border p-2 rounded-2xl">UploadImg</button>
        </div>

        <div>
            <label htmlFor="desc">Course Short Description <span className="text-red-400">*</span></label>
            <textarea
              className="bg-gray-50 border-0 border-b-2 border-white text-gray-900 text-xl rounded-lg  focus:ring-0 focus:border-white block w-full h-[100px] p-2.5 dark:bg-gray-700 dark:border-b-1 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-white"
              placeholder="Write course learning" name="whatYouWillLearn" value={createCourseData.whatYouWillLearn} onChange={courseDataHandler}
            />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-md self-start mt-4 ml-[45%] w-[100px]"
        >
          Save
        </button>
      </div>
    </form>
  );
}