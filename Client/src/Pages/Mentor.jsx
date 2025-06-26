import React, { useState } from "react";
import PageHeading from "./../Components/PageHeading";
import { BiCategoryAlt } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { useTaskContext } from "../Context/Task_Context";
import Members from "../Common/Members";
import MainLoader from "../UI/MainLoader";
import useCatagory from "../Hook/Function/useCatagory";
import Catagory from "../Common/Catagory";
import Filter from "../Common/Filter";
import { motion } from "framer-motion";

const Mentor = () => {
  const {
    allUserData,
    alluserLoading,
    searchMentors,
    filteredMembers,
    handleMentorCategory,
    setSearchMentors,
  } = useTaskContext();

  const mentorCatagory = useCatagory(allUserData?.alluser, "role");

  const [isCategory, setisCategory] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isMobileFilter, setisMobileFilter] = useState(false);

  if (alluserLoading) {
    return (
      <div className="fixed z-[99999] top-0 left-0 w-screen h-screen cc">
        <MainLoader />
      </div>
    );
  }
  return (
    <div className="w-full flex items-center flex-col">
      <div className="md:bg-white page_height_gap w-full cc md:border-b md:border-b-gray-100">
        <div className="container">
          <PageHeading text={`All Mentors`} />
          <div className="flex items-center justify-between gap-5 mt-7">
            {/* searchMentors */}
            <div className="md:w-[30%] w-full rounded-md border-2 border-gray-200 overflow-hidden relative cc">
              <input
                type="text"
                name="searchMembers"
                onChange={(e) => {
                  setSearchMentors(e.target.value);
                }}
                value={searchMentors}
                placeholder="Search Mentors"
                className="w-full h-full text-lg px-3 py-2 border-0 outline-0"
              />
              <FaSearch className="absolute right-3 text-gray-500" />
            </div>

            {/* filter */}
            <div className="md:flex items-center justify-center gap-[3rem] hidden">
              <button
                type="button"
                onClick={() => {
                  setisCategory(true);
                }}
                className="border-2 border-gray-200 rounded-md py-2 px-[1rem] flex items-center justify-center gap-2 text-md cursor-pointer"
              >
                <BiCategoryAlt className="text-gray-400 text-2xl" />
                Category
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFilter(true);
                }}
                className="border-2 border-gray-200 rounded-md py-2 px-[1rem] flex items-center justify-center gap-2 text-md cursor-pointer"
              >
                <IoFilterSharp className="text-gray-400 text-2xl" />
                Search By Filter
              </button>
            </div>

            <div
              className="block md:hidden border-2 border-gray-200 p-2 rounded-md"
              onClick={() => {
                setisMobileFilter(true);
              }}
            >
              <HiAdjustmentsHorizontal className="text-xl text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full cc h-full overflow-y-scroll pb-[5rem]">
        <div className="container">
          {/* ALL Mentors */}
          <div className="mt-5 w-full h-full">
            <h2 className="text-2xl font-medium">Mentors</h2>
            {filteredMembers?.length !== 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-[2rem] pb-5">
                {filteredMembers &&
                  filteredMembers.map((cur, id) => {
                    return (
                      <Members key={id} id={id} data={cur} fixWidth={false} />
                    );
                  })}
              </div>
            ) : (
              <div className=" cc w-full mt-[5rem] font-semibold text-2xl">
                {" "}
                No Mentor Found
              </div>
            )}
          </div>
        </div>
      </div>

      {isCategory && (
        <div className="fixed z-[99999] top-0 left-0 w-screen h-[100dvh] bg-[rgba(0,0,0,0.5)] flex justify-end cursor-pointer">
          <div
            className="w-[80%] h-full"
            onClick={() => {
              setisCategory(false);
            }}
          ></div>
          <motion.div
            className="bg-white h-full w-[20%] bss px-5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Catagory
              name="Category"
              data={["all", ...mentorCatagory]}
              fn={handleMentorCategory}
              setisCategory={setisCategory}
            />
          </motion.div>
        </div>
      )}

      {isFilter && !isCategory && (
        <div className="fixed hidden  z-[99999] top-0 left-0 w-screen h-[100dvh] bg-[rgba(0,0,0,0.5)] md:flex justify-end cursor-pointer">
          <div
            className="w-[80%] h-full"
            onClick={() => {
              setIsFilter(false);
            }}
          ></div>
          <motion.div
            className="bg-white h-full w-[20%] bss px-5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Filter name="Sort by" setIsFilter={setIsFilter} />
          </motion.div>
        </div>
      )}

      {isMobileFilter && (
        <div className="fixed z-[99999] top-0 left-0 w-screen h-[100dvh] bg-[rgba(0,0,0,0.5)] flex justify-end cursor-pointer md:hidden ">
          <div
            className="w-[20%]"
            onClick={() => {
              setisMobileFilter(false);
            }}
          ></div>
          <motion.div
            className="flex gap-5 bg-white h-full w-[80%] bss p-5 flex-col overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div>
              <Catagory
                name="Category"
                data={[...mentorCatagory]}
                fn={handleMentorCategory}
                setisCategory={setisMobileFilter}
              />
            </div>
            <div>
              <Filter name="Sort by" setIsFilter={setisMobileFilter} />
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Mentor;
