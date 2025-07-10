import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useMessageContext } from "../../Context/MessageContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../Context/SocketContext";

const MessageLeft = () => {
  const [searchMessageMmembers, setSearchMessageMmembers] = useState("");
  const { allMessageUserData, message } = useMessageContext();
  const { onlineUser } = useSocket();
  const navigate = useNavigate();
  const { sender: currentUser } = useParams();

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    const days = Math.floor(diff / 86400);
    return days === 1 ? `1 day ago` : `${days} days ago`;
  };

  return (
    <div className="w-full h-full py-5">
      {/* Search members */}
      <div className="w-full rounded-md border-2 border-gray-200 overflow-hidden relative">
        <input
          type="text"
          name="searchMembersMessage"
          onChange={(e) => setSearchMessageMmembers(e.target.value)}
          value={searchMessageMmembers}
          placeholder="Search Name"
          className="w-full h-full text-lg px-3 py-2 border-0 outline-0"
        />
        <FaSearch className="absolute right-3 text-gray-500" />
      </div>

      {/* Message user list */}
      <div className="flex flex-col gap-5 w-full pb-20 md:pb-15 mt-5 overflow-y-scroll h-full">
        {allMessageUserData?.data
          ?.filter((cur) =>
            cur.name.toLowerCase().includes(searchMessageMmembers.toLowerCase())
          )
          .map((cur) => {
            // Get all messages involving this user
            const userMessages = message?.filter(
              (msg) => msg.sender === cur._id || msg.receiver === cur._id
            );

            // Get the last message for this user
            const lastMsg = userMessages?.[userMessages.length - 1]?.message;

            return (
              <div
                className={`p-2 rounded-md bg-gray-100 ${
                  currentUser === cur._id
                    ? "border-black"
                    : "border-transparent"
                } border-2 w-full flex items-center justify-between gap-4 cursor-pointer`}
                key={cur._id}
                onClick={() => navigate(`${cur._id}`)}
              >
                {/* User Image and Info */}
                <div className="flex gap-2 items-center">
                  <div className="w-[3rem] h-[3rem] rounded-md overflow-hidden border-2 border-gray-100 bg-gray-200">
                    <img src={cur.image} alt={cur.name + "'s image"} />
                  </div>
                  <div className="flex items-start justify-center flex-col gap-1">
                    <p className="text-md font-semibold capitalize">
                      {cur.name}
                    </p>
                    <p className="text-gray-400 text-sm capitalize">
                      {lastMsg
                        ? lastMsg.split(" ").length > 7
                          ? lastMsg.split(" ").slice(0, 7).join(" ") + "..."
                          : lastMsg
                        : "No Message"}
                    </p>
                  </div>
                </div>

                {/* Time and Online Status */}
                <div className="flex items-center justify-center flex-col gap-1">
                  <p className="text-gray-400 text-[.8rem] capitalize">
                    {cur.lastMessageTime === null
                      ? "N/A"
                      : timeAgo(cur.lastMessageTime)}
                  </p>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      onlineUser?.includes(cur._id)
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MessageLeft;
