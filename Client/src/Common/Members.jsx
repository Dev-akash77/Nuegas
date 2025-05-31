import React from "react";
import noteIcon from "../assets/note-2.svg";
import { FaStar } from "react-icons/fa";
import Use_Slie_Up from "../Hook/Animation/Use_Slie_Up";
import { motion } from "framer-motion";

const Members = ({ id, data, fixWidth }) => {
  const slideUp = Use_Slie_Up(40, 0.5, id * 0.3);
  return (
    <motion.div
      className={`bg-white px-4 py-4 ${
        fixWidth && "md:w-[22rem]"
      } flex-shrink-0 rounded-md flex flex-col justify-center gap-5 box_shadow cursor-pointer`}
      {...slideUp}
    >
      <div className="flex items-center gap-3">
        <img
          src={data.image}
          alt="mentor image"
          className="w-[3rem] h-[3rem] rounded-full overflow-hidden aspect-square object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xl font-medium capitalize">{data.name}</p>
          <p className="text-[.8rem] text-gray-600">{data.professions}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={noteIcon} alt="note icon" />
          <p>{data.tasks.length} Task</p>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <p>({data.totalStar} Point)</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Members;
