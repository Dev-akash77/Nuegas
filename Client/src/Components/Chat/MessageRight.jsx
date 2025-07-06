import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { BsSendFill } from "react-icons/bs";
import { useMessageContext } from "../../Context/MessageContext";
import { data, useParams } from "react-router-dom";
import { api } from "../../Api/GlobalApi";
import { toast } from "react-hot-toast";
import MainLoader from "./../../UI/MainLoader";

const MessageRight = () => {
  const {
    setMessageFromData,
    messageFromData,
    handleSendMessage,
    message,
    allMessageUserLoading,
    getAllMessageRefetch,
  } = useMessageContext();
  const { sender } = useParams();
  const [userData, setUserData] = useState(null);

  // ! Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${sender}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to load user data:", error);
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, [sender]);

  // ! time for mesage
  function formatToWhatsAppTime(isoString) {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="w-full h-full flex items-center justify-between flex-col">
      {/* header */}
      <div className="flex items-center justify-between w-full border-b bg-white border-b-gray-100 py-2 px-5">
        <div className="flex gap-2 items-center">
          <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden bg-gray-200">
            <img
              src={userData?.data?.image}
              alt={userData?.data?.name + "'s image"}
            />
          </div>
          <div className="flex items-start justify-center flex-col">
            <p className="text-md font-semibold capitalize">
              {userData?.data?.name}
            </p>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              online
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      {allMessageUserLoading ? (
        <div className="h-full w-full cc px-5 py-2">
          <MainLoader />
        </div>
      ) : (
        <div className="p-5 w-full h-full flex flex-col gap-5">
          {message.length != 0 &&
            message &&
            message?.map((cur, id) => {
              console.log(cur);

              return cur.sender === userData?.data?._id ? (
                <div className="flex justify-end items-end" key={id}>
                  <div className="flex flex-col">
                    <div className="bg-default text-white text-lg px-5 py-2 rounded-lg">
                      {cur.message}
                    </div>
                    <p className="p-1 text-[.8rem] text-gray-600"> {formatToWhatsAppTime(cur.createdAt)}</p>
                  </div>
                </div>
              ) : (
                
                <div className="flex justify-start items-start" key={id}>
                  <div className="flex flex-col">
                    <div className=" bg-[#fefefe] bs text-lg px-5 py-2 rounded-lg">
                      {cur.message}
                    </div>
                    <p className="p-1 text-[.8rem] text-gray-600"> {formatToWhatsAppTime(cur.createdAt)}</p>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* input, send message */}
      <form
        onSubmit={(e) => {
          handleSendMessage(e);
        }}
        className="flex items-center justify-between w-full border-t bg-white border-t-gray-100 py-4 px-5 h-[4rem]"
      >
        <input
          type="text"
          value={messageFromData}
          onChange={(e) => {
            setMessageFromData(e.target.value);
          }}
          className="border-none outline-0 w-[80%] h-full"
          name="sendMessage"
          placeholder="Send your message…"
        />
        <div className="flex items-center justify-center gap-5">
          <GrAttachment className="cursor-pointer text-xl" />
          <button
            type="submit"
            className="w-[2.5rem] h-[2.5rem] bg-default text-white rounded-md cc cursor-pointer"
          >
            <BsSendFill />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageRight;
