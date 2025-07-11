// import React from 'react'
// import Heading from "../commons/Heading"
import AutoCodebarLayout from "./AutoCodebarLayout"

function AboutCourses() {

    const clickHandler = () => {console.log("clicked")}
  return (
    <div>
        <AutoCodebarLayout text="Unlock your coding potential with our online courses." para={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consequuntur totam cum molestias rem aliquam rerum eveniet iusto dicta, architecto amet? Possimus mollitia quis quam! Ipsum enim ad excepturi cum?"} btnText="click" clickHandler={clickHandler}/>
    </div>
  )
}

export default AboutCourses
