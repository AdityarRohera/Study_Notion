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

function SignUpForm() {
    const[showPassword ,setShowPassword] = useState({createPassword : false , confirmPassword : false});
        const dispatch = useDispatch()
        const Navigate = useNavigate();

    const [signUpData , setSignUpData] = useState({account_type : 'Student' , firstName : '' , lastName : '' , email : '' , createPassword : '' , confirmPassword : '' , otp : ''});

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
    <div className="">

      <form onSubmit={submitHandler} className="flex flex-col gap-5" action="">
        {/* Account type */}
      <div className="flex gap-5 justify-center items-center border rounded-4xl w-[200px] h-[50px]">
        <button type="button" onClick={changeHandler} name="account_type" value={'Student'} >Student</button>
        <button type="button" onClick={changeHandler} name="account_type" value={'Instructor'}>Instructor</button>
      </div>

    {/* First name input */}
      <label htmlFor="signup-firstName">First Name *</label>
      <InputField
       type='text'
       placeholder='Enter first name'
       id='signup-firstName'
       name="firstName"
       value={signUpData.firstName ? signUpData.firstName : ''}
       size="md"
       changeHandler={changeHandler}
       />

    {/* Last name input */}
    <label htmlFor="signup-lastName">Last Name *</label>
      <InputField
       type='text'
       placeholder='Enter last name'
       id='signup-lastName'
       name="lastName"
       value={signUpData.lastName ? signUpData.lastName : ''}
       size="md"
       changeHandler={changeHandler}
       />

    {/* email input */}
      <label htmlFor="login-email">Email Address</label>
      <InputField
       type='text'
       placeholder='Enter email address'
       id='login-email'
       name="email"
       value={signUpData.email ? signUpData.email : ''}
       size="lg"
       changeHandler={changeHandler}
       />

    {/* create password Input */}
      <label htmlFor="SignUp-CreatePassword">Password</label>
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

    {/* confirm password Input */}
      <label htmlFor="SignUp-ConfirmPassword">Password</label>
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
       
      <button
          type="submit"
          className="w-[200px] border"
        >
          Create Account
      </button>

       <Toaster />

      </form>

    </div>
  )
}

export default SignUpForm;