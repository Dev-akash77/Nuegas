import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { PiLinkSimpleBold } from "react-icons/pi";
import { MdAttachFile, MdDeleteOutline } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import Popup_Members from "../Components/Popup_Members";
import { useTaskContext } from "../Context/Task_Context";
import Stacked_Avtar from "../Common/Stacked_Avtar";
import { toast } from "react-toastify";
import Element_Loader from './../UI/Element_Loader';

const AddTask = () => {
  const { profileData, popup, setPopup } = useGlobalContext();
  const {
    taskTile,
    setTaskTile,
    taskDescription,
    setTaskDescription,
    taskPriority,
    setTaskPriority,
    taskDeadline,
    setTaskDeadline,
    taskAttachments,
    setTAskattachments,
    taskImage,
    setTaskImage,
    taskAssesment,
    setTaskAssesment,
    taskMembers,
    setTaskMembers,
    handleAddTaskSubmit,
    createdTaskLoader
  } = useTaskContext();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [subTodo, setSubTodo] = useState("");
  const [attachment, setAttachment] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    if (profileData?.profile?.role === "employee") {
      navigate("/");
    }
  }, [profileData]);

  // ! creat subtodo
  const handleClickSubtodo = () => {
    if (!subTodo.trim()) {
      return toast.error("Checklist not found");
    }
    const id = Math.floor(Math.random() * 999999);
    setTaskAssesment((prev) => [
      ...prev,
      { name: subTodo, compleatedBy: null, checked: false, id },
    ]);
    setSubTodo("");
  };

  const handleDeleteSubtodo = (id) => {
    setTaskAssesment((prev) => prev.filter((u) => u.id !== id));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTaskImage(file);
      setImageUploaded(true);
    }
  };

  // ! created attachment
  const handleAttachmentAdd = () => {
    if (!attachment.trim()) return toast.error("URL not found");
    const id = Math.floor(Math.random() * 999999);
    setTAskattachments((prev) => [...prev, { link: attachment, id }]);
    setAttachment("");
  };

  const handleDeleteAttachment = (id) => {
    setTAskattachments((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="overflow-hidden">
      <form
        className="bg-white rounded-md h-full p-4 px-10 w-[70%] overflow-y-auto"
        onSubmit={(e) => {
          handleAddTaskSubmit(e);
        }}
      >
        <h1 className="text-xl font-medium">Create Task</h1>

        {/* Task Title */}
        <div className="mt-3 flex flex-col gap-2">
          <h2 className="text-md font-medium">Task Title</h2>
          <input
            type="text"
            name="title"
            required
            value={taskTile}
            onChange={(e) => setTaskTile(e.target.value)}
            placeholder="Create App UI"
            className="w-full md:border md:border-[#dddd] border-b p-2 text-light-400 outline-none md:rounded-md"
          />
        </div>

        {/* Description */}
        <div className="mt-3 flex flex-col gap-2">
          <h2 className="text-md font-medium">Description</h2>
          <textarea
            required
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            name="description"
            placeholder="Describe Task"
            className="w-full md:border md:border-[#dddd] border-b p-2 text-light-400 outline-none md:rounded-md"
          />
        </div>

        {/* Priority, Deadline, Assign To */}
        <div className="flex items-center justify-between gap-3 pt-1 mt-3">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-md font-medium">Priority</h2>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              name="priority"
              className="border outline-0 border-[#dddd] cursor-pointer p-2 rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-md font-medium">Deadline</h2>
            <input
              type="date"
              name="deadline"
              required
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              className="border outline-0 border-[#dddd] cursor-pointer p-2 rounded-md"
            />
          </div>

          <div
            className="flex flex-col gap-2 w-max"
            onClick={() => setPopup(true)}
          >
            <h2 className="text-md font-medium">Assign To</h2>
            {taskMembers.length === 0 ? (
              <button
                className="p-2 rounded-md bg-gray-100 flex items-center justify-between cursor-pointer w-max gap-2"
                type="button"
              >
                <FiUser className="text-[1rem]" />
                <p className="text-md">Add Members</p>
              </button>
            ) : (
              <div className="pt-3">
                <Stacked_Avtar arr={taskMembers} imageperview={3} />
              </div>
            )}
          </div>
        </div>

        {/* Todo Checklist */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Todo Checklist</h2>
            <button
              className="py-[.4rem] px-3 rounded-md bg-default text-white flex items-center gap-2"
              type="button"
            >
              <LuBrain className="text-[1rem]" />
              <p className="text-md">Generate From AI</p>
            </button>
          </div>

          {taskAssesment?.map((cur, id) => (
            <div
              className="flex items-center mb-2 justify-between px-3 py-1 rounded-md bg-gray-100"
              key={cur.id}
            >
              <div className="flex items-center gap-3">
                <p className="text-gray-500 text-lg">{id + 1}</p>
                <p className="text-md">{cur.name}</p>
              </div>
              <MdDeleteOutline
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => handleDeleteSubtodo(cur.id)}
              />
            </div>
          ))}

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={subTodo}
              onChange={(e) => setSubTodo(e.target.value)}
              name="assesment"
              placeholder="Enter Tasks"
              className="w-full md:border md:border-[#dddd] border-b p-2 text-light-400 outline-none md:rounded-md"
            />
            <button
              className="bg-gray-100 rounded-md gap-1 py-2 px-5 flex items-center cursor-pointer"
              type="button"
              onClick={handleClickSubtodo}
            >
              <GoPlus className="text-xl" />
              <p>Add</p>
            </button>
          </div>
        </div>

        {/* Attachments */}
        <div className="mt-5 flex flex-col gap-2">
          <h2 className="text-md font-medium">Add Attachments</h2>

          {taskAttachments?.map((cur, id) => (
            <div
              className="flex items-center mb-2 justify-between px-3 py-1 rounded-md bg-gray-100"
              key={cur.id}
            >
              <div className="flex items-center gap-3">
                <PiLinkSimpleBold className="text-xl text-gray-400" />
                <p className="text-md">{cur.link}</p>
              </div>
              <MdDeleteOutline
                className="text-red-500 text-xl cursor-pointer"
                onClick={() => handleDeleteAttachment(cur.id)}
              />
            </div>
          ))}

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 md:rounded-md md:border md:border-[#dddd] border-b p-2 text-light-400 w-full">
              <PiLinkSimpleBold className="text-xl text-gray-400" />
              <input
                type="link"
                name="attachments"
                value={attachment}
                onChange={(e) => {
                  setAttachment(e.target.value);
                }}
                placeholder="Add Link"
                className="outline-none w-full"
              />
            </div>
            <button
              className="bg-gray-100 rounded-md gap-1 py-2 px-5 flex items-center cursor-pointer"
              type="button"
              onClick={handleAttachmentAdd}
            >
              <GoPlus className="text-xl" />
              <p>Add</p>
            </button>
          </div>
        </div>

        {/* Upload Task Image */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <button
          className="bg-default rounded-md gap-1 py-2 px-2 flex items-center justify-center text-white cursor-pointer mt-5 w-full"
          type="button"
          onClick={() => fileInputRef.current.click()}
        >
          {imageUploaded ? (
            "✔ Uploaded"
          ) : (
            <div className="flex items-center justify-center gap-1">
              <MdAttachFile className="text-xl" />
              <p>Upload Image</p>
            </div>
          )}
        </button>

        {/* Create Task */}
        <button
          className="bg-default rounded-md gap-1 py-2 px-2 flex items-center justify-center text-white cursor-pointer mt-3 w-full relative"
          type="submit"
        >
          {createdTaskLoader? <div className="py-3"><Element_Loader /></div>:
          <div className="flex items-center justify-center gap-1">
            <GoPlus className="text-xl" />
            <p className="uppercase">Create Task</p>
          </div>
          }
        </button>
      </form>

      {popup && (
        <div className="fixed z-[99999] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.3)] cc">
          <Popup_Members />
        </div>
      )}
    </div>
  );
};

export default AddTask;
