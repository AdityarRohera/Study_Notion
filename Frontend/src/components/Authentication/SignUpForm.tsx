// import React from 'react'
import { useState } from "react";
import InputField from "../commons/InputField";
// import { setUser } from "../../features/slices/authSlice";
import { sendOTP} from "../../Services/operations/auth";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
// import { type RootState } from "../../Services/strore";
// import { type AppDispatch } from "../../Services/strore";
import { setUser } from "../../features/slices/authSlice";
import { signupValidation } from "../../Services/inputValidation";
import toast, { Toaster } from "react-hot-toast";

function SignUpForm(role : any) {
    const[showPassword ,setShowPassword] = useState({createPassword : false , confirmPassword : false});
        const dispatch = useDispatch()
        const Navigate = useNavigate();

    const [signUpData , setSignUpData] = useState({account_type : `${role}` , firstName : '' , lastName : '' , email : '' , createPassword : '' , confirmPassword : '' , otp : ''});

    const iconChangeHandler = (e : any) => {
      const {name} = e.currentTarget;
        setShowPassword((prev : any) => {
          return {
            ...prev ,
            [name] : !prev[name]
          }
        })
    }

    const changeHandler = (e : any) => {
        const {value , name} = e.target;

        setSignUpData((prev : any) => {
           return {
                ...prev,
                [name] : value
            }
        })
    }

    // form submit handler
    const submitHandler = async(e : any) => {
        e.preventDefault();
        console.log("signup form submited");

        // input validation
        const validation =  signupValidation(signUpData);
        console.log(validation);

        if(validation == true){
          // set user values
          console.log('signup data -> ' , signUpData);
          dispatch(setUser({user: signUpData,
                           token: null,
                           isAuthenticated: false // or true if already authenticated));
                          }))
        // // send otp
        await sendOTP(dispatch , signUpData.email , Navigate);

        } else {
            toast.error(validation as string);
        }
    }


    // console.log(signUpData);

  return (
   <div className="w-full">
  <form onSubmit={submitHandler} className="flex flex-col gap-6">

    {/* Account type (optional toggle buttons) */}
    {/* <div className="flex gap-5 justify-center items-center border rounded-4xl w-[200px] h-[50px]">
      <button type="button" onClick={changeHandler} name="account_type" value="Student">Student</button>
      <button type="button" onClick={changeHandler} name="account_type" value="Instructor">Instructor</button>
    </div> */}

    {/* First + Last Name */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label htmlFor="signup-firstName" className="block text-sm mb-1">First Name <span className="text-red-500">*</span></label>
        <InputField
          type="text"
          placeholder="Enter first name"
          id="signup-firstName"
          name="firstName"
          value={signUpData.firstName}
          size="md"
          changeHandler={changeHandler}
        />
      </div>
      <div>
        <label htmlFor="signup-lastName" className="block text-sm mb-1">Last Name <span className="text-red-500">*</span></label>
        <InputField
          type="text"
          placeholder="Enter last name"
          id="signup-lastName"
          name="lastName"
          value={signUpData.lastName}
          size="md"
          changeHandler={changeHandler}
        />
      </div>
    </div>

    {/* Email */}
    <div>
      <label htmlFor="signup-email" className="block text-sm mb-1">Email Address <span className="text-red-500">*</span></label>
      <InputField
        type="text"
        placeholder="Enter email address"
        id="signup-email"
        name="email"
        value={signUpData.email}
        size="lg"
        changeHandler={changeHandler}
      />
    </div>

    {/* Phone Number */}
    {/* <div>
      <label htmlFor="signup-phone" className="block text-sm mb-1">Phone Number <span className="text-red-500">*</span></label>
      <div className="flex gap-2">
        <select className="bg-gray-800 text-gray-300 rounded-md px-2">
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
        <InputField
          type="text"
          placeholder="12345 67890"
          id="signup-phone"
          name="phone"
          value={signUpData.phone}
          size="lg"
          changeHandler={changeHandler}
        />
      </div>
    </div> */}

    {/* Password + Confirm Password */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label htmlFor="signup-password" className="block text-sm mb-1">Create Password <span className="text-red-500">*</span></label>
         <InputField
            type={`${showPassword.createPassword ? 'text' : 'password'}`}
            placeholder="Enter Password"
            id='SignUp-CreatePassword'
            name="createPassword"
            value={signUpData.createPassword ? signUpData.createPassword : ''}
            size="md"
            iconChangeHandler={iconChangeHandler}
            changeHandler={changeHandler}
            passwordType={showPassword.createPassword ? "text" : "password"} 
        />
      </div>
      <div>
        <label htmlFor="signup-confirmPassword" className="block text-sm mb-1">Confirm Password <span className="text-red-500">*</span></label>
        <InputField
        type={`${showPassword.confirmPassword ? 'text' : 'password'}`}
        placeholder="Confirm Password"
        id='SignUp-ConfirmPassword'
        name="confirmPassword"
        value={signUpData.confirmPassword ? signUpData.confirmPassword : ''}
        size="md"
        iconChangeHandler={iconChangeHandler}
        changeHandler={changeHandler}
        passwordType={showPassword.confirmPassword ? "text" : "password"} 
       />
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-yellow-400 text-black font-semibold rounded-md py-3 mt-4 hover:bg-yellow-500 transition"
    >
      Create Account
    </button>

    <Toaster />
  </form>
</div>

  )
}

export default SignUpForm;