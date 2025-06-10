import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Element_Loader from "./../UI/Element_Loader";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../Api/GlobalApi";

const DeleteTask = ({ setPopup, refetch }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // ! delete attachment
  const handleDeleteAttachment = async () => {
    if (!id) {
      return toast.error("Task not Found");
    }
    try {
      setLoading(true);
      const { data } = await api.delete(`/task/delete/${id}`);

      if (data?.success) {
        toast.success(data?.message);
        refetch();
        setPopup(false);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[33%] md:h-[28%] w-[90%] bg-white rounded-md py-5">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-[1.3rem] font-medium">Delete Task</h2>
        <RxCross2
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => {
            setPopup(false);
          }}
        />
      </div>
      <p className="mt-[2rem] text-[1rem] px-5">
        Are you sure you want to delete the selected Task?
      </p>
      <hr className="text-gray-300 my-5" />

      <div className="flex justify-end gap-3 px-5">
        <div
          className="bg-gray-200 py-2 px-4 cursor-pointer rounded-md"
          onClick={() => {
            setPopup(false);
          }}
        >
          Cancle
        </div>
        <div
          className="text-white bg-default py-2 w-[5rem] cc cursor-pointer rounded-md relative"
          onClick={handleDeleteAttachment}
        >
          {loading ? <Element_Loader /> : " Delete"}
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
