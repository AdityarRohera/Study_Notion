// import React from 'react'
import { NavLink } from "react-router-dom";
import StudyNotionLogo from '../../assets/logos/Logo-Full-Light.png';
import { useEffect, useState } from "react";
import { BASE_URL , CATEGORY_API_ENDPOINT } from "../../Services/apiConfig";
import { useSelector } from "react-redux";
import { type RootState } from "../../Services/strore";
import { apiConnector } from "../../Services/apiConnector";
// import { setToken } from "../../features/slices/tokenSlice";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import axios from "axios";

// react Icons import
import { IoIosArrowDown } from "react-icons/io";

// Interface here
interface MyToken {
  userId : object,
  role : string
}

function NavBar() {
    const userInfo : MyToken |null = useSelector((state: RootState) => state.auth.user);
    // const dispatch = useDispatch();
    const [categories  , setCategories] = useState([]);

    // All functions

    //   const changeHandler = async(event: any) => {

    //     const selectedId = event.target.value;
    //     if(selectedId === '') return;
    //      const findCourses = await axios(`${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORY_COURSES}` ,
    //       {
    //         method : 'GET',
    //         headers : {'Content-Type': 'application/x-www-form-urlencoded'},
    //         params: {categoryId : selectedId}
    //       });
    //       // navigate(`/catalog/${selectedCategory}`);

    //     console.log(findCourses);
    // }

    const getCategories = async() => {
        try{
              const categoryPayload = {
                method : 'GET' as 'GET',
                url : `${BASE_URL}${CATEGORY_API_ENDPOINT.CATEGORIES}`,
              }

              const category = await apiConnector(categoryPayload);
              if(category){
                setCategories(category.data.categories)
              }

        } catch(error : any){
           if (error.response) {
                console.error('Server Error:', error.response.data);
                } else if (error.request) {
                  console.error('Network Error:', error.request);
                } else {
                  console.error('Other Error:', error.message);
           }
        }
    } 

    // Hooks
    useEffect(() => {
        getCategories();
    } , [])


  return (
    <div className="border-b-1 bg-black text-white text-[20px] flex gap-[200px] items-center mb-0 p-3 px-[150px] pointer-coarse: min-h-[8vh] relative">

        {/* For Logo */}
      <div className="w-[500px] ">
        <NavLink to="/">
          <img className="" src={StudyNotionLogo} alt="" loading="lazy" />
        </NavLink>
      </div>

      {/* Pages div */}
      <div className="flex items-center gap-6 w-[900px] pointer-coarse: h-[20px]">
        <NavLink to="/">Home</NavLink>

        {/* catalog */}
        <div className={`group`}>
          <div className={`flex items-center gap-1 h-[8vh] justify-end`}>
              <p>Catalog</p>
              <IoIosArrowDown />
          </div>

          {/* Catalogs links */}
          <div className="bg-white text-black font-medium flex flex-col gap-5 items-start p-5 pl-5 py-8 w-[320px]  min-h-[100px] absolute top-[100%] left-[35%] rounded-xl opacity-0  group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
        
              {
                 categories.map((category , index) => {
                     const {_id ,name} = category;
                      return  <Link className="w-full h-15 items-center p-2 py-[15px] hover:bg-gray-300 rounded-xl" to={`/catalog/${name}`} state={_id} key={index} >{name}</Link>      
                 })
              }
    
          </div>

        </div>
        
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
      </div>

      {/* Authentication div */}
            
                <div className="flex gap-5 ">
                  
                    {
                      userInfo && userInfo.role === "Instructor" &&
                      <div>
                        <NavLink className="border" to="/dashboard">DashBoard Instructor</NavLink>
                        <NavLink className="border border-white" to="/">Logout</NavLink>
                      </div>
                    }
            
    
                    {
                    userInfo && userInfo.role === "Admin" &&
                    <div>
                      <NavLink className="border" to="/dashboard">DashBoard Admin</NavLink>
                      <NavLink className="border border-white" to="/">Logout</NavLink>
                    </div>
                    }

                    {
                      userInfo && userInfo.role === "Student" &&
                      <div>
                        <NavLink className="border" to="/dashboard">DashBoard</NavLink>
                        <NavLink className="border border-white" to="/">Logout</NavLink>
                      </div>
                    }

                    {
                      userInfo=== null &&
                      <div className="flex gap-5 w-[250px]">
                       <NavLink to="/login">Login</NavLink>
                       <NavLink to="/signup">Signup</NavLink>
                      </div>
                    }

                </div>

      
    </div>
  )
}

export default NavBar;
