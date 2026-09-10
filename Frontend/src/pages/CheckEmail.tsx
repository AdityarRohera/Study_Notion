import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MailCheck } from "lucide-react";

import { ResetPasswordLayout } from "../components/Authentication/ResetPasswordLayout";
import { resetPassword } from "../Services/operations/auth";

function CheckEmail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { state } = location;

  const email = typeof state === "string" ? state : state?.email;

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await resetPassword(dispatch, state);
  };

  return (
    <ResetPasswordLayout
      heading="Check your inbox"
      desc={
        email
          ? `We sent a password reset link to ${email}. Open it on this device to continue.`
          : "We sent you a password reset link. Open it on this device to continue."
      }
      buttonText="Resend email"
      icon={<MailCheck className="h-6 w-6" />}
      submitHandler={submitHandler}
      footer={
        <p className="mt-5 rounded-xl border border-ink-800 bg-ink-850 px-4 py-3 text-xs leading-relaxed text-ink-400">
          Didn't get it? Check your spam folder, or wait a minute before
          resending — delivery can take a moment.
        </p>
      }
    />
  );
}

export default CheckEmail;
