import React, { useState } from "react";
import PageHeading from "./../Components/PageHeading";
import { BiCategoryAlt } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { useTaskContext } from "../Context/Task_Context";
import Members from "../Common/Members";
import MainLoader from "../UI/MainLoader";
import useSearch from "../Hook/Function/useSearch";

const Mentor = () => {
  const { allUserData, alluserLoading } = useTaskContext();
  const [search, setSearch] = useState("");

  const searchMembers = useSearch(allUserData?.alluser, search, "name", 300);
 
  if (alluserLoading) {
    return (
      <div className="fixed z-[99999] top-0 left-0 w-screen h-screen cc">
        <MainLoader />
      </div>
    );
  }
  return (
    <div className="w-full flex items-center flex-col">
      <div className="md:bg-white page_height_gap w-full cc">
        <div className="container">
          <PageHeading text={`All Mentors`} />
          <div className="flex items-center justify-between gap-5 mt-7">
            {/* search */}
            <div className="md:w-[30%] w-full rounded-md border-2 border-gray-200 overflow-hidden relative cc">
              <input
                type="text"
                name="searchMembers"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                placeholder="Search Mentors"
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

      <div className=" w-full cc h-full overflow-y-scroll pb-[5rem]">
        <div className="container">
          {/* ALL Mentors */}
          <div className="mt-5 w-full h-full">
            <h2 className="text-2xl font-medium">Mentors</h2>
            {searchMembers?.length !== 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-[2rem] pb-5">
                {searchMembers &&
                  searchMembers.map((cur, id) => {
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
    </div>
  );
};

export default Mentor;
