
import MenuBar from "../components/commons/MenuBar";

function MyProfile() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const { firstName, lastName } = user || {};

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Navbar / Menu */}
      <MenuBar />

      {/* Greeting Banner */}
      <div className="w-[85%] bg-gray-900 shadow-md py-6 px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Welcome,
          <span className="text-yellow-400 ml-2">
            {firstName} {lastName}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default MyProfile;


