import React from "react";
import { useTaskContext } from "../Context/Task_Context";

const Filter = ({ name, setIsFilter }) => {
  const { handleMentorFilter, handleClarFilerMentor } = useTaskContext();
  return (
    <div className="page_height_gap">
      <h2 className="text-3xl font-medium">{name}</h2>

      <div className="flex flex-col gap-3 mt-5">
        <div
          className="text-lg capitalize font-medium rounded-lg border border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border "
          onClick={() => {
            setIsFilter(false);
            handleMentorFilter("name");
          }}
        >
          Letter
        </div>

        <div
          className="text-lg capitalize font-medium rounded-lg border border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border "
          onClick={() => {
            setIsFilter(false);
            handleMentorFilter("points");
          }}
        >
          Point
        </div>

        <div
          className="text-lg capitalize font-medium rounded-lg border border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border "
          onClick={() => {
            setIsFilter(false);
            handleMentorFilter("tasks");
          }}
        >
          Tasks
        </div>

        <div
          className="text-lg capitalize font-medium rounded-lg border bg-default text-white border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border"
          onClick={() => {
            setIsFilter(false);
            handleClarFilerMentor();
          }}
        >
          Clear All
        </div>
      </div>
    </div>
  );
};

export default Filter;
