// import React from 'react'

// SectionAndSubsectionHeading.tsx
// SectionAndSubsectionHeading.tsx
function SectionAndSubsectionHeading({ heading }: { heading: string }) {
  return (
    <div className="flex items-center gap-2 font-medium text-gray-200">
      📁 {heading}
    </div>
  );
}

export default SectionAndSubsectionHeading;

