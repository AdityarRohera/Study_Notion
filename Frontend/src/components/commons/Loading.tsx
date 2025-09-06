
import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div className="flex flex-col items-center">
        {/* Big Lucide Loader */}
        <Loader2 className="w-28 h-28 text-yellow-400 animate-spin drop-shadow-[0_0_15px_#facc15]" />

        {/* Stylish Loading Text */}
        <p className="mt-6 text-3xl md:text-4xl font-extrabold text-white tracking-wider">
          Loading
          <span className="text-yellow-400 animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
}

export default Loading;

