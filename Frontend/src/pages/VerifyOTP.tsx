import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { ShieldCheck } from "lucide-react";

import type { RootState } from "../Services/strore";
import { sendOTP, signup } from "../Services/operations/auth";
import { Spinner } from "../components/commons/Loading";

function VerifyOTP() {
  const Navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const verifyAndSignUpHandler = async (e: any) => {
    e.preventDefault();

    const {
      account_type,
      firstName,
      lastName,
      email,
      contact_no,
      createPassword,
      confirmPassword,
    } = user;

    try {
      setSubmitting(true);
      await signup(
        dispatch,
        {
          account_type,
          firstName,
          lastName,
          email,
          contact_no,
          createPassword,
          confirmPassword,
          otp,
        },
        Navigate
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resendHandler = async () => {
    if (!user?.email) return;
    await sendOTP(dispatch, user.email, Navigate);
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-ink-950 px-4 py-14">
      <div className="sn-aurora" aria-hidden="true" />

      <div className="sn-card relative w-full max-w-lg animate-fade-up p-7 text-center sm:p-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Verify your email
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-ink-200">
            {user?.email ?? "your email address"}
          </span>
          . Enter it below to finish creating your account.
        </p>

        <form
          onSubmit={verifyAndSignUpHandler}
          className="mt-9 flex flex-col items-center gap-8"
        >
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus={true}
            renderSeparator={<span className="w-1.5 sm:w-2.5" />}
            renderInput={(props) => (
              <input
                {...props}
                inputMode="numeric"
                aria-label="Verification code digit"
                className="!h-12 !w-10 rounded-xl border border-ink-700 bg-ink-850 text-center font-display text-xl font-bold text-white transition-all duration-200 hover:border-ink-600 focus:border-brand-400 focus:outline-none focus:ring-[3px] focus:ring-brand-400/20 sm:!h-14 sm:!w-12 sm:text-2xl"
              />
            )}
          />

          <button
            type="submit"
            disabled={submitting || otp.length < 6}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-400 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          >
            {submitting ? (
              <>
                <Spinner className="h-4 w-4 text-ink-950" />
                Verifying…
              </>
            ) : (
              "Verify and create account"
            )}
          </button>
        </form>

        <div className="mt-7 flex flex-col items-center gap-2 border-t border-ink-800 pt-6 text-sm">
          <p className="text-ink-400">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={resendHandler}
              className="font-semibold text-brand-300 transition-colors hover:text-brand-200"
            >
              Resend
            </button>
          </p>
          <Link
            to="/signup"
            className="text-ink-500 transition-colors hover:text-ink-300"
          >
            Wrong email? Go back to sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
