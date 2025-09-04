// import { useState } from "react";
import IconHeading from "./IconHeading";
import { LuCircleUserRound } from "react-icons/lu";
import { GiGraduateCap } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { logout } from "../../Services/operations/auth";
import { useNavigate } from "react-router-dom";

function MenuBar() {

  const navigate = useNavigate();

  // Menu Data
  const UserHeadings = [
    { text: "My Profile", path : "/dashboard/my-profile" , icon: <LuCircleUserRound /> },
    { text: "Enrolled Courses", path : "/dashboard/enrolled-courses" , icon: <GiGraduateCap /> },
    { text: "Cart", path : "/dashboard/cart" , icon: <TiShoppingCart /> },
  ];

  const InstructorHeading = [
      //  { text: "Dashboard", path : "/dashboard" , icon: <LuCircleUserRound /> },
       { text: "My Profile", path : "/dashboard/my-profile" , icon: <LuCircleUserRound /> },
  ]

  const MyCourse = [{ text: "My Courses", path : "/dashboard/mycourse" , icon: <GiGraduateCap /> },]

  const settings = [
    { text: "Setting", path : "/dashboard/setting" , icon: <IoSettingsOutline /> },
    // { text: "Logout", path : "/login" , icon: <ImExit /> },
  ];


  // Main menu start
  let role
  const user = localStorage.getItem('user');
  if(user){
    role = JSON.parse(user).account_type;
  }
  

  return (
    <div className="border-r-1 border-gray-500 bg-gray-800 flex flex-col items-start gap-10 pl-6 pt-15 pr-10 w-[15%] min-h-[92vh]">


      {
        role === 'Student' && 
        <div className="flex flex-col items-start gap-5 w-full text-xl ">
        {UserHeadings.map((heading , index) => (
          <IconHeading
            key={index}
            {...heading}
          />
        ))}
       </div>
      }

      {
        role === 'Instructor' && 
        <div className="flex flex-col items-start gap-5 w-full text-xl">
          <div className="flex flex-col items-start gap-5 w-full text-xl">
         {InstructorHeading.map((heading , index) => (
           <IconHeading
             key={index}
             {...heading}
           />
         ))}
        </div>

         <hr className="text-white bg-gray-200 w-full" />

         <span className="text-xl text-white opacity-100">Instructor</span>

         <div className="flex flex-col items-start gap-5 w-full text-xl">
         {MyCourse.map((heading , index) => (
           <IconHeading
             key={index}
             {...heading}
           />
         ))}
        </div>

        </div>
      }

      <hr className="text-white bg-gray-200 w-full" />

      <div className="flex flex-col items-start gap-10 w-full text-xl">
        {settings.map((heading , index) => (
          <IconHeading
            key={index}
            {...heading}
            // isActiveHeading={activeId === heading.id}
          />
        ))}
      </div>

       {/* Logout*/}
        <div
          className={`text-xl text-white flex items-center gap-3 w-[100%] cursor-pointer opacity-50`}
          onClick={() => logout(navigate)}
        >
          <ImExit />
          <p>Logout</p>
        </div>
    </div>
  );
}

export default MenuBar;

