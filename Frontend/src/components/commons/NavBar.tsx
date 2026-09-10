import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";

import StudyNotionLogo from "../../assets/logos/Logo-Full-Light.png";
import { logout } from "../../Services/operations/auth";
import { fatchCategories } from "../../Services/operations/common";

type StoredUser = {
  account_type?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
} | null;

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

function readUser(): StoredUser {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function initialsOf(user: StoredUser) {
  const first = user?.firstName?.[0] ?? "";
  const last = user?.lastName?.[0] ?? "";
  return (first + last).toUpperCase() || "S";
}

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<StoredUser>(() => readUser());
  const [categories, setCategories] = useState<any[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const isCatalogRoute = location.pathname.split("/")[1] === "catalog";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const category = await fatchCategories();
      if (!cancelled && category) setCategories(category);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the avatar / auth buttons in sync after login & logout.
  useEffect(() => {
    setUser(readUser());
    setProfileOpen(false);
    setCatalogOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Elevate the bar once the page scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on outside click / Escape.
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (catalogRef.current && !catalogRef.current.contains(target)) {
        setCatalogOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setCatalogOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-brand-300"
        : "text-ink-200 hover:text-white hover:bg-white/5"
    }`;

  const catalogLinks = categories?.length ? categories : [];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "sn-glass border-ink-800 shadow-soft"
            : "border-transparent bg-ink-950"
        }`}
      >
        <nav
          aria-label="Primary"
          className="sn-container-wide flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]"
        >
          {/* Logo */}
          <NavLink
            to="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-85"
            aria-label="StudyNotion home"
          >
            <img
              src={StudyNotionLogo}
              alt="StudyNotion"
              width={160}
              height={32}
              className="h-7 w-auto sm:h-8"
            />
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>

            <div
              ref={catalogRef}
              className="relative"
              onMouseEnter={() => setCatalogOpen(true)}
              onMouseLeave={() => setCatalogOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={catalogOpen}
                onClick={() => setCatalogOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isCatalogRoute || catalogOpen
                    ? "text-brand-300"
                    : "text-ink-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                Catalog
                <IoIosArrowDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    catalogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  catalogOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 p-2 shadow-lifted">
                  {catalogLinks.length === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-ink-400">
                      Catalog is loading…
                    </p>
                  ) : (
                    catalogLinks.map((category: any) => (
                      <Link
                        key={category._id}
                        to={`/catalog/${category.name}?desc=${encodeURIComponent(
                          category.desc ?? ""
                        )}`}
                        state={category._id}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:bg-ink-800 hover:text-brand-300"
                      >
                        {category.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user?.account_type === "Student" && (
              <Link
                to="/dashboard/enrolled-courses"
                aria-label="Your courses"
                className="relative hidden rounded-xl p-2.5 text-ink-200 transition-colors hover:bg-ink-800 hover:text-white sm:inline-flex"
              >
                <FiShoppingCart className="h-5 w-5" />
              </Link>
            )}

            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  aria-label="Account menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-ink-950 ring-2 ring-transparent transition-all duration-200 hover:ring-brand-400/40"
                >
                  {initialsOf(user)}
                </button>

                <div
                  role="menu"
                  className={`absolute right-0 top-full w-56 pt-3 transition-all duration-200 ${
                    profileOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 shadow-lifted">
                    <div className="border-b border-ink-800 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="truncate text-xs text-ink-400">
                        {user.email ?? user.account_type}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        role="menuitem"
                        to="/dashboard/my-profile"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:bg-ink-800 hover:text-white"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        role="menuitem"
                        type="button"
                        onClick={() => logout(navigate)}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-danger-400 transition-colors hover:bg-danger-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center rounded-xl border border-ink-700 px-4 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-800"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex h-10 items-center rounded-xl bg-brand-400 px-4 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300 hover:shadow-glow"
                >
                  Sign up
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="inline-flex rounded-xl p-2.5 text-ink-100 transition-colors hover:bg-ink-800 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden lg:hidden ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-ink-800 bg-ink-900 shadow-lifted transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-ink-800 px-5">
            <img
              src={StudyNotionLogo}
              alt="StudyNotion"
              className="h-7 w-auto"
            />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-xl p-2 text-ink-300 transition-colors hover:bg-ink-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            {user && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-ink-800 bg-ink-850 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-ink-950">
                  {initialsOf(user)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="truncate text-xs text-ink-400">
                    {user.account_type}
                  </p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-ink-800 text-brand-300"
                      : "text-ink-200 hover:bg-ink-800 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>

              <button
                type="button"
                onClick={() => setMobileCatalogOpen((v) => !v)}
                aria-expanded={mobileCatalogOpen}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-ink-200 transition-colors hover:bg-ink-800 hover:text-white"
              >
                Catalog
                <IoIosArrowDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileCatalogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  mobileCatalogOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-ink-800 pl-3">
                    {catalogLinks.length === 0 ? (
                      <p className="px-3 py-2 text-sm text-ink-500">
                        Loading categories…
                      </p>
                    ) : (
                      catalogLinks.map((category: any) => (
                        <Link
                          key={category._id}
                          to={`/catalog/${category.name}?desc=${encodeURIComponent(
                            category.desc ?? ""
                          )}`}
                          state={category._id}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-ink-800 hover:text-brand-300"
                        >
                          {category.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {NAV_LINKS.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-ink-800 text-brand-300"
                        : "text-ink-200 hover:bg-ink-800 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="border-t border-ink-800 p-4">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/dashboard/my-profile"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-400 text-sm font-semibold text-ink-950"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout(navigate);
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-700 text-sm font-semibold text-danger-400"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-400 text-sm font-semibold text-ink-950"
                >
                  Create free account
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 text-sm font-semibold text-ink-100"
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default NavBar;
