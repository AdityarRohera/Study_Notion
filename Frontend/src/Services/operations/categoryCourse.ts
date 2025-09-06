
import { BASE_URL, COURSE_API_ENDPOINT } from "../apiConfig";
import { CATEGORY_API_ENDPOINT } from "../apiConfig";
// import { setIsLoading } from "../../features/slices/categorySlice";
import { setLoading } from "../../features/slices/loadingSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setCategoryCourses } from "../../features/slices/categorySlice";
import { setFullCourse } from "../../features/slices/courseSlice";

export const getCategoryCourses = async({dispatch , categoryId} : any) => {

    console.log("Inside get category courses" , categoryId);
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

    try{

        // call api to get category
        const response = await apiConnector(
                    { method : 'GET' ,
                      url : `${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORY_COURSES}`,
                      headers : {'X-Requested-With': 'XMLHttpRequest'},
                      params : {categoryId : categoryId}
                    })

        console.log(response);

        const {categoryCourses , someMoreCourses , topSellingCourses} = response.data.data;

        // now dispatch data for global access
         dispatch(setCategoryCourses({categoryCourses , someMoreCourses , topSellingCourses}));
         dispatch(setLoading(false));

        toast.success("Success", {
                id: toastId,
        });


    } catch(err) {
        console.log(err);
    }
}

export const getFullCourse = async({dispatch , id} : any) => {
    console.log("Inside get single courses" , id);

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

    try{

        // call api to get category
        const response = await apiConnector(
                    { method : 'GET' ,
                      url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_SINGLE_COURSE}/${id}`,
                      headers : {'X-Requested-With': 'XMLHttpRequest'},
                    })

        console.log(response.data);

        // structure full course
        const {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , instructor , _id} = response.data.course;
        const data = response.data.course.courseContent;
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

        // const {subSectionName , description ,duration , videoUrl} = response.data.courseContent.subSection;
        
        const fullCourse = {
            AboutCourse : {courseName , courseDesc , whatYouWillLearn , totalSum , TotalNumberRated , price , thumbnail , category , instructor , _id},
            courseContent : courseContent,
            courseSection : courseSection
        }

        // now dispatch data for global access
        console.log("Setting")
         dispatch(setFullCourse(fullCourse));
         console.log("Setting done inside full course")
         dispatch(setLoading(false));

        toast.success("Success", {
                id: toastId,
        });


    } catch(err) {
        console.log(err);
    }
}