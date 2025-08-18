// import React from 'react'
import { ResetPasswordLayout } from "../components/Authentication/ResetPasswordLayout"
import { useNavigate } from "react-router-dom";

function ResetCompleted() {

    const navigate = useNavigate();

    const submitHandler = (e:any) => {
        e.preventDefault();
        navigate('/login');
    }
    
  return (
    <div>
      <ResetPasswordLayout 
      heading="Reset Complete!"
      desc="All done! we have successfully reset your password"
      buttonText="Return to login"
      submitHandler={submitHandler}
      />
    </div>
  )
}

export default ResetCompleted;
