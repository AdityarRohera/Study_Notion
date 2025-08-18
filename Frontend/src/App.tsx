// Import From React here
import { Routes, Route } from "react-router-dom";

// Import Components Here
import NavBar from "./components/commons/NavBar";

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
import AdditionalData from "./pages/Instructor-routes/AdditionalData";
import UpdatePassword from "./pages/UpdatePassword";
import CheckEmail from "./pages/CheckEmail";
import ResetCompleted from "./pages/ResetCompleted";



function App() {
  // const [count, setCount] = useState(0)

  return (
    
    <div>
      <NavBar/>

    <Routes>
         <Route index element={<Home />} />

         <Route path="/courses" element={ <Courses/>} />
         <Route path="/about" element={<AboutUs />} />
         <Route path="/contact" element={<ContactUs />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/update-password" element={<ForgotPassword />} />
         <Route path="/update-password/:token" element={<UpdatePassword />} />
         <Route path="/check-email" element={<CheckEmail />} />
         <Route path="/reset-complete" element={<ResetCompleted />} />


         {/* <Route path="/dashboard" element={<Home />} /> */}
         <Route path="/dashboard/enrolled-courses" element={< EnrolledCourses/>} />
         <Route path="/dashboard/my-profile" element={<MyProfile />} />
         <Route path={'/catalog/:catalogName'} element={<Catalog/>}/>
         <Route path={'/course/:id'} element={<FullCourse/>}/>
         <Route path="*" element={<NoPage />} />

         {/* Instructor route */}
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/dashboard/mycourse" element={<MyCourse />} />
         <Route path="/dashboard/mycourse/course-info" element={<CourseInfo />} />
         <Route path="/dashboard/mycourse/course-builder" element={<CourseBuilder />} />
         <Route path="/dashboard/mycourse/additional-data" element={<AdditionalData />} />

         <Route path="/verify-otp" element={<VerifyOTP/>}/>
    </Routes>
    </div>
  )
}

export default App;
