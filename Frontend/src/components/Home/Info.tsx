import Button from "../commons/Button";

export default function Info() {
  return (
    <div className="flex flex-col justify-center flex-1 px-8 py-10">
      <h2 className="text-4xl font-bold leading-tight">
        Unlock your <span className="text-cyan-400">coding potential</span> with our online courses.
      </h2>
      <p className="mt-4 text-gray-400 text-lg leading-relaxed">
        Our courses are designed and taught by industry experts who have years of experience in coding
        and are passionate about sharing their knowledge with you.
      </p>
      <div className="flex gap-4 mt-6">
        <Button
          variant="primary"
          size="lg"
          text="Try it Yourself"
          className="hover:scale-110 transform transition duration-300 ease-in-out"
        />
        <Button
          variant="secondary"
          size="lg"
          text="Learn More"
          className="hover:bg-gray-600 hover:scale-110 transform transition duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}

