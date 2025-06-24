import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { TbLayout2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { RiMessage3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import HelpCard from "../UI/HelpCard";
import { useGlobalContext } from "../Context/GlobalContext";
import nuegasLogo from "../assets/nuegas_logo-removebg-preview.png";
const Navbar = () => {
  const { setMenuOpen, profileData } = useGlobalContext();  

  //!   active nav link class
  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-start w-full gap-2 px-3 py-2 hover:bg-gray-100 duration-200 rounded-md hover:text-black ${
      isActive ? "bg-gray text-black" : ""
    }`;
  return (
    <div className="page_height_gap flex flex-col md:items-center md:justify-between min-h-[100dvh] w-full">
      <div className="w-full">
        {/* logo */}
        <Link
          to={"/"}
          onClick={()=>{setMenuOpen(false)}}
          className="flex items-center justify-start gap-3 w-full md:mt-0 mt-10"
        >
          <span className="rounded-md text-white">
            <img src={nuegasLogo} alt="nuegas Logo" className="w-[3.3rem]" />
          </span>
          <h1 className="text-4xl text-dark-800">Nuegas</h1>
        </Link>

        {/* navigation bar */}
        <div className="flex flex-col items-center justify-center gap-2 mt-[2.3rem] w-full text-gray-500">
          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={navLinkClass}
            to={"/"}
          >
            <TbLayout2 className="text-2xl font-light" />
            <p className="text-lg">Overview</p>
          </NavLink>

          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={navLinkClass}
            to={"/task"}
          >
            <IoBookOutline className="text-2xl" />
            <p className="text-lg">Task</p>
          </NavLink>

          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={navLinkClass}
            to={"/mentor"}
          >
            <FiUser className="text-2xl" />
            <p className="text-lg">Mentor</p>
          </NavLink>

          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={navLinkClass}
            to={"/message"}
          >
            <RiMessage3Line className="text-2xl" />
            <p className="text-lg">Message</p>
          </NavLink>

          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={navLinkClass}
            to={"/profile"}
          >
            <IoSettingsOutline className="text-2xl" />
            <p className="text-lg">Profile</p>
          </NavLink>

          {profileData?.profile?.role !== "employee" && (
            <NavLink
              onClick={() => {
                setMenuOpen(false);
              }}
              className={navLinkClass}
              to={"/add-task"}
            >
              <CiSquarePlus className="text-2xl" />
              <p className="text-lg">Add Task</p>
            </NavLink>
          )}
        </div>
      </div>

      {/* help center */}
      <HelpCard />
    </div>
  );
};

export default Navbar;
