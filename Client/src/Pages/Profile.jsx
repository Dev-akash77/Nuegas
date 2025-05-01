import React, { useState } from "react";
import Button from "../UI/Button";
import { logoutApi } from "../Api/GlobalApi";
import { toast } from "react-toastify";
import { useGlobalContext } from "../Context/GlobalContext";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { setUserIsLogin, profileData, profileRefetch } = useGlobalContext();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logoutApi();

      if (data?.success) {
        toast.success(data?.message);
        setLoading(false);
        setUserIsLogin(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { image, name, email, number, totalStar, professions, tasks } =
    profileData.profile;

  return (
    <div className="w-full h-full">
      {/* main profile data */}
      <div className="md:w-[70%] md:pb-0 pb-10">
        <img src={image} alt={name} className="md:w-[10rem] w-[7rem] md:mt-0 mt-3" />
        <h1 className="text-3xl font-semibold my-5 capitalize">{name}</h1>
        <hr />
        <h2 className="mt-3 uppercase text-xl font-semibold text-light-300">
          Contact Information
        </h2>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-[3rem]">
            <p className="text-lg text-dark-800 font-medium">Email id:</p>
            <p className="text-blue-500">{email}</p>
          </div>
          <div className="flex items-center gap-[3rem]">
            <p className="text-lg text-dark-800 font-medium">Number:</p>
            <p className="text-blue-500">{number}</p>
          </div>
        </div>
        <hr className="mt-5" />
        <h2 className="mt-3 uppercase text-xl font-semibold text-light-300">
          Basic Details
        </h2>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-[3rem]">
            <p className="text-lg text-dark-800 font-medium">Total Star:</p>
            <p className="text-blue-500">{totalStar}</p>
          </div>
          <div className="flex items-center gap-[3rem]">
            <p className="text-lg text-dark-800 font-medium">Professions:</p>
            <p className="text-blue-500">{professions || "Not Selected"}</p>
          </div>
          <div className="flex items-center gap-[3rem]">
            <p className="text-lg text-dark-800 font-medium">Total Tasks:</p>
            <p className="text-blue-500">{tasks.length}</p>
          </div>
        </div>

        <div className="flex mt-5 items-center gap-5">
        <div className="w-[7rem] h-[3rem] " onClick={handleLogout}>
          <Button text={"Logout"} loading={loading} />
        </div>
        <div className="w-[10rem] h-[3rem] ">
          <Button text={"Edit Profile"} loading={false} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
