import React from "react";
import PageHeading from "../Components/PageHeading";
import MessageLeft from "../Components/Chat/MessageLeft";
import { Outlet, useParams } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";

const Message = () => {
  const { sender } = useParams();

  return (
    <div className="w-full flex items-center flex-col h-full">
      {/* heading */}
      <div className="bg-white page_height_gap w-full cc md:border-b md:border-b-gray-100">
        <div className="container">
          <PageHeading text={`Message`} />
        </div>
      </div>
      {/* body */}
      <div className="w-full flex md:flex-row flex-col items-center justify-center overflow-hidden h-full">
        {/* left part */}
        <div className={`md:w-[25%] w-full h-full bg-white cc`}>
          <div className="container h-full md:px-2">
            <MessageLeft />
          </div>
        </div>
        {/* right part */}
        <div className="md:w-[75%] w-full h-full border-l border-l-gray-100 cc">
          {sender ? (
            <Outlet />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-2 px-5">
              <FaMessage className="text-[5rem] text-gray-200" />
              <p className="text-[1.5rem] font-medium text-default">
                Your messages will appear here
              </p>
              <p className="text-[1rem]">
                Select a conversation to start chatting.
              </p>
              <p className="text-[1rem]">
                Stay connected and collaborate in real time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
