// import React from 'react'
import { ResetPasswordLayout } from '../components/Authentication/ResetPasswordLayout'
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../Services/operations/auth';
import { useDispatch } from 'react-redux';

function CheckEmail() {

    const location = useLocation()
    const dispatch = useDispatch();
    const {state} = location;
    console.log(state);

    const submitHandler = async(e:any) => {
        e.preventDefault();
        console.log('inside -> check-email')
        await resetPassword(dispatch , state);
    }

  return (
    <div>
      <ResetPasswordLayout
       heading='Check email'
       desc='We have send the reset email to youremailaccount@gmail.com'
       buttonText='Resend email'
       submitHandler={submitHandler}
       />
    </div>
  )
}

export default CheckEmail;
