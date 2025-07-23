// import React from 'react'

function BuyCourseCard() {
  return (
   <div className="w-[320px] bg-[#1C1D1F] rounded-lg overflow-hidden shadow-lg text-white absolute right-[10%] top-[35%]">
  <img
    src="https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg"
    alt="course-thumbnail"
    className="w-full h-[180px] object-cover"
  />

  <div className="p-4">
    <p className="text-white text-2xl font-bold">Rs. 1,200</p>

    <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded">
      Add to Cart
    </button>

    <button className="w-full mt-2 bg-[#2D2F31] hover:bg-[#3b3d40] text-white font-bold py-2 rounded border border-gray-600">
      Buy now
    </button>

    <p className="text-sm text-gray-400 mt-2 text-center">
      30-Day Money-Back Guarantee
    </p>

    <div className="mt-4">
      <p className="font-semibold mb-2">This course includes:</p>
      <ul className="space-y-1 text-sm text-green-400">
        <li className="flex items-center gap-2">
          ✅ 8 hours on-demand video
        </li>
        <li className="flex items-center gap-2">
          ✅ Full Lifetime access
        </li>
        <li className="flex items-center gap-2">
          ✅ Access on Mobile and TV
        </li>
        <li className="flex items-center gap-2">
          ✅ Certificate of completion
        </li>
      </ul>
    </div>

    <button className="mt-4 text-yellow-400 font-semibold text-sm hover:underline">
      Share
    </button>
  </div>
</div>

  )
}

export default BuyCourseCard
