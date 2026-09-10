import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Flame,
  Mail,
  Phone,
  ShieldCheck,
  Trophy,
  UserRound,
} from "lucide-react";

import DashboardLayout from "../components/commons/DashboardLayout";
import { getEnrolledCourses } from "../Services/operations/purchasedCoursesUtilis";
import { useDispatch } from "react-redux";

function readUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function MyProfile() {
  const user = readUser();
  const dispatch = useDispatch();
  const [enrolledCount, setEnrolledCount] = useState<number | null>(null);

  const { firstName, lastName, email, contact_no, account_type } = user || {};
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || "there";
  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "SN";

  const isStudent = account_type !== "Instructor";

  useEffect(() => {
    // Only students have a library, and only a signed-in request will succeed.
    if (!isStudent || !localStorage.getItem("token")) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getEnrolledCourses(dispatch);
        if (!cancelled) {
          setEnrolledCount(res?.enrolledCourses?.length ?? 0);
        }
      } catch {
        if (!cancelled) setEnrolledCount(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isStudent]);

  const stats = [
    {
      Icon: BookOpen,
      label: "Courses enrolled",
      value: enrolledCount === null ? "—" : String(enrolledCount),
    },
    { Icon: Flame, label: "Day streak", value: "1" },
    { Icon: Trophy, label: "Certificates", value: "0" },
  ];

  const details = [
    { Icon: Mail, label: "Email address", value: email ?? "Not provided" },
    { Icon: Phone, label: "Phone number", value: contact_no ?? "Not provided" },
    {
      Icon: ShieldCheck,
      label: "Account type",
      value: account_type ?? "Student",
    },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard", to: "/dashboard/my-profile" }, { label: "My Profile" }]}
      title={`${greeting()}, ${firstName ?? "there"}`}
      subtitle="Here's your account at a glance. Keep the streak going."
    >
      <div className="flex flex-col gap-6">
        {/* Identity card */}
        <section className="sn-card overflow-hidden">
          <div
            className="h-24 bg-gradient-to-r from-brand-500/25 via-brand-400/10 to-accent-500/20 sm:h-28"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <span className="-mt-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-ink-900 bg-gradient-to-br from-brand-400 to-brand-600 font-display text-2xl font-extrabold text-ink-950 sm:-mt-12 sm:h-24 sm:w-24 sm:text-3xl">
                {initials}
              </span>

              <div className="min-w-0 sm:pb-1">
                <h2 className="truncate font-display text-xl font-bold text-white sm:text-2xl">
                  {fullName}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-ink-400">
                  <UserRound className="h-3.5 w-3.5" />
                  {account_type ?? "Student"} · {email ?? "No email on file"}
                </p>
              </div>
            </div>

            <Link
              to={isStudent ? "/dashboard/enrolled-courses" : "/dashboard/mycourse"}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
            >
              {isStudent ? "Go to my courses" : "Manage my courses"}
            </Link>
          </div>
        </section>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ Icon, label, value }) => (
            <div key={label} className="sn-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold text-white">
                    {value}
                  </p>
                  <p className="text-xs text-ink-400">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account details */}
        <section className="sn-card p-5 sm:p-8">
          <h2 className="font-display text-lg font-bold text-white sm:text-xl">
            Account details
          </h2>
          <p className="mt-1.5 text-sm text-ink-400">
            The information we use to keep your account and receipts in sync.
          </p>

          <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {details.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-ink-800 bg-ink-850 p-4"
              >
                <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-500">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </dt>
                <dd className="mt-2 truncate text-sm font-semibold text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 border-t border-ink-800 pt-6 sm:flex-row">
            <Link
              to="/update-password"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 px-5 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850"
            >
              Change password
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 px-5 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850"
            >
              Contact support
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default MyProfile;
