

function CourseContentCard({ title, subtitle, extra, image, onClick } : any) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-2xl shadow-lg p-6 cursor-pointer 
                 hover:scale-105 hover:shadow-xl transition-transform duration-300 w-full"
    >
      {/* Thumbnail / Image */}
      {image && (
        <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title & Subtitle */}
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-gray-400 mb-2">{subtitle}</p>}

      {/* Extra info (like duration, total lectures etc.) */}
      {extra && (
        <div className="text-sm text-gray-300 flex items-center justify-between">
          {extra}
        </div>
      )}
    </div>
  );
}

export default CourseContentCard;



