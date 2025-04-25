import React from "react";
import clockIcon from "../assets/clock.svg";
import Stacked_Avtar from "./Stacked_Avtar";
import Use_Slie_Up from "../Hook/Animation/Use_Slie_Up";
import { motion } from 'framer-motion';

const Taks_upcoming = ({ id, cur }) => {
  const slideUp = Use_Slie_Up(40, 0.7, id * 0.3);
  const progress = 45;
  const imgarr = [1, 2, 3, 4, 3, 4, 5, 6];
  return (
    <motion.div className="bg-white box_shadow pb-5 md:w-[22rem] flex-shrink-0 rounded-xl flex flex-col justify-center overflow-hidden cursor-pointer" {...slideUp}>
      <img
        src="https://img.freepik.com/free-photo/senior-people-school-class-with-laptop-computer_23-2150105052.jpg?uid=R116023977&ga=GA1.1.2031197760.1743010026&semt=ais_hybrid&w=740"
        alt="task image"
        className="w-full h-[10rem] object-cover object-center"
      />
      <div className="px-4 pt-3">
        <h2 className="text-xl font-medium">Creat a Mobile app design</h2>
        <p className="text-gray-600">UI/UX Design</p>
        <div className="flex items-center justify-between">
          <p className="text-xl mt-1">Progress</p>
          <p className="text-default">{progress}%</p>
        </div>

        {/* progress */}
        <div className="bg-light-100 rounded-full w-full h-[.5rem] mt-2">
          <div
            className="bg-default h-full rounded-full duration-300 relative pseudo_progress cc"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <img src={clockIcon} alt="clock icon" />
            <p>{3} Days Left</p>
          </div>
          <Stacked_Avtar arr={imgarr} imageperview={4} />
        </div>
      </div>
    </motion.div>
  );
};

export default Taks_upcoming;
