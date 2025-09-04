// import React from 'react'


import InputField from "../commons/InputField"
import { useState } from "react";
import { signinValidation } from "../../Services/inputValidation";
import toast , {Toaster} from "react-hot-toast";
import { login } from "../../Services/operations/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

function LoginForm(role : any) {
    const[showPassword ,setShowPassword] = useState(false);
        const dispatch = useDispatch()
        const Navigate = useNavigate();

    const [loginData , setLoginData] = useState({account_type : `${role}` , email : '' , password : ''});

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
    <div className="w-full">
  <form onSubmit={submitHandler} className="flex flex-col gap-8">

    {/* Email */}
    <div>
      <label htmlFor="login-email" className="block text-sm mb-1">
        Email Address <span className="text-red-500">*</span>
      </label>
      <InputField
        type="text"
        placeholder="Enter email address"
        id="login-email"
        name="email"
        value={loginData.email || ""}
        size="lg"
        changeHandler={changeHandler}
      />
    </div>

    {/* Password */}
    <div>
      <label htmlFor="login-password" className="block text-sm mb-1">
        Password <span className="text-red-500">*</span>
      </label>
      <InputField
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        id="login-password"
        name="password"
        value={loginData.password || ""}
        size="lg"
        iconChangeHandler={iconChangeHandler}
        changeHandler={changeHandler}
        passwordType={showPassword ? "text" : "password"}
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-yellow-400 text-black font-semibold rounded-md py-3 hover:bg-yellow-500 transition"
    >
      Sign In
    </button>

    <Toaster />
  </form>
</div>

  )
}

export default LoginForm;
