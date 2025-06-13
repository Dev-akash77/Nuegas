import { useState } from "react";
import { useEffect } from "react";
import { useContext, createContext } from "react";
import io from "socket.io-client";
import { useGlobalContext } from "./GlobalContext";

const socketContext = createContext();

// ! provider
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { profileData, profileRefetch } = useGlobalContext();

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

    newSocket.on("disconnect", () => {
      console.log("WebSocket Disconnected!");
    });

    setSocket(newSocket);

    // ✅ Proper cleanup
    return () => {
      newSocket.off("disconnect");
      newSocket.disconnect();
    };
  }
}, [profileData?.profile]);


  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
