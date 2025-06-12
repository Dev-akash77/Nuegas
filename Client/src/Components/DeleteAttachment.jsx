import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Element_Loader from "./../UI/Element_Loader";
import { DeleteAttachmentApi } from "../Api/GlobalApi";

const DeleteAttachment = ({ setPopup, data, refetch }) => {
  const [loading, setLoading] = useState(false);
  // ! delete attachment
  const handleDeleteAttachment = async () => {
    try {
      setLoading(true);
      if (!data) {
        return toast.error("Data not Found");
      }
      const responseData = await DeleteAttachmentApi(data);

      if (responseData?.success) {
        toast.success(responseData?.message);
        refetch();
        setPopup(false);
        setLoading(false);
        setPopup(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPopup(false);
    }
  };

  return (
    <div className="md:w-[33%] md:h-[28%] w-[90%] bg-white rounded-md py-5">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-[1.3rem] font-medium">Delete Attachment</h2>
        <RxCross2
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => {
            setPopup(false);
          }}
        />
      </div>
      <p className="mt-[2rem] text-[1rem] px-5">
        Are you sure you want to delete the selected attachment?
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

export default DeleteAttachment;
