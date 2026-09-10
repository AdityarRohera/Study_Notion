import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { ResetPasswordLayout } from "../components/Authentication/ResetPasswordLayout";

function ResetCompleted() {
  const navigate = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <ResetPasswordLayout
      heading="Password reset complete"
      desc="Your password has been updated. For your security, you have been signed out of any other active sessions."
      buttonText="Return to login"
      icon={<CheckCircle2 className="h-6 w-6" />}
      submitHandler={submitHandler}
    />
  );
}

export default ResetCompleted;
