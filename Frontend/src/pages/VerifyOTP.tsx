// import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import type { RootState } from '../Services/strore';
import { signup } from '../Services/operations/auth';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function VerifyOTP() {
     const Navigate = useNavigate();
     const {user} = useSelector((state : RootState) => state.auth);
     const dispatch = useDispatch();
     const [otp , setOtp] = useState<string>('');
     console.log("Inside Component -> " , user);

     const verifyAndSignUpHandler = async(e : any) => {
        e.preventDefault();
        console.log("Inside verify route")
        const {account_type, firstName , lastName , email , createPassword , confirmPassword} = user;
        console.log(account_type , firstName , lastName , email , confirmPassword , confirmPassword);

        await signup(
                      dispatch ,
                      {account_type , firstName , lastName , email , createPassword , confirmPassword , otp},
                      Navigate
                    )
     }

  return (
    <div className='bg-gray-900 text-white min-h-[100vh] p-3'>
     
     <div className='flex flex-col gap-4'>
         <h1>VerifyOTP Route</h1>
         <p>A verification code has been sent to you. Enter the code below</p>
     </div>

      <form onSubmit={verifyAndSignUpHandler} className='text-2xl'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props}/>}
        />
        <button className='border' type='submit'>Verify OTP</button>
         <Toaster />
      </form>
    </div>
  )
}

export default VerifyOTP;
