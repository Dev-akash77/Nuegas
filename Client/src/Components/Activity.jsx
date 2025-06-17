import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMotionValue, animate, motion } from "framer-motion";
import UseZoomIn from "../Hook/Animation/UseZoomIn";
import { useGlobalContext } from "../Context/GlobalContext";

const Activity = () => {
  const { stat_ChartData } = useGlobalContext();

  const progress = useMotionValue(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    const progressValue = stat_ChartData?.data?.TaskProgress;

    if (typeof progressValue !== "number") return;

    const controls = animate(progress, progressValue, {
      duration: 3,
      ease: "linear",
      onUpdate: (latest) => setDisplayedProgress(Math.round(latest)),
    });

    return () => controls.stop();
  }, [stat_ChartData?.data?.TaskProgress]);

  // !motion animation
  const zoomIn = UseZoomIn(0.5, 0.3);
  return (
    <motion.div
      className="bg-black md:w-[12rem] w-full rounded-lg text-white md:py-5 md:px-5 py-5 px-5 flex flex-row md:flex-col items-center justify-between"
      {...zoomIn}
    >
      <div>
        <h2 className="text-lg">Running Task</h2>
        <p className="md:my-6 my-2 text-4xl font-medium">
          {stat_ChartData?.data.ongoingTaks}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Circular Progress Bar */}
        <div className="w-[5rem] h-[5rem] relative">
          {/* Background Trail */}
          <div className="absolute top-0 left-0 w-full h-full">
            <CircularProgressbarWithChildren
              value={100}
              strokeWidth={4}
              styles={buildStyles({
                pathColor: "#1f2937",
                trailColor: "#1f2937",
              })}
            />
          </div>

          {/* Blue Animated Bar */}
          <div className="absolute top-0 left-0 w-full h-full">
            <CircularProgressbarWithChildren
              value={displayedProgress}
              strokeWidth={5}
              styles={buildStyles({
                pathColor: "#3b82f6",
                trailColor: "transparent",
                strokeLinecap: "round",
              })}
            >
              <div className="text-white text-xl font-semibold">
                {displayedProgress}%
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>

        {/* Task Count */}
        <div>
          <p className="text-2xl font-medium">
            {stat_ChartData?.data.totalTask}
          </p>
          <p className="text-gray-400 text-md">Task</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Activity;
