import { useState } from "react";
import { useTaskContext } from "./../Context/Task_Context";
import PageHeading from "../Components/PageHeading";
import { FaSearch } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import Taks_upcoming from "../Common/Taks_upcoming";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import MainLoader from "../UI/MainLoader";
import useSearch from "../Hook/Function/useSearch";
import Catagory from "../Common/Catagory";
import TaskCategory from "../Components/TaskCategory";
import { motion } from "framer-motion";
import FilterTasks from "../Components/FilterTasks";

const Task = () => {
  const { allTaskLoading, filterTasks, search, setSearch, handleClearTask } =
    useTaskContext();
  const [isCategory, setisCategory] = useState(false);
  const [isFilter, setisFilter] = useState(false);
  const [isMobileFilter, setisMobileFilter] = useState(false);

  if (allTaskLoading) {
    return (
      <div className="fixed z-[99999] top-0 left-0 w-screen h-screen cc">
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center flex-col justify-between">
      <div className="md:bg-white page_height_gap w-full cc md:border-b md:border-b-gray-100">
        <div className="container">
          <PageHeading text={`Explore Task`} />
          <div className="flex items-center justify-between gap-5 mt-7">
            {/* search */}
            <div className="md:w-[30%] w-full rounded-md border-2 border-gray-200 overflow-hidden relative cc">
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                name="search"
                placeholder="Search Task"
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
                  setisFilter(true);
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

      <div className="w-full cc mt-[1rem] h-full overflow-y-scroll mb-[2rem]">
        <div className="container">
          {/* time limit */}
          <div className="mt-5 w-full">
            <h2 className="text-2xl font-medium">All Task</h2>
            <div className="items-center justify-between gap-5 mt-3 grid grid-cols-1 md:grid-cols-3">
              {filterTasks.length === 0 ? (
                <div className="mt-10 w-full cc text-lg">No Task Available</div>
              ) : (
                filterTasks?.map((cur, id) => (
                  <Taks_upcoming data={cur} id={id} fixWidth={true} key={id} />
                ))
              )}
            </div>
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
            <TaskCategory setisCategory={setisCategory} />
            <div
              onClick={() => {
                handleClearTask();
                setisCategory(false);
              }}
              className="text-lg capitalize font-medium rounded-lg border bg-default text-white border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border"
            >
              Clear Aall
            </div>
          </motion.div>
        </div>
      )}

      {isFilter && !isCategory && (
        <div className="fixed z-[99999] top-0 left-0 w-screen h-[100dvh] bg-[rgba(0,0,0,0.5)] flex justify-end cursor-pointer">
          <div
            className="w-[80%] h-full"
            onClick={() => {
              setisFilter(false);
            }}
          ></div>
          <motion.div
            className="bg-white h-full w-[20%] bss px-5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FilterTasks setisFilter={setisFilter} />
            <div
              onClick={() => {
                handleClearTask();
                setisFilter(false);
              }}
              className="text-lg capitalize font-medium rounded-lg border bg-default text-white border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border"
            >
              Clear Aall
            </div>
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
              <TaskCategory setisCategory={setisMobileFilter} />
            </div>
            <div>
              <FilterTasks setisFilter={setisMobileFilter} />
            </div>
            <div
              onClick={() => {
                handleClearTask();
                setisMobileFilter(false);
              }}
              className="text-lg capitalize font-medium rounded-lg border bg-default text-white border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border"
            >
              Clear Aall
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Task;
