import { Children, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const messageContext = createContext();
export const MessageContextProvider = ({ children }) => {
  const [messageFromData, setMessageFromData] = useState("");
  const [message, setMessage] = useState([
    // { sender: "", reciver: "", message: "", image: { public_id: "", url: "" } },
  ]);

  // ! send message
  const handleSendMessage = async (e) => {
    e.preventDefault();    
    try {
      if (!messageFromData.trim()) {
        return toast.error("type message")
      }
      setMessage((prev) => {
        return [
          ...prev,
          {
            sender: "id@akashSender",
            reciver: "id@akashReciver",
            message: messageFromData,
            image: {
              public_id: "",
              url: "",
            },
          },
        ];
      });

      setMessageFromData("")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <messageContext.Provider
      value={{
        // ! message from data
        setMessageFromData,
        messageFromData,
        // ! all message
        message,
        // ! send message function
        handleSendMessage,
      }}
    >
      {children}
    </messageContext.Provider>
  );
};

export const useMessageContext = () => useContext(messageContext);
