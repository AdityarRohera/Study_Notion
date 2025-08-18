// import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import StudyNotionLogo from '../../assets/logos/Logo-Full-Light.png';
import { useEffect, useRef, useState } from "react";
// import { BASE_URL , CATEGORY_API_ENDPOINT } from "../../Services/apiConfig";
// import { useSelector } from "react-redux";
// import { type RootState } from "../../Services/strore";
// import { apiConnector } from "../../Services/apiConnector";
// import { setToken } from "../../features/slices/tokenSlice";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

// react Icons import
import { IoIosArrowDown } from "react-icons/io";
import { logout } from "../../Services/operations/auth";
import { useNavigate } from "react-router-dom";

import { fatchCategories } from "../../Services/operations/common";

function NavBar() {

  let user: { account_type: string } | null = null;

  const userInfo = localStorage.getItem("user");

  if (userInfo) {
    user = JSON.parse(userInfo);
  }
     

    const [categories  , setCategories] = useState<any>([]);
    const location = useLocation();
    const [visible , setVisible] = useState(false);
    const profileRef = useRef<any>(null);
    const navigate = useNavigate();

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
        const category = await fatchCategories();
        if(categories){
          setCategories(category);
        }
    }

    const openProfileHandler = () => {
        setVisible(true)
    }

    document.onclick = function(e:any) {
        // console.log(e.target , e.target.id)
        if(e.target.id !== 'profile'){
          setVisible(false);
        }
    };

    // Hooks
    useEffect(() => {
        getCategories();
    } , [])


  return (
    <div className="border-b-1 bg-black text-white text-[20px] flex gap-[100px] items-center mb-0 p-3 px-[150px] pointer-coarse: min-h-[8vh] relative">

        {/* For Logo */}
      <div className="w-[500px] ">
        <NavLink to="/">
          <img className="" src={StudyNotionLogo} alt="" loading="lazy" />
        </NavLink>
      </div>

      {/* Pages div */}
      <div className="flex items-center gap-6 w-[600px] pointer-coarse: h-[20px] ml-[40px]">
        <NavLink to="/">Home</NavLink>

        {/* catalog */}
        <div className={`group`}>
          <div className={`flex items-center gap-1 h-[8vh] justify-end`}>
              <p className={`${location.pathname.split('/')[1] === `catalog` ? 'active' : ''}`}>Catalog</p>
              <IoIosArrowDown />
          </div>

          {/* Catalogs links */}
          <div className="bg-white text-black font-medium flex flex-col gap-5 items-start p-5 pl-5 py-8 w-[320px]  min-h-[100px] absolute top-[100%] left-[40%] rounded-xl opacity-0  group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
        
              {
                
                 categories?.map((category : any , index : any) => {
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
            
                <div className=" flex gap-5 px-2  h-[30px] min-w-[250px]">
                  
                  <div className="flex gap-7 items-center h-full pl-25">

                    {
                      user && user.account_type === "Student" &&
                      <FiShoppingCart className="text-3xl cursor-pointer" />
                    }

                    {/* profile */}

                    {
                      user && 
                      <div className="">
                        
                      <div ref={profileRef} onClick={openProfileHandler} className="cursor-pointer relative rounded-full ">
                      <img id="profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmBs0YZevOEuYRwxd-bG_ttYxcHKeXIRpIhB-1e6yrZ-znl-hISmDqwak&s" className="border rounded-full w-[40px] flex justify-center items-center" alt="" />
                      </div>

                    <div className={`absolute top-[85%] right-[200px] bg-gray-500 text-white w-[120px] flex flex-col items-center justify-center h-[80px] rounded-xl p-1 ${!visible ? 'opacity-0' : ''}`}>
                        <Link to={'/dashboard/my-profile'}>Dashboard</Link>
                        <hr />
                        <button className="cursor-pointer" onClick={() => logout(navigate)}>Logout</button>
                    </div>
                    </div>
                    }

                    
                  </div>

                   
                     {
                      user=== null &&
                      <div className="flex gap-5 justify-center items-center h-full pl-20 ">
                       <NavLink to="/login">Login</NavLink>
                       <NavLink to="/signup">Signup</NavLink>
                      </div>
                     }

                </div>

      
    </div>
  )
}

export default NavBar;
