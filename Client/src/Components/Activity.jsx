import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { animate, motion, useMotionValue, useTransform } from "motion/react"

const Activity = () => {
  const percentage = 45; //! Circular progress percentage

  return (
    <div>
      {/* Total Task */}
      <div className="bg-dark-900 w-[12rem] rounded-lg text-white p-5">
        <h2 className="text-lg">Running Task</h2>
        <p className="my-6 text-4xl font-medium">65</p>

        <div className="flex items-center gap-4">
          {/* Circular Progress Bar */}
          <div className="w-[5rem] h-[5rem] relative">
            {/* Thin Trail Layer */}
            <div className="absolute top-0 left-0 w-full h-full">
              <CircularProgressbarWithChildren
                value={100}
                strokeWidth={4}
                styles={buildStyles({
                  pathColor: "#1f2937", // gray-800
                  trailColor: "#1f2937",
                })}
              />
            </div>

            {/* Thick Blue Layer */}
            <div className="absolute top-0 left-0 w-full h-full">
              <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={5}
                styles={buildStyles({
                  pathColor: "#3b82f6",
                  trailColor: "transparent",
                  strokeLinecap: "round",
                })}
              >
                <div className="text-white text-xl font-semibold">
                  {percentage}%
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>

          {/* Total task */}
          <div>
            <p className="text-2xl font-medium">100</p>
            <p className="text-light-300 text-md">Task</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Activity;
