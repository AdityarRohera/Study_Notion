import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";

import { ResetPasswordLayout } from "../components/Authentication/ResetPasswordLayout";
import InputField from "../components/commons/InputField";
import { verifyResetPassword } from "../Services/operations/auth";

const RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
];

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
    setShowPassword((prev: any) => ({
      ...prev,
      [name]: !prev[name],
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

    if (!newPassword.createPassword) {
      toast.error("New-password required");
      return;
    } else if (!newPassword.confirmPassword) {
      toast.error("Confirm-password required");
      return;
    } else if (newPassword.createPassword !== newPassword.confirmPassword) {
      toast.error("Password mis-match");
      return;
    }

    verifyResetPassword(dispatch, navigate, {
      password: newPassword.confirmPassword,
      token: param.token,
    });
  };

  const value = newPassword.createPassword;
  const strength = RULES.filter((rule) => rule.test(value)).length;
  const strengthLabel = ["Too short", "Weak", "Good", "Strong"][strength];
  const strengthColor = [
    "bg-ink-700",
    "bg-danger-500",
    "bg-brand-400",
    "bg-success-500",
  ][strength];

  return (
    <ResetPasswordLayout
      heading="Choose a new password"
      desc="Almost there. Pick something strong that you haven't used on this account before."
      buttonText="Reset password"
      icon={<Lock className="h-6 w-6" />}
      submitHandler={submitHandler}
    >
      <div>
        <label htmlFor="createPassword" className="sn-label">
          New password <span className="text-danger-400">*</span>
        </label>
        <InputField
          type={showPassword.createPassword ? "text" : "password"}
          placeholder="Enter new password"
          id="createPassword"
          name="createPassword"
          autoComplete="new-password"
          value={newPassword.createPassword}
          size="xl"
          iconChangeHandler={iconChangeHandler}
          changeHandler={changeHandler}
          passwordType={showPassword.createPassword ? "text" : "password"}
        />

        {value.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                  style={{ width: `${(strength / RULES.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-ink-400">
                {strengthLabel}
              </span>
            </div>

            <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
              {RULES.map((rule) => {
                const passed = rule.test(value);
                return (
                  <li
                    key={rule.label}
                    className={`text-xs ${
                      passed ? "text-success-400" : "text-ink-500"
                    }`}
                  >
                    {passed ? "✓" : "○"} {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="sn-label">
          Confirm password <span className="text-danger-400">*</span>
        </label>
        <InputField
          type={showPassword.confirmPassword ? "text" : "password"}
          placeholder="Repeat new password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          value={newPassword.confirmPassword}
          size="xl"
          iconChangeHandler={iconChangeHandler}
          changeHandler={changeHandler}
          passwordType={showPassword.confirmPassword ? "text" : "password"}
        />
      </div>
    </ResetPasswordLayout>
  );
}

export default UpdatePassword;
