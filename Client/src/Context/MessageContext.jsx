import { Children, createContext, useContext } from "react";

export const messageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  return <messageContext.Provider value={{name:"message"}}>{children}</messageContext.Provider>;
};

export const useMessageContext=()=>useContext(messageContext);