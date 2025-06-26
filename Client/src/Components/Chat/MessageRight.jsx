import React from "react";
import { GrAttachment } from "react-icons/gr";
import { BsSendFill } from "react-icons/bs";

const MessageRight = () => {
  return (
    <div className="w-full h-full flex items-center justify-between flex-col">
      {/* header */}
      <div className="flex items-center justify-between w-full border-b bg-white border-b-gray-100 p-4">
        <div className="flex gap-2 items-center">
          <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden bg-gray-200"></div>
          <div className="flex items-center justify-center flex-col">
            <p className="text-md font-semibold capitalize">name</p>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              online
            </div>
          </div>
        </div>
      </div>
      {/* body */}
      {/* input */}
      <div className="flex items-center justify-between w-full border-t bg-white border-t-gray-100 p-4 h-[4rem]">
        <input
          type="text"
          className="border-none outline-0 w-[80%] h-full"
          name="sendMessage"
          placeholder="Send your message…"
        />
        <div className="flex items-center justify-center gap-5">
          <GrAttachment className="cursor-pointer text-xl" />
          <div className="w-[2.5rem] h-[2.5rem] bg-default text-white rounded-md cc cursor-pointer">
            <BsSendFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageRight;
