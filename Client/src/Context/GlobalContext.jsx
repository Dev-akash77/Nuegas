import React, { createContext, useContext, useEffect, useState } from "react";

export const globalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [fromData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <globalContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        fromData,
        isLogin,
        setIsLogin,
        setFromData,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
