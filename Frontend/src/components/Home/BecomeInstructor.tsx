import { NavLink } from "react-router-dom"
import Heading from "../commons/Heading"
function BecomeInstructor() {
  return (
   <div className="text-white flex flex-col gap-6 justify-center items-center mx-auto p-10 w-[70vw] text-center">
  <NavLink to="/signup">
    <button className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-full px-6 py-3 text-lg font-semibold transition duration-300">
      Become an Instructor
    </button>
  </NavLink>

  <Heading
    text={"Empower Your Future With Coding Skills"}
    size={"lg"}
    highLight={{ start: 5, end: 6 }}
  />

  <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nemo, atque,
    maxime sit iure quam aliquam id labore recusandae, aspernatur fugiat error
    eius? Ipsam dignissimos perferendis repudiandae inventore ratione omnis?
  </p>
</div>

  )
}

export default BecomeInstructor
