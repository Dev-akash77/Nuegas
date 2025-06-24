import React from "react";
import useCatagory from "../Hook/Function/useCatagory";
import { useTaskContext } from "../Context/Task_Context";

const TaskCategory = ({ setisCategory }) => {
  const { allTaskData, handleCatagoryTasks } = useTaskContext();
  const progress = useCatagory(allTaskData?.allTasks, "progress");
  const priority = useCatagory(allTaskData?.allTasks, "priority");

  return (
    <div className="page_height_gap">
      <h2 className="text-3xl font-medium">Category</h2>

      <div className="mt-5">
        <h2 className="text-xl font-medium text-gray-400 capitalize">
          Task Progress
        </h2>
        <ul className="flex flex-col gap-3 mt-3">
          {progress.map((cur, id) => {
            return (
              <li
                key={id}
                onClick={() => {
                  handleCatagoryTasks("progress", cur);
                  setisCategory(false);
                }}
                className="text-lg capitalize font-medium rounded-lg border border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border cursor-pointer"
              >
                {cur}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-medium text-gray-400 capitalize">
          Task priority
        </h2>
        <ul className="flex flex-col gap-3 mt-3">
          {priority.map((cur, id) => {
            return (
              <li
                key={id}
                onClick={() => {
                  handleCatagoryTasks("priority", cur);
                  setisCategory(false);
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

export default TaskCategory;
