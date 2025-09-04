
import { BASE_URL , CATEGORY_API_ENDPOINT } from "../apiConfig";
import { apiConnector } from "../apiConnector";


export const fatchCategories = async() : Promise<any> => {
        try{
              const categoryPayload = {
                method : 'GET' as 'GET',
                url : `${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORIES}`,
              }

                  const categories =  await apiConnector(categoryPayload);
                  // console.log(categories)
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

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0m"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}