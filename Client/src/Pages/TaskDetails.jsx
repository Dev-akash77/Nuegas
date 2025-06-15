import React, { useEffect, useState } from "react";
import PageHeading from "./../Components/PageHeading";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, getTaskById } from "../Api/GlobalApi";
import MainLoader from "../UI/MainLoader";
import clockIcon from "../assets/clock.svg";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import TaskDetailsRight from "../Components/TaskDetailsRight";
import toast from "react-hot-toast";
import { useGlobalContext } from "../Context/GlobalContext";
import { useTaskContext } from "../Context/Task_Context";
import { useSocket } from "../Context/SocketContext";

const TaskDetails = () => {
  const { id } = useParams();
  const { profileData } = useGlobalContext();
  const { socket } = useSocket();
  const { allTaskRefetch,recentTaskRefetch } = useTaskContext();
  const [imageLoading, setimageLoading] = useState(true);
  const [taskassisment, setTaskAssisment] = useState([]);
  const [taskProgress, setTaskProgress] = useState("pending");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["taskDetails", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  const {
    title,
    description,
    image,
    deadline,
    heading,
    members,
    assesment,
    progress,
  } = data?.task || {};

  useEffect(() => {
    if (progress) {
      setTaskProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    if (assesment?.length) {
      setTaskAssisment([...assesment]);
    }
  }, [assesment]);

  // ! handle check task via socket
  //! join room on mount
  useEffect(() => {
    if (socket) {
      socket?.emit("join-task", id);
    }
    return () => {
      socket?.emit("leave-task", id);
    };
  }, [socket, id]);

  // !listen to update
  useEffect(() => {
    if (socket && id) {
      socket.on(
        "assessment-updated",
        ({ taskId: incomingTaskId, updatedAssessment }) => {
          if (incomingTaskId === id) {
            setTaskAssisment(updatedAssessment);
            refetch();
          }
        }
      );

      socket.on("progress-update-status", ({ progress }) => {
        setTaskProgress(progress);
      });
    }

    return () => {
      socket?.off("assessment-updated");
      socket?.off("progress-update-status");
    };
  }, [socket, id]);

  // ! handle check task
  const handleCheckTask = async (task) => {
    const currentUserId = profileData?.profile?._id;

    // ! Only the one who completed it can uncheck it
    if (task.checked && task.compleatedBy?.id !== currentUserId) {
      return toast.error("You are not allowed to uncheck this task");
    }

    try {
      const user = {
        name: profileData?.profile?.name,
        id: currentUserId,
        image: profileData?.profile?.image,
      };

      const updatedTasks = taskassisment.map((cur) => {
        if (cur._id === task._id) {
          const isNowChecked = !cur.checked;
          return {
            ...cur,
            checked: isNowChecked,
            compleatedBy: isNowChecked ? user : null,
          };
        }
        return cur;
      });

      setTaskAssisment(updatedTasks);

      const { data } = await api.put(`/task/assesment-update`, {
        taskId: id,
        _id: task._id,
      });

      if (data?.success) {
        refetch();
        allTaskRefetch();
        recentTaskRefetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed z-[99999] top-0 left-0 w-screen h-screen cc">
        <MainLoader />
      </div>
    );
  }

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
      <div className="w-full h-full flex items-center flex-col justify-between  overflow-y-auto">
        <div className="md:bg-white w-full page_height_gap cc">
          <div className="container">
            <PageHeading text={`Detail Task`} />
          </div>
        </div>

        <div className="w-full cc py-2">
          <div className="container  gap-[1rem] flex items-start md:justify-between justify-center md:flex-row flex-col pb-5">
            {/* right section */}
            <div className="md:w-[65%] bg-white pb-2 border-2 border-gray-200 rounded-xl overflow-hidden">
              {imageLoading && (
                <div className="w-full h-[18rem] bg-gray-100 rounded-2xl cc">
                  Image Loading....
                </div>
              )}
              <img
                src={image?.image}
                alt={title}
                onLoad={() => {
                  setimageLoading(false);
                }}
                loading="lazy"
                className="w-full h-[18rem] object-cover"
              />

              <div className="md:p-5 p-3">
                <div className="flex items-center justify-between">
                  <h2 className="md:text-4xl text-lg font-medium">{heading}</h2>
                  <button className="md:h-[2.5rem] md:w-[8rem] h-[2rem] w-[7rem] text-sm md:text-default flex items-center justify-center gap-2 bg-dark-600 rounded-md text-white capitalize">
                    <p className="text-white">{taskProgress} Task</p>
                  </button>
                </div>

                <p className="text-lg text-gray-500 py-2">{title}</p>
                <div className="flex items-center justify-start gap-4">
                  <div className="flex items-center justify-start gap-2 md:text-xl text-md">
                    <HiOutlineUsers />
                    {members.length} Students Involved
                  </div>

                  <div className="flex items-center justify-start gap-1 md:text-xl text-lg">
                    <img src={clockIcon} alt="clock avatar" />
                    {daysLeft}
                  </div>
                </div>

                <h2 className="mt-5 py-2 text-2xl font-medium">Description</h2>
                <p className="text-[1rem] text-gray-500">{description}</p>
                <h2 className="mt-5 py-2 text-2xl font-medium">
                  Essence of Assessment
                </h2>
                <div className="flex flex-col gap-3">
                  {taskassisment?.map((cur) => {
                    return (
                      <div
                        className="flex items-center gap-2 mt-3"
                        key={cur?._id}
                      >
                        <div
                          className="w-max"
                          onClick={() => {
                            handleCheckTask(cur);
                          }}
                        >
                          {cur.checked ? (
                            <FaCircleCheck className="cursor-pointer text-[1.3rem] text-default" />
                          ) : (
                            <MdRadioButtonUnchecked className="cursor-pointer text-[1.5rem] text-gray-400" />
                          )}
                        </div>

                        <p className=" md:text-xl text-lg"> {cur.name}</p>
                        {cur?.compleatedBy && cur?.compleatedBy?.image && (
                          <img
                            src={cur.compleatedBy.image}
                            alt="task user who completed"
                            loading="lazy"
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="md:w-[35%] w-full bg-white p-5 rounded-xl border-2 border-gray-200">
              <TaskDetailsRight data={data} refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
