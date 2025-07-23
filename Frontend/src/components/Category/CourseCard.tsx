// File: CourseCard.jsx or CourseCard.tsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({data} : any) => {
    // destructure data
    const {courseName , instructor , TotalNumberRated , totalSum , price , _id} = data;
    console.log(instructor);
    
    const calAvgRating = () => {
        const rating = totalSum / TotalNumberRated;
        return rating;
    }

    let rating = 0;
    useEffect(() => {
         rating = calAvgRating();
    } , [totalSum , TotalNumberRated])

    console.log("Inside Single Course card -> " , data);

  return (
    <Link to={`/course/${_id}`} className="w-85 min-h-[350px] rounded-xl overflow-hidden bg-gray-900 shadow-lg transition-alsl duration-400 hover:scale-110 cursor-pointer">

      <div className="relative">
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8e36ZbCu562FVEK3XF-KoLEzjCVtQUPHJA&s' // Replace with actual path
          alt="img"
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          Bestseller
        </span>
      </div>

    <div className="p-4">
       <h2 className="text-md font-semibold text-white mb-2">
         {courseName}
       </h2>

        <p className="text-sm text-gray-400">{`${instructor.firstName} ${instructor.lastName}`}</p>

  <div className="flex items-center gap-1 mt-2">
    <span className="text-yellow-500 font-semibold">{rating}</span>
    {[...Array(4)].map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-yellow-400 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
      </svg>
    ))}
    <svg
      className="w-4 h-4 text-yellow-400 stroke-current fill-none"
      viewBox="0 0 20 20"
      strokeWidth="1"
    >
      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
    </svg>
    <span className="text-sm text-gray-400 ml-2">({TotalNumberRated})</span>
  </div>

  <p className="text-lg font-bold mt-2 text-white">{`Rs. ${price}`}</p>
</div>

    </Link>
  );
};

export default CourseCard;

