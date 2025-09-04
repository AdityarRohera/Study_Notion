

import toast from "react-hot-toast";
import { BASE_URL , COURSE_API_ENDPOINT, ENROLLED_COURSE_API_ENDPOINT } from "../apiConfig";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../features/slices/loadingSlice";



export const getEnrolledCourses = async(dispatch : any) => {
        console.log("Inside getting enrolled course function")
        const toastId = toast.loading("Loading...");
         dispatch(setLoading(true));

    try{

             const res = await apiConnector({
                             method : 'GET',
                             url : `${BASE_URL}${ENROLLED_COURSE_API_ENDPOINT.ENROLLED_COURSES}`,
                             headers : {'X-Requested-With': 'XMLHttpRequest' ,token: `${localStorage.getItem('token')}`}
                          })

            // console.log(res);
            if(res.data){
                return res.data;
            }

    }catch(err : any){
         const {message} = err.response.data
         toast.error(`${message}` , {id : toastId});
         console.log(err);
    }
}

export const getSubSection = async(sectionId : any) => {
        console.log("Inside getting sub-section course function")
        // const toastId = toast.loading("Loading...");
        //  dispatch(setLoading(true));

    try{

             const res = await apiConnector({
                             method : 'GET',
                             url : `${BASE_URL}${COURSE_API_ENDPOINT.GET_COURSE_SECTION}/${sectionId}`,
                            //  headers : {'X-Requested-With': 'XMLHttpRequest' ,token: `${localStorage.getItem('token')}`}
                          })

            // console.log(res);
            if(res.data){
                return res.data;
            }

    }catch(err : any){
        //  const {message} = err.response.data
        //  toast.error(`${message}` , {id : toastId});
         console.log(err);
    }
}