// import React from 'react'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface IconHeadingType {
    icon :  any;
    text : string;
    path : any;
}

const commonProperty = "text-white flex items-center gap-3 w-[100%] cursor-pointer"

function IconHeading({ path , icon, text} : IconHeadingType) {
    // console.log(isActiveHeading);
    const location = useLocation();
    
  return (
    <Link
      to={`${path}`}
      className={`${commonProperty} ${path == location.pathname ? "text-yellow-200" : "text-white"} ${text === "Logout" ? 'opacity-50' : 'opacity-100'}`}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );

}

export default IconHeading;
