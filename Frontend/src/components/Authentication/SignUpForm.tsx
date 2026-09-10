import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import InputField from "../commons/InputField";
import { Spinner } from "../commons/Loading";
import { sendOTP } from "../../Services/operations/auth";
import { setUser } from "../../features/slices/authSlice";
import { signupValidation } from "../../Services/inputValidation";

function SignUpForm({ role }: any) {
  const [showPassword, setShowPassword] = useState({
    createPassword: false,
    confirmPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    account_type: role,
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    contact_no: "",
    createPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const iconChangeHandler = (e: any) => {
    const { name } = e.currentTarget;
    setShowPassword((prev: any) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  const changeHandler = (e: any) => {
    const { value, name } = e.target;

    setSignUpData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // form submit handler
  const submitHandler = async (e: any) => {
    e.preventDefault();

    // signup data payload
    const payload = {
      ...signUpData,
      contact_no: `${signUpData.countryCode}${signUpData.contact_no}`, // store as string
    };

    // input validation
    const validation = signupValidation(payload);

    if (validation == true) {
      try {
        setSubmitting(true);
        // set user values
        dispatch(
          setUser({
            user: payload,
            token: null,
            isAuthenticated: false,
          })
        );
        // send otp
        await sendOTP(dispatch, signUpData.email, Navigate);
      } finally {
        setSubmitting(false);
      }
    } else {
      toast.error(validation as string);
    }
  };

  useEffect(() => {
    setSignUpData((prev) => ({ ...prev, account_type: role }));
  }, [role]);

  return (
    <form onSubmit={submitHandler} className="flex w-full flex-col gap-5">
      {/* First + Last name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="signup-firstName" className="sn-label">
            First name <span className="text-danger-400">*</span>
          </label>
          <InputField
            type="text"
            placeholder="Enter first name"
            id="signup-firstName"
            name="firstName"
            autoComplete="given-name"
            value={signUpData.firstName}
            size="xl"
            changeHandler={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="signup-lastName" className="sn-label">
            Last name <span className="text-danger-400">*</span>
          </label>
          <InputField
            type="text"
            placeholder="Enter last name"
            id="signup-lastName"
            name="lastName"
            autoComplete="family-name"
            value={signUpData.lastName}
            size="xl"
            changeHandler={changeHandler}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="signup-email" className="sn-label">
          Email address <span className="text-danger-400">*</span>
        </label>
        <InputField
          type="email"
          placeholder="you@example.com"
          id="signup-email"
          name="email"
          autoComplete="email"
          value={signUpData.email}
          size="xl"
          changeHandler={changeHandler}
        />
      </div>

      {/* Phone number */}
      <div>
        <label htmlFor="contact_no" className="sn-label">
          Phone number <span className="text-danger-400">*</span>
        </label>
        <div className="flex gap-2">
          <select
            className="sn-field w-24 shrink-0 px-3"
            name="countryCode"
            aria-label="Country code"
            value={signUpData.countryCode || "+91"}
            onChange={changeHandler}
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>

          <InputField
            type="tel"
            placeholder="12345 67890"
            id="contact_no"
            name="contact_no"
            autoComplete="tel-national"
            value={signUpData.contact_no || ""}
            size="xl"
            changeHandler={changeHandler}
          />
        </div>
      </div>

      {/* Password + confirm */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="SignUp-CreatePassword" className="sn-label">
            Create password <span className="text-danger-400">*</span>
          </label>
          <InputField
            type={showPassword.createPassword ? "text" : "password"}
            placeholder="Create a password"
            id="SignUp-CreatePassword"
            name="createPassword"
            autoComplete="new-password"
            value={signUpData.createPassword ? signUpData.createPassword : ""}
            size="xl"
            iconChangeHandler={iconChangeHandler}
            changeHandler={changeHandler}
            passwordType={showPassword.createPassword ? "text" : "password"}
          />
        </div>
        <div>
          <label htmlFor="SignUp-ConfirmPassword" className="sn-label">
            Confirm password <span className="text-danger-400">*</span>
          </label>
          <InputField
            type={showPassword.confirmPassword ? "text" : "password"}
            placeholder="Repeat your password"
            id="SignUp-ConfirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            value={signUpData.confirmPassword ? signUpData.confirmPassword : ""}
            size="xl"
            iconChangeHandler={iconChangeHandler}
            changeHandler={changeHandler}
            passwordType={showPassword.confirmPassword ? "text" : "password"}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-400 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
      >
        {submitting ? (
          <>
            <Spinner className="h-4 w-4 text-ink-950" />
            Sending code…
          </>
        ) : (
          "Create account"
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-ink-500 sm:text-left">
        By creating an account you agree to our Terms of Service and Privacy
        Policy. We'll email you a one-time verification code.
      </p>
    </form>
  );
}

export default SignUpForm;
