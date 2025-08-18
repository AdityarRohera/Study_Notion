// import React from 'react'
import { useState } from 'react';
import { ResetPasswordLayout } from '../components/Authentication/ResetPasswordLayout'
import InputField from '../components/commons/InputField';
import { useParams } from 'react-router-dom';
import { verifyResetPassword } from '../Services/operations/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {

     const [newPassword, setNewPassword] = useState<string | null>("");
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const param = useParams();


    const submitHandler = (e : any) => {
        console.log("inside click")
       e.preventDefault();
       verifyResetPassword(dispatch , navigate , {password:newPassword , token:param.token})
    };


  return (
    <div>
           <ResetPasswordLayout
            heading="Reset your password"
            desc="Have no fear. We'll email you instructions to reset your password. 
                      If you don’t have access to your email we can try account recovery"
            buttonText="Reset Password"
            submitHandler={submitHandler}
            >
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <InputField type="text" size='xl' placeholder='Enter New Password' value={newPassword ? newPassword : ''} changeHandler={(e:any) => setNewPassword(e.target.value)}/>
            </div>
          </ResetPasswordLayout>
    </div>
  )
}

export default UpdatePassword
