import { useState } from "react";
import { useEffect } from "react";
import { useContext, createContext } from "react";
import io from "socket.io-client";
import { useGlobalContext } from "./GlobalContext";
import { useMessageContext } from "./MessageContext";

const socketContext = createContext();

// ! provider
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { profileData, profileRefetch } = useGlobalContext();
  const { setMessage } = useMessageContext();
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (profileData && profileData?.profile._id) {
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        transports: ["websocket"],
        withCredentials: true,
        query: { userId: profileData?.profile._id },
      });

      newSocket.on("connect", () => {
        console.log("Connected to WebSocket:", newSocket.id);
      });

      newSocket.on("online-user", (user) => {
        setOnlineUser(user);
      });

      newSocket.on("sending-image", (msg) => {
        setMessage((prev) => [...prev, msg]);
      });

      newSocket.on("new-message", (msg) => {
        setMessage((prev) => {
          const filtered = prev.filter(
            (m) => !(m.isLoading && m.sender === msg.sender)
          );
          return [...filtered, msg];
        });
      });

      newSocket.on("disconnect", () => {
        console.log("WebSocket Disconnected!");
      });

      setSocket(newSocket);

      //!  Proper cleanup
      return () => {
        newSocket.off("disconnect");
        newSocket.off("online-user");
        newSocket.off("new-message");
        newSocket.off("sending-image");
        newSocket.disconnect();
      };
    }
  }, [profileData?.profile]);

  return (
    <socketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
