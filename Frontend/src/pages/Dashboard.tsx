// // import React from 'react'

// import toast , {Toaster} from "react-hot-toast";
// // import { useSelector} from "react-redux";
// // import { type RootState } from "../Services/strore";
// import { useEffect } from "react";


// function Dashboard() {

//   // const {firstName , lastName} = useSelector((state : RootState) => state.auth.user);
//   const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
//   const {firstName , lastName} = user;

//   useEffect(() => {
//     firstName && lastName && toast(`Welcome ${firstName + " " + lastName}!`, {
//                 icon: '😀',
//        });
//   } , [])

//   return (
//     <div>
//       Dashboard page
//       <Toaster/>
//     </div>
//   )
// }

// export default Dashboard;
