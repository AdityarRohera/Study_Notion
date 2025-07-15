// import React from 'react'
// import Heading from "../commons/Heading"
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function AuthTemplete({heading , desc ,imageSrc , formType} : any) {
  return (
    <div>
        
    {/* Auth-form templete div */}
      <div>
        {/* <Heading text={heading}/> */}
        <h1>{heading}</h1>
        <p>{desc}</p>

        {/* render form component based on logic */}

        {
            formType === "Login" ? <LoginForm/> : <SignUpForm/>
        }

      </div>

      {/* Auth image div */}
      <div>
        <img src={imageSrc} alt="img" />
      </div>

    </div>
  )
}

export default AuthTemplete;
