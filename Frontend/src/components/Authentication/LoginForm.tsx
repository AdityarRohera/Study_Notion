import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import InputField from "../commons/InputField";
import { Spinner } from "../commons/Loading";
import { signinValidation } from "../../Services/inputValidation";
import { login } from "../../Services/operations/auth";

function LoginForm({ role }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    account_type: `${role}`,
    email: "",
    password: "",
  });

  const iconChangeHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const changeHandler = (e: any) => {
    const { value, name } = e.target;

    setLoginData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const validation = signinValidation(loginData);

    if (validation == true) {
      try {
        setSubmitting(true);
        await login(dispatch, loginData, Navigate);
      } finally {
        setSubmitting(false);
      }
    } else {
      toast.error(validation as string);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex w-full flex-col gap-5">
      <div>
        <label htmlFor="login-email" className="sn-label">
          Email address <span className="text-danger-400">*</span>
        </label>
        <InputField
          type="email"
          placeholder="you@example.com"
          id="login-email"
          name="email"
          autoComplete="email"
          value={loginData.email || ""}
          size="xl"
          changeHandler={changeHandler}
        />
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="login-password" className="sn-label">
            Password <span className="text-danger-400">*</span>
          </label>
          <Link
            to="/update-password"
            className="mb-2 text-xs font-semibold text-brand-300 transition-colors hover:text-brand-200"
          >
            Forgot password?
          </Link>
        </div>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          id="login-password"
          name="password"
          autoComplete="current-password"
          value={loginData.password || ""}
          size="xl"
          iconChangeHandler={iconChangeHandler}
          changeHandler={changeHandler}
          passwordType={showPassword ? "text" : "password"}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-400 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
      >
        {submitting ? (
          <>
            <Spinner className="h-4 w-4 text-ink-950" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
