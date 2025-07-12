import React, { useEffect, useRef, useState } from "react";
import { GrAttachment, GrPrevious } from "react-icons/gr";
import { BsSendFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useMessageContext } from "../../Context/MessageContext";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Api/GlobalApi";
import { toast } from "react-hot-toast";
import MainLoader from "../../UI/MainLoader";

const MessageRight = () => {
  const {
    setMessageFromData,
    messageFromData,
    handleSendMessage,
    message,
    allMessageUserLoading,
    setAttachment,
  } = useMessageContext();

  const { sender } = useParams();
  const [userData, setUserData] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const fileInputRef = useRef();
  const scrollContainerRef = useRef(); // ✅ ref for scroll container

  //! Scroll to bottom on new message
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [message]);

  //! Fetch user data
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

  //! Format message time
  const formatToWhatsAppTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  //! Handle image file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  //! Remove selected image
  const removeFile = () => {
    setAttachment(null);
    setPreview("");
  };

  useEffect(() => {
    setPreview(false);
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }, [message]);

  //! Open dialog manually
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  if (allMessageUserLoading) {
    return (
      <div className="h-full w-full cc px-5 py-2">
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between w-full border-b bg-white border-b-gray-100 py-2 px-2">
        <div className="flex gap-2 items-center">
          <GrPrevious
            className="md:hidden text-2xl font-semibold block"
            onClick={() => navigate(-1)}
          />
          <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden bg-gray-200">
            <img
              src={userData?.data?.image}
              alt={`${userData?.data?.name}'s image`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-md font-semibold capitalize">
              {userData?.data?.name}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              online
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="p-5 w-full flex-1 flex flex-col gap-5 overflow-y-auto"
      >
        {message?.length > 0 &&
          message.map((cur, id) => {
            const isSender = cur.sender === userData?.data?._id;

            return (
              <div
                key={id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-[70%]">
                  {cur.isLoading ? (
                    <div
                      className={`w-[200px] h-[150px] rounded-md relative overflow-hidden ${
                        isSender ? "bg-gray-200" : "bg-[#fefefe]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
                      </div>
                    </div>
                  ) : (
                    <>
                      {cur.message && (
                        <div
                          className={`text-lg px-5 py-2 rounded-lg ${
                            isSender
                              ? "bg-default text-white"
                              : "bg-[#fefefe] text-black"
                          }`}
                        >
                          {cur.message}
                        </div>
                      )}
                      {cur.image?.url && cur.image.url !== "loading" && (
                        <img
                          src={cur.image.url}
                          alt="attachment"
                          className="mt-2 max-w-[200px] rounded-md"
                        />
                      )}
                    </>
                  )}
                  <p className="p-1 text-[.8rem] text-gray-600">
                    {formatToWhatsAppTime(cur.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Image Preview Before Sending */}
      {preview && (
        <div className="w-full px-5 pt-2">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="preview"
              className="max-w-[200px] rounded-md shadow-md"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-[-8px] right-[-8px] bg-white rounded-full shadow p-[2px]"
            >
              <IoMdClose className="text-xl text-red-500" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center justify-between w-full border-t bg-white border-t-gray-100 py-4 px-5 h-[4rem]"
      >
        <input
          type="text"
          value={messageFromData}
          onChange={(e) => setMessageFromData(e.target.value)}
          className="border-none outline-0 w-[80%] h-full"
          placeholder="Send your message…"
        />

        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <GrAttachment
            onClick={openFileDialog}
            className="cursor-pointer text-xl"
          />
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
