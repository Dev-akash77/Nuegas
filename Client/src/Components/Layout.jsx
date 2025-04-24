import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";

const Layout = () => {
  return (
    <div className="flex items-center justify-between w-full overflow-hidden">
      <nav className="bg-white flex flex-col w-[20%] cc">
        <div className="slidebar_width">
          <Navbar />
        </div>
      </nav>
      <div className="w-[calc(100%-20%)] h-[100dvh] page_height_gap flex flex-col justify-center items-center">
        <div className="container h-full w-full overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
