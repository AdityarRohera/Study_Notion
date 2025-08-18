
import { BASE_URL , CATEGORY_API_ENDPOINT } from "../apiConfig";
import { apiConnector } from "../apiConnector";


export const fatchCategories = async() : Promise<any> => {
        try{
              const categoryPayload = {
                method : 'GET' as 'GET',
                url : `${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORIES}`,
              }

                  const categories =  await apiConnector(categoryPayload);
                  if(categories){
                    return categories.data.categories
                  }


        } catch(error : any){
           if (error.response) {
                console.error('Server Error:', error.response.data);
                } else if (error.request) {
                  console.error('Network Error:', error.request);
                } else {
                  console.error('Other Error:', error.message);
           }
        }
    }