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
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string>("");

  console.log("Inside Component -> ", user);

  const verifyAndSignUpHandler = async (e: any) => {
    e.preventDefault();
    console.log("Inside verify route");

    const {account_type, firstName, lastName, email ,contact_no , createPassword, confirmPassword} = user;

    console.log(account_type,firstName,lastName,email, contact_no ,confirmPassword,confirmPassword);

    await signup(
      dispatch,
      {
        account_type,
        firstName,
        lastName,
        email,
        contact_no,
        createPassword,
        confirmPassword,
        otp,
      },
      Navigate
    );
  };

  return (
  <div className="bg-gray-900 text-white min-h-[100vh] flex items-center justify-center">
    <div className="bg-black/40 p-10 rounded-2xl shadow-xl w-[90%] md:w-[40%] text-center">
      <h1 className="text-4xl font-bold mb-4">Verify OTP</h1>
      <p className="text-gray-300 mb-8">
        A verification code has been sent to your email. <br />
        Enter the code below:
      </p>

      <form onSubmit={verifyAndSignUpHandler} className="flex flex-col justify-center items-center gap-8">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus={true}
          renderSeparator={<span className="text-yellow-400 text-2xl"> - </span>}
          renderInput={(props) => (
            <input
              {...props}
              className="w-16 h-16 mx-2 text-3xl font-bold rounded-lg border-2 border-gray-600 
                         bg-gray-800 text-white text-center 
                         hover:border-yellow-400 hover:scale-105 
                         focus:border-yellow-400 focus:outline-none 
                         transition-all duration-200 ease-in-out"
            />
          )}
        />

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 
                     rounded-lg text-xl shadow-md hover:shadow-yellow-400/40 
                     transition duration-300"
        >
          Verify OTP
        </button>
        <Toaster />
      </form>
    </div>
  </div>
);

}

export default VerifyOTP;