import Heading from "../commons/Heading"

function AboutCourse({heading , desc} : any) {

  return (
    <div className="bg-gray-700 px-10 py-5 w-[100vw] h-[30vh]">

        <div className="flex flex-col justify-center items-start gap-5 h-full w-[80%]">
           {/* name div */}
           <div className="text-xl text-white">
             <span className="opacity-60">Home / catalog / </span> 
             <span className="text-yellow-300">{heading}</span>
           </div>
     
           {/* about div */}
           <div className="  flex flex-col justify-start items-start gap-5">
             <Heading text={heading} variant="primary" size="md"/>
             <p className="text-xl text-white opacity-60">{desc}</p>
           </div>
        </div>

    </div>
  )
}

export default AboutCourse;
