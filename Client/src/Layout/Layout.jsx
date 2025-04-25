import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Mobile_Heading from "../Common/Mobile_Heading";

const Layout = () => {
  return (
    <div className="flex items-center justify-between w-full overflow-hidden">
      <nav className="bg-white flex flex-col md:w-[18%] w-0 opacity-0 md:opacity-100 cc">
        <div className="slidebar_width">
          <Navbar />
        </div>
      </nav>
      <div className="md:w-[calc(100%-18%)] w-full md:h-[100dvh] page_height_gap flex flex-col justify-center items-center">
        <div className="md:hidden flex w-full">
          <Mobile_Heading />
        </div>
        <div className="container h-full w-full overflow-y-auto overflow-x-hidden mt-[4rem] md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
