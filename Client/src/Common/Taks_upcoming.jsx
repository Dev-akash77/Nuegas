import React, { useMemo } from "react";
import clockIcon from "../assets/clock.svg";
import Stacked_Avtar from "./Stacked_Avtar";
import { useNavigate } from "react-router-dom";

const Taks_upcoming = React.memo(({ data }) => {
  const navigate = useNavigate();

  // ! Memoized progress calculation
  const progress = useMemo(() => {
    const total = data?.assessment?.length || 0;
    const completed =
      data?.assessment?.filter((item) => item.checked).length || 0;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [data?.assessment]);

  // ! Optimized deadline string
  const daysLeft = useMemo(() => {
    if (!data?.deadline) return "Invalid deadline";

    const deadline = new Date(data.deadline);
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) return "Deadline passed";

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    if (months >= 1) return `${months} Month${months > 1 ? "s" : ""}`;
    if (days >= 1) return `${days} Day${days > 1 ? "s" : ""}`;
    if (hours >= 1) return `${hours} Hour${hours > 1 ? "s" : ""}`;
    return `${minutes} Minute${minutes > 1 ? "s" : ""}`;
  }, [data?.deadline]);

  // ! Optimized Cloudinary image
  const getOptimizedImage = (url) => {
    if (!url?.includes("cloudinary")) return url;
    return url.replace("/upload/", "/upload/w_400,h_250,c_fill,q_auto,f_auto/");
  };

  return (
    <div
      onClick={() => navigate(`/task/${data?._id}`)}
      className="bg-white border-gray-200 border-2 p-5 md:w-[22rem] w-full flex-shrink-0 rounded-2xl flex flex-col justify-center cursor-pointer"
    >
      <img
        loading="lazy"
        src={getOptimizedImage(data?.image)}
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
            <p>{daysLeft} Left</p>
          </div>
          <Stacked_Avtar arr={data?.members} imageperview={3} />
        </div>
      </div>
    </div>
  );
});

export default Taks_upcoming;
