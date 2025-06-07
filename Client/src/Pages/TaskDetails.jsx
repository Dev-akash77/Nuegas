import React, { useState } from "react";
import PageHeading from "./../Components/PageHeading";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../Api/GlobalApi";
import MainLoader from "../UI/MainLoader";
import clockIcon from "../assets/clock.svg";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegSquare } from "react-icons/fa6";
import { useGlobalContext } from "../Context/GlobalContext";
import { FiExternalLink } from "react-icons/fi";

const TaskDetails = () => {
  const { id } = useParams();
  const { profileData, profileRefetch } = useGlobalContext();
  const [imageLoading, setimageLoading] = useState(true);
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
    userId,
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
            {imageLoading && (
              <div className="w-full h-[18rem] bg-gray-100 rounded-2xl cc">
                Image Loading....
              </div>
            )}
            <img
              src={image}
              alt={title}
              onLoad={() => {
                setimageLoading(false);
              }}
              loading="lazy"
              className="w-full h-[18rem] object-cover rounded-2xl"
            />

            <div className="flex items-center justify-between mt-5">
              <h2 className="md:text-4xl text-lg font-medium">{heading}</h2>
              <button className="md:h-[2.5rem] md:w-[8rem] h-[2rem] w-[7rem] text-sm md:text-default flex items-center justify-center gap-2 bg-dark-600 rounded-md text-white capitalize">
                <p className="text-white">{progress} Task</p>
              </button>
            </div>
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
            <div className="flex flex-col gap-3 pb-10">
              {assesment.map((cur) => {
                return (
                  <div
                    className="flex items-center gap-2 mt-3 md:text-xl text-lg"
                    key={cur?._id}
                  >
                    <FaRegSquare className="cursor-pointer text-gray-400" />
                    {cur.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* right section */}
          <form className="md:w-[35%] bg-white h-full p-5 rounded-xl border-2 border-gray-200 md:mb-0 mb-10">
            <div className="flex items-center justify-between gap-5 mt-3">
              <h2 className="md:text-xl md:font-light">Assigned Assignments</h2>
              {(profileData?.profile.role === "admin" ||
                profileData?.profile._id === userId) && (
                <div className="bg-default py-2 px-4 rounded-md flex items-center justify-center cursor-pointer text-white gap-1">
                  <RiDeleteBin6Line className="text-lg" />
                  Delete
                </div>
              )}
            </div>

            <hr className="my-5 text-gray-400" />

            <h2 className="text-3xl font-medium mt-3">{heading}</h2>
            <p className="text-lg text-gray-500 py-2">{title}</p>

            <hr className="text-gray-400 my-5" />

            <h2 className="text-2xl font-medium">Detail Student</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 mt-2">
                <p className="text-lg text-gray-600">Student Name :</p>
                <p className="text-black text-lg">
                  {profileData?.profile.name}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg text-gray-600">Professions :</p>
                <p className="text-black text-lg">
                  {profileData?.profile.professions}
                </p>
              </div>
            </div>

            <hr className="text-gray-400 my-5" />

            <h2 className="text-2xl font-medium">Attachments</h2>

            <div className="flex flex-col gap-2 mt-2">
              {attachments.map((cur, id) => {
                const isCloudinaryImage = cur.link.includes("cloudinary");

                return (
                  <div key={id} className="flex items-center gap-2">
                    <p className="text-blue-600">{id + 1})</p>

                    {!isCloudinaryImage ? (
                      <a
                        href={cur.link}
                        target="_blank"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span className="text-base">View Link</span>
                        <FiExternalLink className="text-xl" />
                      </a>
                    ) : (
                      <img
                        src={cur.link}
                        alt="task attachment image"
                        loading="lazy"
                        className="w-[5rem] h-[5rem] object-cover rounded-md border"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <hr className="text-gray-400 my-5" />
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
