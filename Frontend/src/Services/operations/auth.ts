
// import from react here
import { apiConnector } from "../apiConnector";
import toast from 'react-hot-toast';
import { setLoading, setUser } from "../../features/slices/authSlice";
import { BASE_URL } from "../apiConfig";
import { USER_API_ENDPOINT } from "../apiConfig";
// import { redirect } from "react-router-dom";


export const sendOTP = async(dispatch : any , email : string , Navigate : any) : Promise<void> => {
    try{

        // send OTP code
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        // api call
        const response = await apiConnector(
            { method : 'POST' ,
              url : `${BASE_URL}${USER_API_ENDPOINT.SEND_OTP}`,
              bodyData : {email},
              headers : {'X-Requested-With': 'XMLHttpRequest'}
            })
        console.log(response);

        if(response.data){
             toast.success("OTP Send On Email!", {
                id: toastId,
             });

           dispatch(setLoading(false));
           Navigate('/verify-otp');
        }

    } catch(err){
        console.log(err);
    }
}


export const signup = async(dispatch : any , {account_type , firstName , lastName , email , createPassword , otp} : any , Navigate : any) : Promise<any> => {
    try{    

         const toastId = toast.loading("Loading...")
         dispatch(setLoading(true));
         
         const response = await apiConnector(
            {method :'POST' ,
             url :`${BASE_URL}${USER_API_ENDPOINT.SIGNUP}`,
             bodyData : {account_type , firstName , lastName , email , password : createPassword , otp , contact_no : 999999999},
             headers : {'X-Requested-With': 'XMLHttpRequest'}
            });

         if(response.data){
             toast.success("Success!", {
                id: toastId,
             });

           dispatch(setLoading(false));
           Navigate('/login');
        }

    } catch(err) {
        console.log(err)
    }
}


export const login = async(dispatch : any , {email , password} : any , Navigate : any) : Promise<any> => {
    try{    

         const toastId = toast.loading("Loading...")
         dispatch(setLoading(true));
         
         const response = await apiConnector(
            {method :'POST' ,
             url :`${BASE_URL}${USER_API_ENDPOINT.LOGIN}`,
             bodyData : {email , password},
             headers : {'X-Requested-With': 'XMLHttpRequest'}
            });

         if(response.data){

            const {firstName , lastName , email , contact_no , account_type , _id} = response.data.user

            // set token to local storage
            const storedUser :any = JSON.stringify({firstName , lastName , email , contact_no , account_type , _id})
            localStorage.setItem('token' , response.data.token);
            localStorage.setItem('user' ,  storedUser);

            // set user details globaly
            dispatch(setUser(
                        {
                            user : {firstName , lastName , email , contact_no , account_type , _id},
                            token : response.data.token,
                            isAuthenticated : true,
                        }
                    ))

            toast.success("Success!", {
                id: toastId,
             });

           dispatch(setLoading(false));
            
            // Navigate to dashboard
           await setTimeout(() => {
             Navigate('/dashboard');
           } , 2000);
        }

    } catch(err) {
        console.log(err)
    }
}