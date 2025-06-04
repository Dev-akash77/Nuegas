import { useState } from "react";
import { useTaskContext } from "./../Context/Task_Context";
import PageHeading from "../Components/PageHeading";
import { FaSearch } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import Taks_upcoming from "../Common/Taks_upcoming";
import Swiper_component from "../Common/Swiper_component";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCode } from "react-icons/io5";

const Task = () => {
  const { allTaskData } = useTaskContext();
  const [search, setSearch] = useState("");

  const searchMembers = allTaskData?.allTasks?.filter((cur) => {
    return cur.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="w-full h-full flex items-center flex-col justify-between">
      <div className="md:bg-white page_height_gap w-full cc">
        <div className="container">
          <PageHeading text={`Explore Task`} />
          <div className="flex items-center justify-between gap-5 mt-7">
            {/* search */}
            <div className="md:w-[30%] rounded-md border-2 border-gray-200 overflow-hidden relative cc">
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
                className="border-2 border-gray-200 rounded-md py-2 px-[1rem] flex items-center justify-center gap-2 text-md cursor-pointer"
              >
                <BiCategoryAlt className="text-gray-400 text-2xl" />
                Category
              </button>
              <button
                type="button"
                className="border-2 border-gray-200 rounded-md py-2 px-[1rem] flex items-center justify-center gap-2 text-md cursor-pointer"
              >
                <IoFilterSharp className="text-gray-400 text-2xl" />
                Search By Filter
              </button>
            </div>

            <div className="block md:hidden border-2 border-gray-200 p-2 rounded-md">
              <HiAdjustmentsHorizontal className="text-xl text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full cc mt-[1rem] h-full overflow-y-scroll mb-[2rem]">
        <div className="container">
          {/* time limit */}
          <div className="mt-5 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium">Time Limit</h2>
              <IoCode className="text-2xl"/>
            </div>
            <Swiper_component
              data={searchMembers}
              component={<Taks_upcoming />}
              delay={3000}
            />
          </div>
          {/* New Task */}
          <div className="mt-5 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium">New Task</h2>
              <IoCode className="text-2xl"/>
            </div>

            <Swiper_component
              data={searchMembers}
              component={<Taks_upcoming />}
              delay={3000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
