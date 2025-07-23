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
         <Route path="/dashboard" element={<Home />} />
         <Route path="/dashboard/enrolled-courses" element={< EnrolledCourses/>} />
         <Route path="/dashboard/my-profile" element={<MyProfile />} />
         <Route path={'/catalog/:catalogName'} element={<Catalog/>}/>
         <Route path={'/course/:id'} element={<FullCourse/>}/>
         <Route path="*" element={<NoPage />} />

         <Route path="/verify-otp" element={<VerifyOTP/>}/>
    </Routes>
    </div>
  )
}

export default App;
