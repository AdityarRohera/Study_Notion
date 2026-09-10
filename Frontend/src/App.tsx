// Import From React here
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import Components Here
import NavBar from "./components/commons/NavBar";
import Footer from "./components/commons/Footer";

// Import Pages Here
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import VerifyOTP from "./pages/VerifyOTP";
import EnrolledCourses from "./pages/EnrolledCourses";
import MyProfile from "./pages/MyProfile";
import Catalog from "./pages/Catalog";
import FullCourse from "./pages/FullCourse";
import ForgotPassword from "./pages/ForgotPassword";

// import instructor route
import Dashboard from "./pages/Instructor-routes/Dashboard";
import MyCourse from "./pages/Instructor-routes/MyCourse";
import CourseInfo from "./pages/Instructor-routes/CourseInfo";
import CourseBuilder from "./pages/Instructor-routes/CourseBuilder";
// import AdditionalData from "./pages/Instructor-routes/AdditionalData";
import UpdatePassword from "./pages/UpdatePassword";
import CheckEmail from "./pages/CheckEmail";
import ResetCompleted from "./pages/ResetCompleted";
import PublishCourse from "./pages/Instructor-routes/PublishCourse";

// student enrolled course import
import EnrolledCourseSections from "./pages/Student-routes/EnrolledCourseSections";
import EnrolledCourseSubSection from "./pages/Student-routes/EnrolledCourseSubSection";
import VideoPlayerPage from "./pages/Student-routes/VideoPlayerPage";

/** Every route change should start at the top of the new page. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

function App() {
  const { pathname } = useLocation();

  // The video player is an immersive, chrome-free surface.
  const isPlayer = pathname.startsWith("/watch/");
  // Dashboards are app shells — they use the side menu instead of a footer.
  const isAppShell = pathname.startsWith("/dashboard");

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      <ScrollToTop />
      {!isPlayer && <NavBar />}

      <main id="main-content" className="flex-1">
        <Routes>
          <Route index element={<Home />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/update-password" element={<ForgotPassword />} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/reset-complete" element={<ResetCompleted />} />

          {/* <Route path="/dashboard" element={<Home />} /> */}
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path={"/catalog/:catalogName"} element={<Catalog />} />
          <Route path={"/course/:id"} element={<FullCourse />} />
          <Route path="*" element={<NoPage />} />

          {/* Instructor route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/mycourse" element={<MyCourse />} />
          <Route
            path="/dashboard/mycourse/course-info/:state"
            element={<CourseInfo />}
          />
          <Route
            path="/dashboard/mycourse/course-builder/:state"
            element={<CourseBuilder />}
          />
          <Route
            path="/dashboard/mycourse/publish-course/:state"
            element={<PublishCourse />}
          />

          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Student Dashborad */}
          <Route
            path="/dashboard/enrolled-courses/:courseId"
            element={<EnrolledCourseSections />}
          />
          <Route
            path="/dashboard/lectures/:sectionId"
            element={<EnrolledCourseSubSection />}
          />
          <Route path="/watch/:videoUrl" element={<VideoPlayerPage />} />
        </Routes>
      </main>

      {!isPlayer && !isAppShell && <Footer />}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#141826",
            color: "#e9edf4",
            border: "1px solid #2a3145",
            borderRadius: "0.875rem",
            fontSize: "0.875rem",
            padding: "0.75rem 1rem",
            boxShadow: "0 12px 32px -12px rgb(0 0 0 / 0.6)",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#141826" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#141826" } },
        }}
      />
    </div>
  );
}

export default App;
