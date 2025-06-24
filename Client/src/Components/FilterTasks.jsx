import React from "react";
import useCatagory from "../Hook/Function/useCatagory";
import { useTaskContext } from "../Context/Task_Context";

const FilterTasks = ({ setisFilter }) => {
  const { handleFilterTasks } = useTaskContext();
  const textdata = ["deadline", "assesment", "date"];
  return (
    <div className="page_height_gap">
      <h2 className="text-3xl font-medium">Sort by</h2>

      <div className="mt-5">
        <ul className="flex flex-col gap-3 mt-3">
          {textdata.map((cur, id) => {
            return (
              <li
                key={id}
                onClick={() => {
                  handleFilterTasks(cur);
                  setisFilter(false);
                }}
                className="text-lg capitalize font-medium rounded-lg border border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border cursor-pointer"
              >
                {cur}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterTasks;
