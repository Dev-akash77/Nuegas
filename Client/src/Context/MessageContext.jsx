import { useQuery } from "@tanstack/react-query";
import { Children, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { api, getAllMessageApi, getAllMessageUserApi } from "../Api/GlobalApi";
import { useGlobalContext } from "./GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const messageContext = createContext();
export const MessageContextProvider = ({ children }) => {
  const [messageFromData, setMessageFromData] = useState("");
  const [attachment, setAttachment] = useState(null);
  const { userIsLogin, profileData } = useGlobalContext();
  const { sender } = useParams();

  const [message, setMessage] = useState([
    // { sender: "", reciver: "", message: "", image: { public_id: "", url: "" } },
  ]);

  // ! all tanstackquery function
  const {
    data: allMessageUserData,
    refetch: allMessageUserRefetch,
    isLoading: allMessageUserLoading,
  } = useQuery({
    queryKey: ["allMessageUserData"],
    queryFn: getAllMessageUserApi,
    enabled: !!userIsLogin,
  });

  // ? get all message
  const { data: getAllMessageData, refetch: getAllMessageRefetch } = useQuery({
    queryKey: ["getAllMessage", sender],
    queryFn: () => getAllMessageApi(sender),
    enabled: !!sender,
  });

  //! set message data into message
  useEffect(() => {
    if (getAllMessageData?.data) {
      setMessage(getAllMessageData?.data);
    }
  }, [getAllMessageData]);

  // ! send message
const handleSendMessage = async (e) => {
  e.preventDefault();
  try {
    if (!messageFromData.trim() && !attachment) {
      return toast.error("type message");
    }

    const formData = new FormData();
    formData.append("sender", sender);
    formData.append("message", messageFromData);
    if (attachment) {
      formData.append("image", attachment);
    }

    const { data } = await api.post(`/message/send`, formData);

    if (data?.success) {
      await allMessageUserRefetch();
      await getAllMessageRefetch();
    }

    setMessageFromData("");
    setAttachment(null); 
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to send message");
  }
};


  return (
    <messageContext.Provider
      value={{
        // ! message from data
        setMessageFromData,
        messageFromData,
        attachment,
        setAttachment,

        // ! all message user
        allMessageUserData,
        allMessageUserRefetch,

        // ! all message
        message,
        setMessage,
        getAllMessageData,
        allMessageUserLoading,
        getAllMessageRefetch,

        // ! send message function
        handleSendMessage,
      }}
    >
      {children}
    </messageContext.Provider>
  );
};

export const useMessageContext = () => useContext(messageContext);
