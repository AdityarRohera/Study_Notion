// import React from 'react'
import { useState } from 'react';
import { ResetPasswordLayout } from '../components/Authentication/ResetPasswordLayout'
import InputField from '../components/commons/InputField';
import { useParams } from 'react-router-dom';
import { verifyResetPassword } from '../Services/operations/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast , {Toaster} from 'react-hot-toast';

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState({
    createPassword: false,
    confirmPassword: false,
  });
  const [newPassword, setNewPassword] = useState({
    createPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const iconChangeHandler = (e: any) => {
    const { name } = e.currentTarget;
    setShowPassword((prev : any) => ({
      ...prev,
      [name] : !prev[name]
    }));
  };

  const changeHandler = (e: any) => {
    const { value, name } = e.target;
    setNewPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    if(!newPassword.createPassword){
        toast.error('New-password required')
        return
    } else if(!newPassword.confirmPassword){
      toast.error("Confirm-password required");
      return
    } else if(newPassword.createPassword !== newPassword.confirmPassword){
        toast.error("Password mis-match")
        return;
    }

      console.log("start reset");

      verifyResetPassword(dispatch, navigate, {
        password: newPassword.confirmPassword,
        token: param.token,
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-lg">
        <ResetPasswordLayout
          heading="Reset your password 🔒"
          desc="Enter your new password below. Make sure it’s strong and easy for you to remember."
          buttonText="Reset Password"
          submitHandler={submitHandler}
        >
          {/* Password + Confirm Password */}
          <div
            className="flex flex-col gap-6 text-white text-lg"
          >
            {/* Create Password */}
            <div>
              <label
                htmlFor="createPassword"
                className="block mb-2 text-gray-300 font-medium"
              >
                New Password <span className="text-red-500">*</span>
              </label>
              <InputField
                type={showPassword.createPassword ? "text" : "password"}
                placeholder="Enter new password"
                id="createPassword"
                name="createPassword"
                value={newPassword.createPassword}
                size="xl"
                iconChangeHandler={iconChangeHandler}
                changeHandler={changeHandler}
                passwordType={showPassword.createPassword ? "text" : "password"}
                // className="rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-gray-300 font-medium"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <InputField
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                id="confirmPassword"
                name="confirmPassword"
                value={newPassword.confirmPassword}
                size="xl"
                iconChangeHandler={iconChangeHandler}
                changeHandler={changeHandler}
                passwordType={showPassword.confirmPassword ? "text" : "password"}
                // className="rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 transition"
              />
            </div>
          </div>
        </ResetPasswordLayout>
      </div>

      <Toaster/>
    </div>
  );
}

export default UpdatePassword;
