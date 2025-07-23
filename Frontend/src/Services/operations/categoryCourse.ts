
import { BASE_URL, COURSE_API_ENDPOINT } from "../apiConfig";
import { CATEGORY_API_ENDPOINT } from "../apiConfig";
import { setIsLoading } from "../../features/slices/categorySlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setCategoryCourses } from "../../features/slices/categorySlice";

export const getCategoryCourses = async({dispatch , categoryId} : any) => {

    console.log("Inside get category courses" , categoryId);
        const toastId = toast.loading("Loading...");
        dispatch(setIsLoading(true));

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
         dispatch(setIsLoading(false));

        toast.success("Success", {
                id: toastId,
        });


    } catch(err) {
        console.log(err);
    }
}

export const getFullCourse = async({dispatch , _id} : any) => {
    console.log("Inside get single courses" , _id);

        const toastId = toast.loading("Loading...");
        // dispatch(setIsLoading(true));

    try{

        // call api to get category
        const response = await apiConnector(
                    { method : 'GET' ,
                      url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_SINGLE_COURSE}/${_id}`,
                      headers : {'X-Requested-With': 'XMLHttpRequest'},
                    })

        console.log(response.data);

        // now dispatch data for global access
        //  dispatch(setCategoryCourses({categoryCourses , someMoreCourses , topSellingCourses}));
         dispatch(setIsLoading(false));

        toast.success("Success", {
                id: toastId,
        });


    } catch(err) {
        console.log(err);
    }
}