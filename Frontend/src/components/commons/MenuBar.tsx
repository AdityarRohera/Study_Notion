import { useNavigate } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";
import { GiGraduateCap } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";

import IconHeading from "./IconHeading";
import { logout } from "../../Services/operations/auth";

export type MenuGroup = {
  label?: string;
  items: { text: string; path: string; icon: any }[];
};

const STUDENT_ITEMS = [
  { text: "My Profile", path: "/dashboard/my-profile", icon: <LuCircleUserRound /> },
  {
    text: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    icon: <GiGraduateCap />,
  },
  { text: "Cart", path: "/dashboard/cart", icon: <TiShoppingCart /> },
];

const INSTRUCTOR_ITEMS = [
  { text: "My Profile", path: "/dashboard/my-profile", icon: <LuCircleUserRound /> },
];

const INSTRUCTOR_COURSE_ITEMS = [
  { text: "My Courses", path: "/dashboard/mycourse", icon: <GiGraduateCap /> },
];

const SETTINGS_ITEMS = [
  { text: "Settings", path: "/dashboard/setting", icon: <IoSettingsOutline /> },
];

/** Resolves the menu groups for the signed-in role. */
export function useMenuGroups(): MenuGroup[] {
  let role: string | undefined;
  try {
    const user = localStorage.getItem("user");
    if (user) role = JSON.parse(user).account_type;
  } catch {
    role = undefined;
  }

  const groups: MenuGroup[] = [];

  if (role === "Instructor") {
    groups.push({ items: INSTRUCTOR_ITEMS });
    groups.push({ label: "Instructor", items: INSTRUCTOR_COURSE_ITEMS });
  } else {
    groups.push({ items: STUDENT_ITEMS });
  }

  groups.push({ label: "Preferences", items: SETTINGS_ITEMS });

  return groups;
}

/**
 * Dashboard sidebar. Rendered as a sticky rail from `lg` up; on smaller screens
 * DashboardLayout swaps it for a scrollable tab strip.
 */
function MenuBar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const navigate = useNavigate();
  const groups = useMenuGroups();

  return (
    <nav
      aria-label="Dashboard"
      className="flex h-full w-full flex-col gap-6 border-r border-ink-800 bg-ink-900 px-4 py-7"
    >
      {groups.map((group, i) => (
        <div key={i} className="flex flex-col gap-1">
          {group.label && (
            <p className="mb-2 px-3.5 text-[0.6875rem] font-bold uppercase tracking-wider text-ink-500">
              {group.label}
            </p>
          )}
          {group.items.map((item) => (
            <IconHeading key={item.path} {...item} onNavigate={onNavigate} />
          ))}
        </div>
      ))}

      <div className="mt-auto border-t border-ink-800 pt-4">
        <button
          type="button"
          onClick={() => logout(navigate)}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-400 transition-all duration-200 hover:bg-danger-500/10 hover:text-danger-400"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-base">
            <ImExit />
          </span>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default MenuBar;
