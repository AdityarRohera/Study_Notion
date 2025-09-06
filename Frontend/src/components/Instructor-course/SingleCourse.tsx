// import { Pencil, Trash2 } from "lucide-react"; // icons
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getSingleCourse } from "../../Services/operations/instructorUtilis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../Services/operations/common";
import { Clock, Check } from "lucide-react";


export default function SingleCourse({data} : any) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { courseName, courseDesc, price, thumbnail, totalLength, status , _id} = data;

    const editCourseHandler = async() => {
        const res = await getSingleCourse(dispatch , _id);
        if(res){
          console.log("Inside edit course handler -> " , res);
          navigate(`/dashboard/mycourse/course-info/${_id}`);
        }
    }

  return (
    <div className="w-full bg-[#111827] text-white rounded-2xl shadow-lg flex items-center justify-between p-6 mb-6">
      {/* Left: Thumbnail + Course Info */}
      <div className="flex items-start gap-6">
        {/* Thumbnail */}
        <div className="w-[240px] h-[150px] flex-shrink-0">
          <img
            className="w-full h-full rounded-xl object-cover"
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOL5IjRU4P_EpCVcLApC1YDo_cxASRWErmJw&s"
            src={thumbnail}
            alt="course thumbnail"
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col gap-3 w-[400px]">
          <h2 className="text-2xl font-bold text-white">
            {courseName}
          </h2>
          <p className="text-gray-300 text-base leading-relaxed">
            {courseDesc}
          </p>
          <span className="text-sm text-gray-400">
            Created: <span className="font-medium">April 27, 2023 | 05:15 PM</span>
          </span>

          {/* Status Badge */}
           <span
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold w-fit
                ${status === "Draft" ? "bg-red-500 text-white" : "bg-yellow-400 text-black"}
              `}
           >
                {status === "Draft" ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {status}
           </span>
           
        </div>
      </div>

      {/* Right: Duration / Price / Actions */}
      <div className="flex items-center gap-20 mr-10">
        <span className="text-lg font-semibold text-gray-200">{formatDuration(totalLength)}</span>
        <span className="text-lg font-bold text-green-400">₹{price}</span>

        {/* Actions */}
        <div className="flex gap-4">
          <button onClick={editCourseHandler} className="hover:text-blue-400 transition cursor-pointer">
            {/* <Pencil size={22} /> */}
            <MdEdit className="text-2xl" />
          </button>

          <button className="hover:text-red-400 transition cursor-pointer">
            {/* <Trash2 size={22} /> */}
            <RiDeleteBin6Line className="text-2xl" />
          </button>

        </div>
      </div>
    </div>
  );
}


// export default SingleCourse;



