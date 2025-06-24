import React from "react";

const Catagory = ({ name, data, fn, setisCategory }) => {
  return (
    <div className="page_height_gap">
      <h2 className="text-3xl font-medium">{name}</h2>

      <ul className="flex flex-col gap-3 mt-6">
        {data.map((cur, id) => {
          return (
            <li
              key={id}
              className="text-lg capitalize font-medium rounded-lg border border-transparent bs w-full p-3 hover:scale-[1.02] hover:border-black duration-300 box-border cursor-pointer"
              onClick={() => {
                fn(cur);
                setisCategory(false);
              }}
            >
              {cur}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Catagory;
