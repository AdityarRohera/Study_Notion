
import { BASE_URL } from "../apiConfig";
import { apiConnector } from "../apiConnector";
import { UPLOAD_API_ENDPOINT } from "../apiConfig";


export const uploadImg = async(e : any , file : any) => {
    try{    
        console.log("Inside upload image func.")
          e.preventDefault();

        //  const formData = new FormData();
        //  formData.append('file', file[0]);

        //   console.log("file -> " , formData)


        const formData = new FormData();
        formData.append('imageFile', file[0]);
        console.log(formData);

        const res = await apiConnector({
                                        method : 'POST',
                                        url : `${BASE_URL}${UPLOAD_API_ENDPOINT.IMAGE_UPLOAD}`,
                                        bodyData : formData,
                                        headers : {'X-Requested-With': 'XMLHttpRequest' ,token: `${localStorage.getItem('token')}`}
                                      })

        console.log(res);

        if(res){
            return res.data.secure_url;
        }

    } catch(err : any){
        console.log("error comes in upload img")
        console.log(err);
    }
}