// import React from "react";


// components/StepTracker.tsx
export default function StepTracker() {
  return (
    <div className="flex items-center gap-8 mb-6 w-[45vw] border">
      <div className="flex items-center text-yellow-400 font-semibold">
        <span className="border border-yellow-400 rounded-full px-2 py-1">1</span>
        <span className="ml-2">Course Information</span>
      </div>
      <div className="text-gray-400">2. Course Builder</div>
      <div className="text-gray-400">3. Publish</div>
    </div>
  );
}