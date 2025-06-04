import React, { useEffect, useState } from "react";
import clockIcon from "../assets/clock.svg";
import Stacked_Avtar from "./Stacked_Avtar";

//! In-memory cache to avoid duplicate API calls for same title

const Taks_upcoming = ({data }) => {


  // ! Calculate progress from data.assessment
  const totalTasks = data?.assessment?.length || 0;
  const completedTasks =
    data?.assessment?.filter((item) => item.checked)?.length || 0;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // ! Calculate days left from deadline
  const calculateDaysLeft = (deadlineStr) => {
    if (!deadlineStr) return 0;
    const deadline = new Date(deadlineStr);
    const today = new Date();
    deadline.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = deadline - today;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const daysLeft = calculateDaysLeft(data?.deadline);


  return (
    <div
      className="bg-white border-gray-200 border-2 p-5 md:w-[22rem] flex-shrink-0 rounded-2xl flex flex-col justify-center cursor-pointer"
    >
      <img
       loading="lazy"
        src={data?.image}
        alt="task image"
        className="w-full h-[10rem] object-cover object-center rounded-2xl"
      />
      <div className="pt-3">
        <h2 className="text-xl font-medium">{data?.title}</h2>
        <p className="text-gray-600">{data?.heading}</p>

        <div className="flex items-center justify-between">
          <p className="text-xl mt-1">Progress</p>
          <p className="text-default">{progress}%</p>
        </div>

        <div className="bg-light-100 rounded-full w-full h-[.5rem] mt-2">
          {progress !== 0 && (
            <div
              className="bg-default h-full rounded-full duration-300 relative pseudo_progress cc"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <img src={clockIcon} alt="clock icon" />
            <p>{daysLeft} Days Left</p>
          </div>
          <Stacked_Avtar arr={data?.members} imageperview={3} />
        </div>
      </div>
    </div>
  );
};

export default Taks_upcoming;
