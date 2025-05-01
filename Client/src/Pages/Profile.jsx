import React, { useState } from "react";
import Button from "../UI/Button";
import { logoutApi, profile_UpdateApi } from "../Api/GlobalApi";
import { toast } from "react-toastify";
import { useGlobalContext } from "../Context/GlobalContext";

const Profile = () => {
  const { setUserIsLogin, profileData, profileRefetch } = useGlobalContext();
  const { image, name, email, number, totalStar, professions, tasks } =
    profileData.profile;

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [inputData, setInputData] = useState({
    name,
    number,
    email,
    image,
    professions,
  });

  const handleLogout = async () => {
    try {
      setLoading(true);
      const data = await logoutApi();
      if (data?.success) {
        toast.success(data.message);
        setUserIsLogin(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setInputData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", inputData.name);
      formData.append("number", inputData.number);
      formData.append("email", inputData.email);
      formData.append("professions", inputData.professions);

      if (inputData.image instanceof File) {
        formData.append("image", inputData.image);
      }

      const data = await profile_UpdateApi(formData);

      if (data?.success) {
        toast.success(data?.message);
        profileRefetch();
        setLoading(false);
        setIsEdit(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      {!isEdit ? (
        <div className="md:w-[70%] md:pb-0 pb-10">
          <img
            src={image}
            alt={name}
            className="md:w-[10rem] w-[7rem] md:h-[10rem] h-[7rem] aspect-square object-cover md:mt-0 mt-3 rounded-lg"
          />
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

          <div className="flex md:flex-row flex-col mt-5 md:items-center md:gap-5 gap-2">
            <div
              className="md:w-[10rem] h-[3rem]"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              <Button text={"Edit Profile"} loading={false} />
            </div>
            <div className="md:w-[7rem] h-[3rem]" onClick={handleLogout}>
              <Button text={"Logout"} loading={loading} />
            </div>
          </div>
        </div>
      ) : (
        <form className="md:w-[70%] md:pb-0 pb-10 mt-3" onSubmit={handleSave}>
          {/* Upload Image */}
          <div
            className="relative md:w-[10rem] w-[7rem] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => document.getElementById("profileImageInput").click()}
          >
            <img
              src={previewImage || image}
              alt="profile"
              className="md:mt-0 mt-3 w-full object-cover"
            />
            <div className="absolute bg-black opacity-[.6] w-full h-full top-0 flex items-center justify-center">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAUlEQVR4nO3dv2/TQBjG8TBAkTrAWgYqlU6dqFQJBgpDkRi6UHmlcgd+bZQytIDub/+iA5OkwXLskPge+55HuqWVkvfej+4uTRp7MnEcx3Ecx3Ecx3EcZ0QB7gMvgQ/ADRAyGzfAe+A49iI1xi7wTaApQWRcxZ6kwngEfBdoQhAbsSc7fWPcAT4LTD6Ijk+xR32CPBGYdBAfe32CvBaYcBAfJ32CnAlMOIiPsz5BCoEJB/FRGITkCAYhfeMNQvpmG4T0DTYI6ZtqENI30iACzQsGSd+wYJDNfR5xUQ2ld5+z/MPwAngwV9fD6mep68oSpATu1dR2FzgXqC8rkLIOQwwlG5CyCUMIJQuQsg2GCMroQcouGAIoowYpV8FIjDJakPJ/MBZQ3hlEACMRyuhWSLlOjAQoowIpN4HRM8poQM5jw1o09Kjh90ctH2OTB/0oQMplK2OukcWS+to+1qZWyuBByg4YjROeqy8lyqBBLpf9Kz//bjFtQNqibAFfDDJr2nFHjNABpO259Mogs4Y97YgROoIsRQEODTJr1mlHjLACSCNKrMEgs0b9BB7XfFWu6WXpKiB/UW6dV/G5qxp8qC+gnFZbR9zPv676KqbFi47L6nuRh9Vzrhtj8K+y1jphxOszCAbxCsErZBpvWWJbAj5DDIIPdbxChrIlIF7f2qM+YcTrMwgG8QrBK2Qab1liWwI+QwyCD3W8QoayJSBe39qjPmHE6zMIBvEKwStkGm9ZYlsCPkMMgg91vEKGsiUgXt/aoz5hxOszCOMHUbiQciG+Qt7mdqnxQhzkJLeL8RfiIHt9364i3lHHINT24GOvt6uoUHYSX1KvEF0h/d/QZeGWR/E2Pwbhdw+uFr94lAJlq7ohVrwx1nWGK+S6mvuL2ItJrgEOGpp0kLq+7IJBtIJBtIJBtIJBtIJBtIJBtIJBtIJBtIJBtIJBtIJBtIJBtALsN7y5uJ+6vuwCbAM/ajDiz7ZT15dlgOc1IM9S15V1+POp5Ztq7Kaux3EcZ5JPfgHNTOp1Sby6QAAAAABJRU5ErkJggg=="
                alt="upload icon"
                className="w-[50%]"
              />
            </div>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          {/* Name */}
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleInputChange}
            className="text-3xl font-semibold my-5 capitalize border-0 border-b outline-0"
          />

          <h2 className="mt-3 uppercase text-xl font-semibold text-light-300">
            Contact Information
          </h2>
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex items-center gap-[3rem]">
              <p className="text-lg text-dark-800 font-medium">Email id:</p>
              <input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleInputChange}
                className="text-blue-500 border-0 outline-0"
              />
            </div>
            <div className="flex items-center gap-[3rem]">
              <p className="text-lg text-dark-800 font-medium">Number:</p>
              <input
                type="text"
                name="number"
                value={inputData.number}
                onChange={handleInputChange}
                className="text-blue-500 border-0 outline-0"
              />
            </div>
          </div>

          <h2 className="mt-5 uppercase text-xl font-semibold text-light-300">
            Basic Details
          </h2>
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex items-center gap-[3rem]">
              <p className="text-lg text-dark-800 font-medium">Professions:</p>
              <input
                type="text"
                name="professions"
                placeholder="Software Engenieer"
                value={inputData.professions}
                onChange={handleInputChange}
                className="text-blue-500 border-0 outline-0"
              />
            </div>
          </div>

          <div
            className="md:w-[10rem] h-[3rem] mt-5"
          >
            <Button text={"Save Profile"} loading={loading} type="submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
