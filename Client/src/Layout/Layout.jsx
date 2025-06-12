import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Mobile_Heading from "../Common/Mobile_Heading";
import {
  GlobalContextProvider,
  useGlobalContext,
} from "../Context/GlobalContext";
import MainLoader from "./../UI/MainLoader";
import { TaskContextProvider } from "../Context/Task_Context";

const Layout = () => {
  const { menuOpen, setMenuOpen, profileIsLoading } = useGlobalContext();

  if (profileIsLoading) {
    return (
      <div className="h-screen cc w-screen">
        <MainLoader />
      </div>
    );
  }

  return (
    <>
      <TaskContextProvider>
        <div className="flex items-center justify-between w-full overflow-hidden">
          <nav
            className={`md:bg-white flex flex-row md:flex-col justify-center items-center md:w-[18%] md:static fixed overflow-hidden z-[999] w-screen h-[100dvh] top-0 ${
              menuOpen ? "right-0" : "right-200"
            } duration-300`}
          >
            <div className="slidebar_width bg-white md:px-0 px-5">
              <Navbar />
            </div>
            <div
              className="md:hidden w-[40%] bg-[rgba(0,0,0,.5)] h-full"
              onClick={() => {
                setMenuOpen(false);
              }}
            ></div>
          </nav>
          <div className="md:w-[calc(100%-18%)] w-full h-[100dvh] flex flex-col justify-center items-center">
            <div className="md:hidden flex w-full">
              <Mobile_Heading />
            </div>
            <div className="h-full w-full overflow-y-auto overflow-x-hidden mt-[4rem] md:mt-0">
              <Outlet />
            </div>
          </div>
        </div>
      </TaskContextProvider>
    </>
  );
};

export default Layout;
