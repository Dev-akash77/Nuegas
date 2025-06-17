import React, { useCallback, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import { BsFolder2Open } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Element_Loader from "./../UI/Element_Loader";
import { addAttachment } from "./../Api/GlobalApi";
import { RxCross2 } from "react-icons/rx";
import DeleteAttachment from "./DeleteAttachment";
import DeleteTask from "./DeleteTask";

const TaskDetailsRight = ({ data, refetch }) => {
  const { profileData} = useGlobalContext();
  const [loading, setloading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { title, heading, attachments, userId, _id } = data?.task || {};
  const [popup, setPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePopup, setImagePopup] = useState(false);
  const [img, setImg] = useState("");
  const [deleteAttachmentData, setDeleteAttachmentData] = useState();
  const myData = profileData?.profile;
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ! handle submit
  const handleSubmitUpdateAttachment = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      return toast.error("Please select an image file.");
    }
    if (!selectedFile instanceof File) {
      return toast.error("Please select a valid image file.");
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("taskID", _id);

    try {
      setloading(true);
      const data = await addAttachment(formData);

      if (data?.success) {
        toast.success(data.message);
        refetch();
        setSelectedFile(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  // ! Optimized Cloudinary image
  const getOptimizedImage = (url) => {
    if (!url?.includes("cloudinary")) return url;
    return url?.replace(
      "/upload/",
      "/upload/w_400,h_250,c_fill,q_auto,f_auto/"
    );
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmitUpdateAttachment}>
        <div className="flex items-center justify-between gap-5 mt-3">
          <h2 className="md:text-xl md:font-light">Assigned Assignments</h2>
          {(profileData?.profile.role === "admin" ||
            profileData?.profile._id === userId) && (
            <div
              className="bg-default py-2 px-4 rounded-md flex items-center justify-center cursor-pointer text-white gap-1"
              onClick={() => {
                setDeleteOpen(true);
              }}
            >
              <RiDeleteBin6Line className="text-lg" />
              Delete
            </div>
          )}
        </div>

        <hr className="my-5 text-gray-400" />
        {/* task details */}
        <h2 className="text-3xl font-medium mt-3">{heading}</h2>
        <p className="text-lg text-gray-500 py-2">{title}</p>

        <hr className="text-gray-400 my-5" />
        {/* student details */}
        <h2 className="text-2xl font-medium">Detail Student</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 mt-2">
            <p className="text-lg text-gray-600">Student Name :</p>
            <p className="text-black text-lg">{profileData?.profile.name}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg text-gray-600">Professions :</p>
            <p className="text-black text-lg">
              {profileData?.profile.professions}
            </p>
          </div>
        </div>

        <hr className="text-gray-400 my-5" />
        {/* attachment section */}
        <h2 className="text-2xl font-medium">Attachments</h2>

        <div className="flex flex-col gap-4 mt-2">
          {attachments?.map((cur, id) => {
            const isCloudinaryImage = cur?.link?.includes("cloudinary");
            const attachmentId = cur.user;

            return (
              <div key={id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-blue-600">{id + 1})</p>

                  {!isCloudinaryImage ? (
                    <a
                      href={cur.link}
                      target="_blank"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span className="text-base">View Link</span>
                      <FiExternalLink className="text-xl" />
                    </a>
                  ) : (
                    <img
                      src={getOptimizedImage(cur?.link)}
                      alt="task attachment image"
                      loading="lazy"
                      onClick={() => {
                        setImagePopup(true), setImg(cur?.link);
                      }}
                      className="w-[5rem] object-cover rounded-sm border-2 border-gray-200 cursor-pointer"
                    />
                  )}
                </div>
                {(attachmentId === myData._id || myData.role === "admin") && (
                  <div
                    className="cursor-pointer p-1 rounded-md bs border-1 border-gray-400"
                    onClick={() => {
                      setPopup(true);
                      setDeleteAttachmentData({
                        ...cur,
                        taskId: data?.task._id,
                      });
                    }}
                  >
                    <RxCross2 />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <hr className="text-gray-400 my-5" />

        {/* upload images with drag and drop features*/}
        <div>
          <h2 className="text-2xl font-medium mb-2">File Tasks</h2>
          <p className="text-gray-400 text-md">File submissions</p>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl cc text-center cursor-pointer transition-all mt-5 h-[8rem] ${
              isDragActive && "scale-[1.02] border-blue-500"
            }`}
          >
            <input {...getInputProps()} />
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="preview iamges"
                className="mx-auto w-full h-full object-cover rounded-md overflow-hidden"
              />
            ) : (
              <BsFolder2Open
                className={`text-4xl opacity-[.5] ${
                  isDragActive && "scale-[1.02] text-blue-500 opacity-1"
                }`}
              />
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            *drag or browser from device
          </p>
        </div>
        <button
          type="submit"
          className="bg-default w-full h-[2.8rem] cc rounded-md mt-5 text-white text-lg cursor-pointer relative"
        >
          {loading ? <Element_Loader /> : "Submit"}
        </button>
      </form>

      {popup && (
        <div className="fixed z-[99999] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.7)] cc">
          <DeleteAttachment
            setPopup={setPopup}
            data={deleteAttachmentData}
            refetch={refetch}
          />
        </div>
      )}

      {deleteOpen && (
        <div className="fixed z-[99999] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.7)] cc">
          <DeleteTask setPopup={setDeleteOpen} refetch={refetch} />
        </div>
      )}

      {imagePopup && !popup && (
        <div
          className="fixed z-[99999] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.7)] cc"
          onClick={() => {
            setImagePopup(false), setImg(false);
          }}
        >
          <img
            src={img}
            alt="image task attachment"
            className="md:w-[80%] w-[90%] md:h-[95%] object-cover"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default TaskDetailsRight;
