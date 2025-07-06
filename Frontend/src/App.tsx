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



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<NavBar/>}>
         <Route index element={<Home />} />
         <Route path="/courses" element={ <Courses/>} />
         <Route path="/about" element={<AboutUs />} />
         <Route path="/contact" element={<ContactUs />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App;
