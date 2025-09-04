import Heading from "../commons/Heading"


function AboutCourse({ heading, desc }: any) {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 px-10 py-8 w-full h-[30vh] flex items-center">
      <div className="flex flex-col justify-center gap-6 max-w-4xl w-full">
        
        {/* Breadcrumb */}
        <div className="text-gray-400 text-2xl flex items-center gap-1">
          <span className="hover:text-gray-200 cursor-pointer transition">Home</span>
          <span>/</span>
          <span className="hover:text-gray-200 cursor-pointer transition">Catalog</span>
          <span>/</span>
          <span className="text-yellow-400 font-semibold">{heading}</span>
        </div>

        {/* Main Heading and Description */}
        <div className="flex flex-col gap-3">
          <Heading text={heading} variant="primary" size="lg" />
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
            {desc}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AboutCourse;
