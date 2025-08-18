
import { BASE_URL , INSTRUCTOR_API_ENDPOINT } from "../apiConfig";
import { apiConnector } from "../apiConnector";

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