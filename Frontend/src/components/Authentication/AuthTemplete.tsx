// import React from 'react'
// import Heading from "../commons/Heading"
import { useState } from "react";
import Button from "../commons/Button";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
// import { Link } from "react-router-dom";

function AuthTemplete({ heading, desc, imageSrc, formType }: any) {
  const[role , setRole] = useState('Instructor');

  return (
    <div className="flex w-[100%] min-h-[92vh] mx-auto items-center justify-between  shadow-lg bg-[#0D1117] p-40">
      
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center p-5 max-w-[40%]">
        <h1 className="text-4xl font-bold mb-3">{heading}</h1>
        <p className="text-gray-400 mb-8 text-lg leading-relaxed">{desc}</p>

        {/* Toggle Buttons */}
          <div className="flex mb-6 gap-4">
          <Button
            variant="secondary"
            size="lg"
            text="Student"
            className={`rounded-full text-[22px] font-medium ${role === "Student" ? "bg-yellow-400 text-black" : ""}`}
            onClick={() => setRole("Student")}
          />
          <Button
            variant="secondary"
            size="lg"
            text="Instructor"
            className={`rounded-full text-[22px] font-medium ${role === "Instructor" ? "bg-yellow-400 text-black" : ""}`}
            onClick={() => setRole("Instructor")}
          />
        </div>

        {/* Render Form */}
         {/* Render Form */}
        {formType === "Login" ? (
          <LoginForm role={role} />
        ) : (
          <SignUpForm role={role} />
        )}

         {/* <div className="absolute text-white">
          <Link to={'/update-password'}>Forgot Password</Link>
          </div> */}

        {/* Forgot password */}
        {/* {formType === "Login" && (
          <div className="text-right mt-3">
            <Link to={'/update-password'}>Forgot Password</Link>
          </div>
        )} */}

        {/* Action button */}
        {/* <button className="w-full bg-yellow-400 text-black font-semibold rounded-md py-3 mt-6 hover:bg-yellow-500 transition">
          {formType === "Login" ? "Sign in" : "Create Account"}
        </button> */}
      </div>

      {/* Right side - Image */}
      <div className="w-[500px] h-[500px] flex-shrink-0 rounded-xl overflow-hidden shadow-md">
        <img
          src={imageSrc}
          alt="Auth Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default AuthTemplete;


