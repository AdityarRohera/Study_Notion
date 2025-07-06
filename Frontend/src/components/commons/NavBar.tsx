// import React from 'react'
import { Outlet , NavLink } from "react-router-dom";
import StudyNotionLogo from '../../assets/logos/Logo-Full-Dark.png';

function NavBar() {
  return (
    <div>

        {/* For Logo */}
      <div>
        <img src={StudyNotionLogo} alt="" />
      </div>

      {/* Psages div */}
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/course">Courses</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
      </div>
      
      <Outlet/>
    </div>
  )
}

export default NavBar
