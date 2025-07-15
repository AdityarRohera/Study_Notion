// import React from 'react'


import InputField from "../commons/InputField"
import { useState } from "react";
import { signinValidation } from "../../Services/inputValidation";
import toast , {Toaster} from "react-hot-toast";
import { login } from "../../Services/operations/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginForm() {
    const[showPassword ,setShowPassword] = useState(false);
        const dispatch = useDispatch()
        const Navigate = useNavigate();

    const [loginData , setLoginData] = useState({email : '' , password : ''});

    const iconChangeHandler = () => {
        setShowPassword(prev => !prev)
    }

    const changeHandler = (e : any) => {
        const {value , name} = e.target;

        setLoginData((prev : any) => {
           return {
                ...prev,
                [name] : value
            }
        })
    }
    
    const submitHandler = async(e : any) => {
        e.preventDefault();
        console.log("signin form submited");

        const validation =  signinValidation(loginData);
        console.log(validation);

        if(validation == true){
          
          await login(
                      dispatch,
                      loginData,
                      Navigate
                     )             
        } else {
            toast.error(validation as string);
        }
    }

    // console.log(loginData);

  return (
    <div className="">

    <form onSubmit={submitHandler} className="flex flex-col gap-5" action="">
    {/* email input */}
      <label htmlFor="login-email">Email Address</label>
      <InputField
       type='text'
       placeholder='Enter email address'
       id='login-email'
       name="email"
       value={loginData.email ? loginData.email : ''}
       size="lg"
       changeHandler={changeHandler}
       />

    {/* password Input */}
      <label htmlFor="login-password">Password</label>
      <InputField
       type={`${showPassword ? 'text' : 'password'}`}
       placeholder="Enter Password"
       id='login-password'
       name="password"
       value={loginData.password ? loginData.password : ''}
       size="lg"
       iconChangeHandler={iconChangeHandler}
       changeHandler={changeHandler}
       passwordType={showPassword ? "text" : "password"} 
       />

      <button
          type="submit"
          className="w-[200px] border"
        >
          Sign In
      </button>

       <Toaster />

    </form>

    </div>
  )
}

export default LoginForm;
