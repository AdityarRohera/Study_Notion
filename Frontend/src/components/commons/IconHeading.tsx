// import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Services/operations/auth";

interface IconHeadingType {
    icon :  any;
    text : string;
    path : any;
}

const commonProperty = "text-white flex items-center gap-3 w-[100%] cursor-pointer "

function IconHeading({ path , icon, text} : IconHeadingType) {
    // console.log(isActiveHeading);
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = location.pathname === path || location.pathname.includes(path);

    if(path === '/login'){
        logout(navigate);
    }
    
  return (
    <Link
      to={`${path}`}
      className={`${commonProperty} ${isActive ? "text-yellow-200" : "text-white"} ${text === "Logout" ? 'opacity-50' : 'opacity-90'}`}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );

}

export default IconHeading;
