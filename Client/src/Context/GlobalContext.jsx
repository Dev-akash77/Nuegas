import React, { createContext, useContext, useState } from 'react'

export const globalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <globalContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);;
