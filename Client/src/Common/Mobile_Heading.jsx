import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import { useGlobalContext } from "../Context/GlobalContext";
const Mobile_Heading = () => {
    const {menuOpen,setMenuOpen} = useGlobalContext();
  return (
    <div className="flex items-center justify-center z-[10] top-0 h-[4rem] bg-background fixed w-screen">
      <div className="container h-full flex items-center justify-between ">
        <div className="relative z-[11] cursor-pointer">
          <FaBarsStaggered className="text-2xl" onClick={()=>{setMenuOpen(true)}}/>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <div className="relative cursor-pointer">
            <CiBellOn className="text-[1.7rem]" />
            <div className="absolute bg-red-600 p-1 top-0 right-1 rounded-full"></div>
          </div>
          <div className="overflow-hidden rounded-full bg-gray w-[2.5rem] h-[2.5rem] cursor-pointer">
            <img
              src={
                "https://res.cloudinary.com/dekfjauox/image/upload/v1744566405/Qubiko_User/dpm1rfllfyzyuwekz9sx.jpg"
              }
              alt=" profile logo"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile_Heading;
