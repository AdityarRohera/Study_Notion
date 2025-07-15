// import React from 'react'

import AuthTemplete from "../components/Authentication/AuthTemplete"

function SignUp() {
  return (
    <div className="bg-gray-900 text-white min-h-[92vh] p-10">
      <AuthTemplete 
        heading={"Join the millions learning to code with StudyNotion for free"}
        desc={"Build skills for today, tomorrow, and beyond. Education to future-proof your career."}
        imageSrc={"https://www.google.com/imgres?q=login%20img&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20210710%2Fourmid%2Fpngtree-gradient-gray-login-interface-png-image_3573713.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Flogin&docid=7PkxTTyC_ZIdpM&tbnid=YhC8v4fBTOsUhM&vet=12ahUKEwj57Nr2lbWOAxXOe2wGHeENHuUQM3oECGUQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwj57Nr2lbWOAxXOe2wGHeENHuUQM3oECGUQAA"}
        formType={"Signup"}
        />
    </div>
  )
}

export default SignUp
