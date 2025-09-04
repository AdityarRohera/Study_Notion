
import toast from "react-hot-toast";
import { BASE_URL , COURSE_API_ENDPOINT, INSTRUCTOR_API_ENDPOINT } from "../apiConfig";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../features/slices/loadingSlice";
import { setFullCourse } from "../../features/slices/courseSlice";


interface subSectionData {
    subSectionName : string;
    description : string;
    duration : any;
    videoUrl : string;
    courseSectionId : any;
}

export const getSingleCourse = async(dispatch : any , courseId? : any) : Promise<any> => {
    
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try{
        let res;
        if(courseId){
             res = await apiConnector({
                             method : 'GET',
                             url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_SINGLE_COURSE}/${courseId}`,
                          })
        } else{
             res = await apiConnector({
                             method : 'GET',
                             url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_DRAFT_COURSE}`,
                          })
        }
        
                          
            if(res.data.course){

                // structure full course
                const {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , status, instructor , _id} = res.data.course;
                const data = res.data.course.courseContent;
                const courseContent: object[] = [];
                const courseSection: object[] = [];

                data.forEach((c: any) => {
                  const { sectionName, totalLecture, subSection , _id } = c;
                  courseContent.push({ sectionName, totalLecture , _id });
                
                  subSection.forEach((sub: any) => {
                    const { subSectionName, description, duration, videoUrl ,_id } = sub;
                    courseSection.push({ subSectionName, description, duration, videoUrl , _id });
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


export const fetchSingleCourse = async (courseId? : any): Promise<any> => {
    try {
        console.log("inside fetch full course")
        let res
        if(courseId){
             res = await apiConnector({
            method: 'GET',
            url: `${BASE_URL}${COURSE_API_ENDPOINT.GET_SINGLE_COURSE}/${courseId}`,
            });
        } else{
             res = await apiConnector({
            method: 'GET',
            url: `${BASE_URL}${COURSE_API_ENDPOINT.GET_DRAFT_COURSE}`,
            });
        }

        if (res.data.course) {
            const {
                courseName,
                courseDesc,
                whatYouWillLearn,
                totalSum,
                TotalNumberRated,
                price,
                thumbnail,
                category,
                status,
                instructor,
                totalLength,
                _id,
            } = res.data.course;

            const data = res.data.course.courseContent;
            const courseContent: any[] = [];

            data.forEach((c: any) => {
                const { sectionName, totalLecture, subSection, _id } = c;

                // Embed subSection directly inside section
                courseContent.push({
                    _id,
                    sectionName,
                    totalLecture,
                    subSection, // keep array of subsections here
                });
            });

            const fullCourse = {
                AboutCourse: {
                    courseName,
                    courseDesc,
                    whatYouWillLearn,
                    totalSum,
                    TotalNumberRated,
                    price,
                    thumbnail,
                    category,
                    status,
                    instructor,
                    totalLength,
                    _id,
                },
                courseContent, // with subsections embedded
            };

            return fullCourse;
        }

        return null;
    } catch (err: any) {
        console.error(err);
        const message = err?.response?.data?.message || err.message;
        throw new Error(message);
    }
};



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

// export const instructorSingleCourse = async(dispatch : any , courseId:any) : Promise<any> => {
    
//     const toastId = toast.loading("Loading...");
//     dispatch(setLoading(true));

//     try{
//         const res = await apiConnector({
//                              method : 'GET',
//                              url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_SINGLE_COURSE}/${courseId}`,
//                           })
                          
//             if(res.data.course){

//                 // structure full course
//                 const {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , status, instructor , _id} = res.data.course;
//                 const data = res.data.course.courseContent;
//                 const courseContent: object[] = [];
//                 const courseSection: object[] = [];

//                 data.forEach((c: any) => {
//                   const { sectionName, totalLecture, subSection , _id } = c;
//                   courseContent.push({ sectionName, totalLecture , _id });
                
//                   subSection.forEach((sub: any) => {
//                     const { subSectionName, description, duration, videoUrl ,_id } = sub;
//                     courseSection.push({ subSectionName, description, duration, videoUrl , _id });
//                   });
//                 });
        
//                 const fullCourse = {
//                     AboutCourse : {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , status , instructor , _id},
//                     courseContent : courseContent,
//                     courseSection : courseSection
//                 }

//                 dispatch(setFullCourse(fullCourse));
//                 toast.success("Success!", { id: toastId });
//                 dispatch(setLoading(false));

//                  // ✅ return here
//                  return fullCourse;
//             }            
        
//              dispatch(setLoading(false));
//              toast.success("Success!", { id: toastId });
//              return null;

//     } catch(err : any){
//              const {message} = err.response.data
//              toast.error(`${message}` , {id : toastId});
//              console.log(err);
//       }
// }


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

export const createSection = async(dispatch : any , sectionName : string , courseId : any) => {

    const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          
    try{
        const createCourseSection = await apiConnector({
                                                  method : 'POST',
                                                  url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.CREATE_SECTION}`,
                                                  bodyData : {sectionName , courseId}
        })

        console.log(createCourseSection.data);
        if(createCourseSection.data){
                toast.success("Success!", { id: toastId });
                dispatch(setLoading(false));
        }

    } catch(err : any){
        const {message} = err.response.data
             toast.error(`${message}` , {id : toastId});
             console.log(err);
    }
}

export const createSubSection = async(dispatch : any , formData : subSectionData ) => {
    console.log("Inside create sub section func. -> " , formData)

    const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          
    try{
        const createCourseSubSection = await apiConnector({
                                                  method : 'POST',
                                                  url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.CREATE_SUBSECTION}`,
                                                  bodyData : formData
        })

        console.log(createCourseSubSection.data);
        if(createCourseSubSection.data){
                toast.success("Success!", { id: toastId});
                dispatch(setLoading(false));
                return true;
        }

    } catch(err : any){
        const {message} = err.response.data
             toast.error(`${message}` , {id : toastId});
             console.log(err);
    }
}

export const publishDraftCourse = async(dispatch : any , navigate : any , token : any) => {

    const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          
    try{
        const pubslishFullCourse = await apiConnector({
                                                  method : 'PATCH',
                                                  url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.PUBLISH_FULLCOURSE}`,
                                                  headers : {'token': `${token}`}
                                    })

        console.log(pubslishFullCourse.data);
        if(pubslishFullCourse.data){
                toast.success("Success!", { id: toastId});
                dispatch(setLoading(false));
                navigate('/dashboard/mycourse');
        }

    } catch(err : any){
        const {message} = err.response.data
             toast.error(`${message}` , {id : toastId});
             console.log(err);
    }
}

export const getInstructorCourses = async(dispatch : any , token : any) => {

    const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          
    try{
        const getCourses = await apiConnector({
                                                  method : 'GET',
                                                  url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.GET_ALLCOURSES}`,
                                                  headers : {'token': `${token}`}
                                    })

        // console.log(getCourses.data);
        if(getCourses.data){
                toast.success("Success!", { id: toastId});
                dispatch(setLoading(false));
                return getCourses.data.courses;
        }

    } catch(err : any){
        const {message} = err.response.data
             toast.error(`${message}` , {id : toastId});
             console.log(err);
    }
}

// export const getSubSection = async(dispatch : any , subSectionId : any ) => {

//     const toastId = toast.loading("Loading...");
//           dispatch(setLoading(true));
          
//     try{
//         const createCourseSubSection = await apiConnector({
//                                                   method : 'POST',
//                                                   url : `${BASE_URL}${INSTRUCTOR_API_ENDPOINT.CREATE_SUBSECTION}`,
//                                                   bodyData : formData
//          })

//         console.log(createCourseSubSection.data);
//         if(createCourseSubSection.data){
//                 toast.success("Success!", { id: toastId});
//                 dispatch(setLoading(false));
//         }

//     } catch(err : any){
//         const {message} = err.response.data
//              toast.error(`${message}` , {id : toastId});
//              console.log(err);
//     }
// }

