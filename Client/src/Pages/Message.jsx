import React from "react";
import { useMessageContext } from "../Context/MessageContext";
import PageHeading from "../Components/PageHeading";
import MessageLeft from "../Components/Chat/MessageLeft";
import MessageRight from "../Components/Chat/MessageRight";

const Message = () => {
  const { name } = useMessageContext();
  return (
    <div className="w-full flex items-center flex-col h-full">
      {/* heading */}
      <div className="md:bg-white page_height_gap w-full cc md:border-b md:border-b-gray-100">
        <div className="container">
          <PageHeading text={`Message`} />
        </div>
      </div>
      {/* body */}
      <div className="w-full flex items-center justify-center overflow-hidden h-full">
        {/* left part */}
        <div className="w-[25%] h-full bg-white cc">
          <div className="container h-full px-2">
            <MessageLeft />
          </div>
        </div>
        {/* right part */}
        <div className="w-[75%] h-full border-l border-l-gray-100 cc">      
            <MessageRight />
        </div>
      </div>
    </div>
  );
};

export default Message;
