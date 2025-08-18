

// components/CourseTips.tsx
export default function CourseTips() {
  return (
    <div className="bg-[#1f2937] text-white p-4 rounded-md shadow-md max-w-md">
      <h2 className="text-yellow-400 text-lg font-semibold mb-2">
        ✨ Course Upload Tips
      </h2>
      <ul className="list-disc list-inside text-sm space-y-1">
        <li>Set the Course Price option or make it free.</li>
        <li>Standard size for the course thumbnail is 1024x576.</li>
        <li>Video section controls the course overview video.</li>
        <li>Course Builder is where you create & organize a course.</li>
        <li>Add Topics in the Course Builder to create lessons, quizzes, and assignments.</li>
        <li>Info from the Additional Data section shows on the course single page.</li>
        <li>Make Announcements to notify any important notes to all enrolled students.</li>
      </ul>
    </div>
  );
}