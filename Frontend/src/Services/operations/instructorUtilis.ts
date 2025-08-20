
import toast from "react-hot-toast";
import { BASE_URL , COURSE_API_ENDPOINT, INSTRUCTOR_API_ENDPOINT } from "../apiConfig";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../features/slices/loadingSlice";
import { setFullCourse } from "../../features/slices/courseSlice";

export const getSingleCourse = async(dispatch : any) : Promise<any> => {
    
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try{
        const res = await apiConnector({
                             method : 'GET',
                             url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_DRAFT_COURSE}`,
                          })
                          
            if(res.data.course){

                // structure full course
                const {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , status, instructor , _id} = res.data.course;
                const data = res.data.course.courseContent;
                const courseContent: object[] = [];
                const courseSection: object[] = [];

                data.forEach((c: any) => {
                  const { sectionName, totalLecture, subSection } = c;
                  courseContent.push({ sectionName, totalLecture });
                
                  subSection.forEach((sub: any) => {
                    const { subSectionName, description, duration, videoUrl } = sub;
                    courseSection.push({ subSectionName, description, duration, videoUrl });
                  });
                });
        
                const fullCourse = {
                    AboutCourse : {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , status , instructor , _id},
                    courseContent : courseContent,
                    courseSection : courseSection
                }

                dispatch(setFullCourse(fullCourse));
                toast.success("Success!", { id: toastId });
                dispatch(setLoading(false));

                 // ✅ return here
                 return fullCourse;
            }            
        
             dispatch(setLoading(false));
             toast.success("Success!", { id: toastId });
             return null;

    } catch(err : any){
             const {message} = err.response.data
             toast.error(`${message}` , {id : toastId});
             console.log(err);
      }
}

export const deleteDraftCourse = async(dispatch : any) => {

          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
    try{
        
        // const createCourse = await apiConnector({
        //                                           method : 'POST',
        //                                           url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.CREATE_COURSE}`,
        //                                           bodyData : formData
        // })

        // console.log(createCourse.data);
        setTimeout(() => {
            console.log('deleted')
        } , 2000);

        toast.success("Success!", {
                id: toastId,
             });
            
        dispatch(setLoading(false));

    } catch(err : any){
        const {message} = err.response.data
             toast.error(`${message}` , {id : toastId});
             console.log(err);
    }
}


export const createCourseForm = async(formData : object) => {
    try{
        
        const createCourse = await apiConnector({
                                                  method : 'POST',
                                                  url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.CREATE_COURSE}`,
                                                  bodyData : formData
        })

        console.log(createCourse.data);

    } catch(err : any){
        console.log("error comes in upload img")
        console.log(err);
    }
}