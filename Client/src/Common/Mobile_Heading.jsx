import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import { useGlobalContext } from "../Context/GlobalContext";
import { Link } from "react-router-dom";
const Mobile_Heading = () => {
  const { profileData, setMenuOpen } =useGlobalContext();
  
  return (
    <div className="flex items-center justify-center z-[10] top-0 h-[4rem] bg-background fixed w-screen">
      <div className="container h-full flex items-center justify-between ">
        <div className="relative z-[11] cursor-pointer">
          <FaBarsStaggered
            className="text-2xl"
            onClick={() => {
              setMenuOpen(true);
            }}
          />
        </div>
        <div className="flex gap-5 items-center justify-center">
          <div className="relative cursor-pointer">
            <CiBellOn className="text-[1.7rem]" />
            <div className="absolute bg-red-600 w-4 h-4 text-white cc text-[.7rem] -top-1 right-0 rounded-full">1</div>
          </div>
          <Link to={"profile"} className="overflow-hidden rounded-full bg-gray w-[2.5rem] h-[2.5rem] cursor-pointer">
            <img
              src={
                profileData?.profile?.image
              }
              alt=" profile logo"
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mobile_Heading;
