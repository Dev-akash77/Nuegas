import React from "react";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckboxSharp } from "react-icons/io5";
import { useGlobalContext } from "../Context/GlobalContext";
import { useTaskContext } from "../Context/Task_Context";
import MainLoader from "../UI/MainLoader";
import { motion } from "framer-motion";

const Popup_Members = () => {
  const { setPopup } = useGlobalContext();
  const { taskMembers, setTaskMembers, allUserData, alluserLoading } =
    useTaskContext();

  if (alluserLoading) {
    return (
      <div className="h-full w-full cc">
        <MainLoader />
      </div>
    );
  }

  const handleOnclick = (user) => {
    setTaskMembers((prev) => {
      const exists = prev.some((u) => u.id === user._id);
      if (exists) {
        //! Remove if already selected
        return prev.filter((u) => u.id !== user._id);
      } else {
        //! Add new
        return [
          ...prev,
          {
            name: user.name,
            professions: user.professions,
            role: user.role,
            email: user.email,
            image: user.image,
            id: user._id,
          },
        ];
      }
    });
  };

  return (
    <motion.div
      className="bg-white rounded-md md:w-[35%] md:h-[80%] h-full w-full flex flex-col justify-between overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between pt-5 px-8">
        <h1 className="text-xl font-semibold">Select User</h1>
        <RxCross1
          className="cursor-pointer"
          onClick={() => {
            setTaskMembers([]);
            setPopup(false);
          }}
        />
      </div>

      <div className="flex items-center justify-between py-5 px-8">
        <input
          type="text"
          className="bg-gray-100 px-4 py-2 rounded-md w-full outline-0"
          placeholder="Search Users"
        />
      </div>

      <p className="border-gray-200 border w-full"></p>

      <div className="flex items-center flex-col py-5 px-8 h-full overflow-auto">
        {allUserData?.alluser.map((cur, id) => {
          return (
            <div
              className="border-y border-gray-200 flex justify-between items-center gap-2 w-full py-2 cursor-pointer hover:bg-gray-50 duration-300"
              key={cur._id}
              onClick={() => {
                handleOnclick(cur);
              }}
            >
              {/* user */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src={cur.image}
                  alt="user image"
                  className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden aspect-square object-cover"
                />
                <div>
                  <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                    <h2 className="md:text-xl text-md font-medium capitalize">
                      {cur.name}
                    </h2>
                    <span className="md:border border-gray-500 rounded-full md:w-[4rem] md:h-[1.2rem] flex md:items-center md:justify-center  text-[.7rem] text-gray-500">
                      {cur.role}
                    </span>
                  </div>
                  <p className="md:block hidden">{cur.email}</p>
                </div>
              </div>

              {/* check */}
              {taskMembers.some((u) => u.email === cur.email) ? (
                <IoCheckboxSharp className="text-xl" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank className="text-xl" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-end justify-end gap-3 px-5 py-3">
        <button
          type="button"
          className="bg-gray-100 px-5 py-2 rounded-md cursor-pointer"
          onClick={() => {
            setTaskMembers([]);
            setPopup(false);
          }}
        >
          Cancle
        </button>
        <button
          type="button"
          className="bg-default text-white px-5 py-2 rounded-md cursor-pointer"
          onClick={() => {
            setPopup(false);
          }}
        >
          Done
        </button>
      </div>
    </motion.div>
  );
};

export default Popup_Members;
