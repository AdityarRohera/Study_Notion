import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";

import { ResetPasswordLayout } from "../components/Authentication/ResetPasswordLayout";
import InputField from "../components/commons/InputField";
import { resetPassword } from "../Services/operations/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await resetPassword(dispatch, { email });
    navigate("/check-email", { state: email });
  };

  return (
    <ResetPasswordLayout
      heading="Reset your password"
      desc="Enter the email you signed up with and we'll send you a secure link to set a new password. The link stays valid for 15 minutes."
      buttonText="Send reset link"
      icon={<KeyRound className="h-6 w-6" />}
      submitHandler={handleSubmit}
    >
      <div>
        <label htmlFor="reset-email" className="sn-label">
          Email address <span className="text-danger-400">*</span>
        </label>
        <InputField
          type="email"
          id="reset-email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          size="xl"
          required
          changeHandler={(e) => setEmail(e.target.value)}
        />
      </div>
    </ResetPasswordLayout>
  );
}

export default ForgotPassword;
