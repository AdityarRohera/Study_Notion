// import React from 'react'
import { Link } from "react-router-dom"

import AuthTemplete from "../components/Authentication/AuthTemplete"

function Login() {
  return (
    <div className="bg-gray-900 text-white relative w-full min-h-[90vh]">
      
        <AuthTemplete
          heading="Welcome Back"
          desc="Discover your passions, Be Unstoppable"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIR8CmqC9R1K73kjmrXiHdIEpU69OxUHKJaA&s"
          formType="Login"
        />

        <div className="absolute top-[58%] left-[32%] text-md text-blue-500">
          <Link to={'/update-password'}>Forgot Password</Link>
        </div>
    </div>



  )
}

export default Login
