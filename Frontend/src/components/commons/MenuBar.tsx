// import { useState } from "react";
import IconHeading from "./IconHeading";
import { LuCircleUserRound } from "react-icons/lu";
import { GiGraduateCap } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";

function MenuBar() {;

  const headings = [
    { text: "My Profile", path : "/dashboard/my-profile" , icon: <LuCircleUserRound /> },
    { text: "Enrolled Courses", path : "/dashboard/enrolled-courses" , icon: <GiGraduateCap /> },
    { text: "Cart", path : "/dashboard/cart" , icon: <TiShoppingCart /> },
  ];

  const settings = [
    { text: "Setting", path : "/dashboard/setting" , icon: <IoSettingsOutline /> },
    { text: "Logout", path : "/login" , icon: <ImExit /> },
  ];

  return (
    <div className="border-r-1 border-gray-500 bg-gray-800 flex flex-col items-start gap-10 pl-6 pt-15 pr-10 w-[15vw] h-[92vh]">
      <div className="flex flex-col items-start gap-5 w-full text-xl">
        {headings.map((heading , index) => (
          <IconHeading
            key={index}
            {...heading}
          />
        ))}
      </div>

      <hr className="text-white bg-gray-200 w-full" />

      <div className="flex flex-col items-start gap-10 w-full text-xl">
        {settings.map((heading , index) => (
          <IconHeading
            key={index}
            {...heading}
            // isActiveHeading={activeId === heading.id}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuBar;

