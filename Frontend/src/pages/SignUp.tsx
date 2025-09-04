// import React from 'react'

import AuthTemplete from "../components/Authentication/AuthTemplete"

function SignUp() {
  return (
    <div className="bg-gray-900 text-white relative w-full min-h-[90vh]">
      <AuthTemplete 
        heading={"Join the millions learning to code with StudyNotion for free"}
        desc={"Build skills for today, tomorrow, and beyond. Education to future-proof your career."}
        imageSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIR8CmqC9R1K73kjmrXiHdIEpU69OxUHKJaA&s"}
        formType={"Signup"}
        />
    </div>
  )
}

export default SignUp
