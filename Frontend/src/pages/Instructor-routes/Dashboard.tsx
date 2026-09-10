import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, IndianRupee, Plus, TrendingUp, Users } from "lucide-react";

import DashboardLayout from "../../components/commons/DashboardLayout";
import { ListRowSkeleton } from "../../components/commons/Skeleton";
import { EmptyState } from "../../components/commons/States";
import { getInstructorCourses } from "../../Services/operations/instructorUtilis";
import { formatDuration } from "../../Services/operations/common";
import type { RootState } from "../../Services/strore";

function Dashboard() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<any[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getInstructorCourses(
          dispatch,
          token ?? localStorage.getItem("token")
        );
        if (!cancelled) setCourses(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setCourses([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const published =
    courses?.filter((c: any) => c.status !== "Draft").length ?? 0;
  const drafts = courses?.filter((c: any) => c.status === "Draft").length ?? 0;
  const totalMinutes =
    courses?.reduce((acc: number, c: any) => acc + Number(c.totalLength ?? 0), 0) ??
    0;

  const stats = [
    {
      Icon: BookOpen,
      label: "Published courses",
      value: courses === null ? "—" : String(published),
    },
    {
      Icon: TrendingUp,
      label: "Drafts in progress",
      value: courses === null ? "—" : String(drafts),
    },
    {
      Icon: Users,
      label: "Total content",
      value: courses === null ? "—" : formatDuration(totalMinutes),
    },
    {
      Icon: IndianRupee,
      label: "Revenue this month",
      value: "₹0",
    },
  ];

  return (
    <DashboardLayout
      breadcrumbs={[{ label: "Dashboard" }]}
      title="Instructor dashboard"
      subtitle="Track how your courses are performing and pick up where you left off."
      actions={
        <Link
          to="/dashboard/mycourse"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          New course
        </Link>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ Icon, label, value }) => (
            <div key={label} className="sn-card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-brand-300">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-2xl font-extrabold text-white">
                {value}
              </p>
              <p className="mt-1 text-xs text-ink-400">{label}</p>
            </div>
          ))}
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white sm:text-xl">
              Recent courses
            </h2>
            <Link
              to="/dashboard/mycourse"
              className="text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
            >
              View all
            </Link>
          </div>

          {courses === null ? (
            <ListRowSkeleton count={2} />
          ) : courses.length === 0 ? (
            <EmptyState
              title="You haven't created a course yet"
              description="Your first course is the hardest — after that, the builder does most of the work. Start with an outline and fill it in as you go."
              icon={<BookOpen className="h-6 w-6" />}
              action={{ label: "Create your first course", to: "/dashboard/mycourse" }}
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {courses.slice(0, 4).map((course: any) => (
                <li key={course._id}>
                  <Link
                    to="/dashboard/mycourse"
                    className="sn-card sn-card-hover flex items-center gap-4 p-4"
                  >
                    <img
                      src={course.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-14 w-20 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-white">
                        {course.courseName}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-400">
                        {formatDuration(course.totalLength)} · ₹{course.price}
                      </span>
                    </span>
                    <span
                      className={`sn-badge shrink-0 ${
                        course.status === "Draft"
                          ? "bg-ink-800 text-ink-300"
                          : "bg-success-500/15 text-success-400"
                      }`}
                    >
                      {course.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
