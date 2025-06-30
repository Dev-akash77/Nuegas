import React from "react";
import PageHeading from "../Components/PageHeading";
import MessageLeft from "../Components/Chat/MessageLeft";
import MessageRight from "../Components/Chat/MessageRight";

const Message = () => {
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
        <div className="md:w-[25%] w-full h-full bg-white cc">
          <div className="container h-full md:px-2">
            <MessageLeft />
          </div>
        </div>
        {/* right part */}
        <div className="md:w-[75%] md:h-full h-0 w-0 border-l border-l-gray-100 cc ">      
            <MessageRight />
        </div>
      </div>
    </div>
  );
};

export default Message;
