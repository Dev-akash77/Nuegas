import React, { useState } from "react";
import Button from "../UI/Button";
import { logoutApi } from "../Api/GlobalApi";
import { toast } from "react-toastify";
import { useGlobalContext } from "../Context/GlobalContext";

const Profile = () => {
  const [loading, setLoading] = useState(false);
 const {setUserIsLogin} = useGlobalContext();

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

  return (
    <div className="w-full h-full">
      <div className="w-[7rem] h-[3rem]" onClick={handleLogout}>
        <Button text={"Logout"} loading={loading} />
      </div>
    </div>
  );
};

export default Profile;
