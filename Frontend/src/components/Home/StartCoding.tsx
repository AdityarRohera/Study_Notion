// import React from 'react'
// import AutoCodebarLayout from "./AutoCodebarLayout"
import Code from "./Code";
import Info from "./Info";

function StartCoding() {
  // const clickHandler = () => {console.log("clicked")}
  return (
    <div className="flex gap-5 rounded-xl bg-[#0d1117] text-white w-[85%] mx-auto p-6">
        {/* <AutoCodebarLayout text="Unlock your coding potential with our online courses." para={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consequuntur totam cum molestias rem aliquam rerum eveniet iusto dicta, architecto amet? Possimus mollitia quis quam! Ipsum enim ad excepturi cum?"} btnText="click" clickHandler={clickHandler}/> */}

        <Code/>
        <Info/>

    </div>
  )
}

export default StartCoding;
