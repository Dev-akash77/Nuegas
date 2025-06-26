import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const MessageLeft = () => {
  const [searchMessageMmembers, setSearchMessageMmembers] = useState("");

  return (
    <div className="w-full h-full py-5">
      {/* sarch members */}
      <div className="w-full rounded-md border-2 border-gray-200 overflow-hidden relative cc">
        <input
          type="text"
          name="searchMembersMessage"
          onChange={(e) => {
            setSearchMessageMmembers(e.target.value);
          }}
          value={searchMessageMmembers}
          placeholder="Search Name"
          className="w-full h-full text-lg px-3 py-2 border-0 outline-0"
        />
        <FaSearch className="absolute right-3 text-gray-500" />
      </div>
      {/* body */}
      <div className="flex flex-col gap-5 w-full pb-15 mt-5 overflow-y-scroll h-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cur, id) => {
          return (
            <div
              className="p-2 rounded-md bg-gray-100 w-full flex items-center justify-between gap-4 cursor-pointer"
              key={id}
            >
              <div className="flex gap-2 items-center">
                <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden bg-gray-200"></div>
                <div className="flex items-start justify-center flex-col gap-1">
                  <p className="text-md font-semibold capitalize">name</p>
                  <p className="text-gray-400 text-sm capitalize">
                    last message....
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-1">
                <p className="text-gray-400 text-[.8rem] capitalize">1m ago</p>
                <div className={`w-2 h-2 rounded-full ${id%2!=0?"bg-red-600":"bg-green-600"}`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageLeft;
