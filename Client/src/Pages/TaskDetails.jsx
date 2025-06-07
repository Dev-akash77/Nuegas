import React from "react";
import PageHeading from "./../Components/PageHeading";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../Api/GlobalApi";
import MainLoader from "../UI/MainLoader";
import clockIcon from "../assets/clock.svg";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useGlobalContext } from "../Context/GlobalContext";

const TaskDetails = () => {
  const { id } = useParams();
  const {profileData, profileRefetch } = useGlobalContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["taskDetails", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="fixed z-[99999] top-0 left-0 w-screen h-screen cc">
        <MainLoader />
      </div>
    );
  }

  const {
    title,
    description,
    image,
    deadline,
    heading,
    members,
    assesment,
    attachments,
    priority,
    progress,
    createdAt,
  } = data?.task || {};

  // ! Calculate days left from deadline
  const getSmartTimeLeft = (deadlineStr) => {
    if (!deadlineStr) return "Invalid deadline";

    const deadline = new Date(deadlineStr);
    const now = new Date();

    const diffMs = deadline - now;
    if (diffMs <= 0) return "Deadline passed";

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30); // rough approx

    if (diffMonths >= 1) {
      return `${diffMonths} Month${diffMonths > 1 ? "s" : ""}`;
    } else if (diffDays >= 1) {
      return `${diffDays} Day${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours >= 1) {
      return `${diffHours} Hour${diffHours > 1 ? "s" : ""}`;
    } else {
      return `${diffMinutes} Minute${diffMinutes > 1 ? "s" : ""}`;
    }
  };

  const daysLeft = getSmartTimeLeft(deadline);

  return (
    <>
      <div className="w-full h-full flex items-center flex-col justify-between overflow-hidden">
        <div className="md:bg-white page_height_gap w-full cc">
          <div className="container">
            <PageHeading text={`Detail Task`} />
          </div>
        </div>
        <div className="container flex md:flex-row flex-col items-center justify-between md:gap-[3rem] pt-[1rem] overflow-y-scroll">
          {/* left section */}
          <div className="md:w-[65%] md:h-full">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-[18rem] object-cover rounded-2xl"
            />
            <h2 className="text-4xl font-medium mt-5">{heading}</h2>
            <p className="text-lg text-gray-500 py-2">{title}</p>
            <div className="flex items-center justify-start gap-4">
              <div className="flex items-center justify-start gap-2 text-xl">
                <HiOutlineUsers />
                {members.length} Students Involved
              </div>

              <div className="flex items-center justify-start gap-1 text-xl">
                <img src={clockIcon} alt="clock avatar" />
                {daysLeft}
              </div>
            </div>

            <h2 className="mt-5 py-2 text-2xl font-medium">Description</h2>
            <p className="text-[1rem] text-gray-500">{description}</p>
            <h2 className="mt-5 py-2 text-2xl font-medium">
              Essence of Assessment
            </h2>
            <div className="flex flex-col gap-2 pb-10">
              {assesment.map((cur) => {
                return (
                  <div
                    className="flex items-center gap-2 mt-3 text-xl"
                    key={cur?._id}
                  >
                    <MdOutlineRadioButtonUnchecked className="text-blue-500 cursor-pointer" />
                    {cur.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* right section */}
          <form className="md:w-[35%] bg-white h-full p-5 rounded-xl mb-5">
            <h2 className="text-xl font-light mt-3">Assigned Assignments</h2>
            <h2 className="text-3xl font-medium mt-3">{heading}</h2>
            <p className="text-lg text-gray-500 py-2">{title}</p>

            <h2 className="text-2xl font-medium mt-3">Detail Student</h2>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3 mt-3">
                    <p className="text-lg text-gray-600">Student Name</p>
                    <p className="text-black text-lg">{profileData?.profile.name}</p>
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                    <p className="text-lg text-gray-600">Student Professions</p>
                    <p className="text-black text-lg">{profileData?.profile.professions}</p>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
