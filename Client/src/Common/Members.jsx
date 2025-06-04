import React from "react";
import noteIcon from "../assets/note-2.svg";
import { FaStar } from "react-icons/fa";

const Members = ({ data, fixWidth }) => {
  return (
    <div
      className={`bg-white px-4 py-4 ${
        fixWidth && "md:w-[22rem]"
      } flex-shrink-0 rounded-md flex flex-col justify-center gap-5 box_shadow cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <img
          loading="lazy"
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
          <img src={noteIcon} alt="note icon" loading="lazy" />
          <p>{data.tasks.length} Task</p>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <p>({data.totalStar} Point)</p>
        </div>
      </div>
    </div>
  );
};

export default Members;
