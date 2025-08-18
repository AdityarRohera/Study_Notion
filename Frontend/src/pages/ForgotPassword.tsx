import { useState } from "react";
import { ResetPasswordLayout } from "../components/Authentication/ResetPasswordLayout";
import { resetPassword } from "../Services/operations/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e : any) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    await resetPassword(dispatch , {email});
    navigate('/check-email' , {state : email});
  };

  return (
     <ResetPasswordLayout
      heading="Reset your password"
      desc="Have no fear. We'll email you instructions to reset your password. 
                If you don’t have access to your email we can try account recovery"
      buttonText="Reset Password"
      submitHandler={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="myemailaddress@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-[#1a1f29] text-gray-200 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    </ResetPasswordLayout>
  );
}

export default ForgotPassword;