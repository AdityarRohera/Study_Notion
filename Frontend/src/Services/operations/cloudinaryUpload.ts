
import { BASE_URL } from "../apiConfig";
import { apiConnector } from "../apiConnector";
import { UPLOAD_API_ENDPOINT } from "../apiConfig";


export const uploadImg = async(file : any) => {
    try{    
        console.log("Inside upload image func.")

        //  const formData = new FormData();
        //  formData.append('file', file[0]);

        //   console.log("file -> " , formData)

        if (!file || file.length === 0) {
            console.error("No file provided!");
            return { success: false, message: "No file provided" };
        }

          const formData = new FormData();
          formData.append('imageFile', file); // ✅ matches backend

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

export const uploadVideo = async(file : any) => {
    try{    
        console.log("Inside upload video func.");

        const formData = new FormData();
        formData.append('videoFile', file);
        console.log(formData);

        const res = await apiConnector({
                                        method : 'POST',
                                        url : `${BASE_URL}${UPLOAD_API_ENDPOINT.VIDEO_UPLOAD}`,
                                        bodyData : formData,
                                        headers : {'X-Requested-With': 'XMLHttpRequest' ,token: `${localStorage.getItem('token')}`}
                                      })

        console.log(res);

        if(res){
            return res.data.secure_url;
        }

    } catch(err : any){
        console.log("error comes in upload video")
        console.log(err);
    }
}

export const deleteImage = async(url : any) => {
    try{    
        console.log("Inside delete image func.");

        const res = await apiConnector({
                                        method : 'POST',
                                        url : `${BASE_URL}${UPLOAD_API_ENDPOINT.DELETE_IMAGE}`,
                                        bodyData : {imageURL : url},
                                        headers : {'X-Requested-With': 'XMLHttpRequest' ,token: `${localStorage.getItem('token')}`}
                                      })

        console.log(res);

        if(res){
            return res.data;
        }

    } catch(err : any){
        console.log("error comes in delete image")
        console.log(err);
    }
}

export const deleteVideo = async(url : any) => {
    try{    
         console.log("Inside video delete function")
        const res = await apiConnector({
                                        method : 'POST',
                                        url : `${BASE_URL}${UPLOAD_API_ENDPOINT.DELETE_VIDEO}`,
                                        bodyData : {videoURL : url},
                                        headers : {'X-Requested-With': 'XMLHttpRequest' ,token: `${localStorage.getItem('token')}`}
                                      })

        console.log(res);

        if(res){
            return res.data;
        }

    } catch(err : any){
        console.log("error comes in upload video")
        console.log(err);
    }
}