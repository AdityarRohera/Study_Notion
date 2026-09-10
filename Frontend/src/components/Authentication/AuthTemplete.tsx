import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Presentation, Star } from "lucide-react";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const PROOF_POINTS = [
  "Project-based courses reviewed by working engineers",
  "Learn on any device, pick up exactly where you left off",
  "Free to start — no card, no trial countdown",
];

/**
 * Split-screen auth shell.
 * The old layout used `p-40` and a fixed 500px illustration, which pushed the
 * form off-screen below ~1400px. This one is a two-column grid that collapses
 * to a single centred column on tablet and phone.
 */
function AuthTemplete({ heading, desc, imageSrc, formType }: any) {
  const [role, setRole] = useState("Student");
  const isLogin = formType === "Login";

  const roles = [
    { value: "Student", label: "Student", Icon: GraduationCap },
    { value: "Instructor", label: "Instructor", Icon: Presentation },
  ];

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center bg-ink-950">
      <div className="sn-aurora" aria-hidden="true" />

      <div className="sn-container-wide relative grid w-full items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
        {/* Form column */}
        <div className="mx-auto w-full max-w-md animate-fade-up lg:mx-0 lg:max-w-lg">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-[2.125rem]">
            {heading}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-400">{desc}</p>

          {/* Role switch */}
          <div
            role="radiogroup"
            aria-label="Account type"
            className="mt-8 inline-flex w-full gap-1.5 rounded-2xl border border-ink-800 bg-ink-900 p-1.5 sm:w-auto"
          >
            {roles.map(({ value, label, Icon }) => {
              const isActive = role === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setRole(value)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none ${
                    isActive
                      ? "bg-brand-400 text-ink-950 shadow-soft"
                      : "text-ink-300 hover:bg-ink-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {isLogin ? <LoginForm role={role} /> : <SignUpForm role={role} />}
          </div>

          <p className="mt-8 text-center text-sm text-ink-400 sm:text-left">
            {isLogin ? "New to StudyNotion? " : "Already have an account? "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="font-semibold text-brand-300 transition-colors hover:text-brand-200"
            >
              {isLogin ? "Create a free account" : "Log in"}
            </Link>
          </p>
        </div>

        {/* Visual column */}
        <div className="relative hidden lg:block">
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-brand-400/[0.06] blur-3xl"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-3xl border border-ink-800 shadow-lifted">
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              className="h-[26rem] w-full object-cover xl:h-[30rem]"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-400 text-brand-400"
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-white">
                  4.8 average rating
                </span>
              </div>

              <ul className="mt-5 space-y-3">
                {PROOF_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-200"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthTemplete;
