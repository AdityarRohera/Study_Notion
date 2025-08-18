// import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface ResetPasswordType {
    heading : string;
    desc : string;
    children? : any;
    buttonText? : string;
    submitHandler? : (e : any) => void;
}

export const ResetPasswordLayout = ({heading , desc , children , buttonText , submitHandler} : ResetPasswordType) => {


 return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0f14]">

      <div className="w-full max-w-md bg-[#0c0f14] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-2">{heading}</h2>
        <p className="text-gray-400 mb-6 text-sm">{desc}</p>

         <form onSubmit={submitHandler} className="space-y-5">
          {children}

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg 
                       hover:bg-yellow-300 transition"
          >
            {buttonText}
          </button>
        </form>

        <div className="mt-6">
          <Link to="/login" className="text-gray-400 hover:text-gray-200 text-sm flex items-center">
            ← Back to login
          </Link>
        </div>
      </div>

      <Toaster/>
    </div>
  );
}