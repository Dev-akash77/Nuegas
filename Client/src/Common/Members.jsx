import React from "react";
import noteIcon from "../assets/note-2.svg";
import { FaStar } from "react-icons/fa";
import Use_Slie_Up from "../Hook/Animation/Use_Slie_Up";
import { motion } from "framer-motion";

const Members = ({id,cur}) => {    
  const slideUp = Use_Slie_Up(40, 0.5,id*0.3);
  return (
    <motion.div
      className="bg-white px-4 py-4 md:w-[22rem] flex-shrink-0 rounded-md flex flex-col justify-center gap-5 box_shadow cursor-pointer"
      {...slideUp}
    >
      <div className="flex items-center gap-3">
        <img
          src="https://res.cloudinary.com/dekfjauox/image/upload/v1745469974/Qubiko_User/yn8vmoysy2evbjpnffwh.webp"
          alt="mentor image"
          className="w-[3rem] h-[3rem] rounded-full"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xl font-medium">Akash Biswas</p>
          <p className="text-[.8rem] text-gray-600">Software Developer</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={noteIcon} alt="note icon" />
          <p>40 Task</p>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <p>(300 Reviews)</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Members;
