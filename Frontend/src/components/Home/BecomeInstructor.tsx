import { NavLink } from "react-router-dom"
import Heading from "../commons/Heading"
function BecomeInstructor() {
  return (
    <div className="text-white flex flex-col gap-6 justify-center items-center mx-5 p-3 w-[70vw]">
      <NavLink to="/signup">
        <button className="border rounded-full p-2">Become an Instructor</button>
      </NavLink>
      <Heading text={"Empower Your Future With Coding Skills"} size={"lg"} highLight={{start:5  , end:6}}/>
      <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nemo, atque, maxime sit iure quam aliquam id labore recusandae, aspernatur fugiat error eius? Ipsam dignissimos perferendis repudiandae inventore ratione omnis? this is para</p>
      
    </div>
  )
}

export default BecomeInstructor
