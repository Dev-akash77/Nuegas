import React, { memo, useMemo, useState } from "react";
import noteIcon from "../assets/note-2.svg";
import { FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import toast from "react-hot-toast";
import { api } from "../Api/GlobalApi";
import { useGlobalContext } from "../Context/GlobalContext";
import { useTaskContext } from "../Context/Task_Context";

const Members = ({ data, fixWidth }) => {
  // ! Memoized optimized image URL
  const optimizedImage = useMemo(() => {
    if (!data?.image || !data.image.includes("cloudinary")) return data?.image;
    return data.image.replace("/upload/", "/upload/c_fill,q_auto,f_auto/");
  }, [data?.image]);

  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
  const { profileRefetch, profileData } = useGlobalContext();
  const {topUserRefetch} = useTaskContext();

  // ! Handle role change request
  const handleClickRole = async (role) => {
    try {
      const res = await api.put("/user/role", {
        id: data?._id,
        role,
      });
      console.log(res);

      if (res?.data?.success) {
        toast.success(res?.data?.message || "Role updated");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsOpenAdmin(false);
      profileRefetch();
      topUserRefetch();
    }
  };

  return (
    <div
      className={`bg-white px-4 py-4 w-full relative ${
        fixWidth ? "md:w-[22rem]" : ""
      } flex-shrink-0 rounded-md flex flex-col justify-center gap-5 box_shadow cursor-pointer`}
    >
      {profileData?.profile?.role === "admin" && data.role != "admin" && (
        <BsThreeDots
          className="absolute top-3 right-3 text-xl"
          onClick={() => {
            setIsOpenAdmin(!isOpenAdmin);
          }}
        />
      )}

      {isOpenAdmin && (
        <div className="absolute top-8 right-2 w-[50%] rounded-md border-gray-200 border-2 overflow-hidden z-[999]">
          <p
            className="bg-white w-full p-2 border-b-2 border-b-gray-300"
            onClick={() => handleClickRole("coordinator")}
          >
            Make as coordinator
          </p>
          <p
            className="bg-white w-full p-2"
            onClick={() => handleClickRole("employee")}
          >
            Make as employee
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <img
          loading="lazy"
          src={optimizedImage}
          alt="mentor image"
          className="w-[3rem] h-[3rem] rounded-full overflow-hidden aspect-square object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-xl font-medium capitalize">{data?.name}</p>
          <p className="text-[.8rem] text-gray-600">{data?.professions}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={noteIcon} alt="note icon" loading="lazy" />
          <p>{data?.tasks?.length || 0} Task</p>
        </div>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <p>({data?.totalStar || 0} Point)</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Members);
