import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { addTaskApi, getAllUserApi } from "../Api/GlobalApi";
import { useGlobalContext } from "./GlobalContext";
import { toast } from "react-toastify";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { userIsLogin } = useGlobalContext();
  const [createdTaskLoader, setcreatedTaskLoader] = useState(false)
  // ! adding task state
  const [taskTile, setTaskTile] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("normal");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskAttachments, setTAskattachments] = useState([]);
  const [taskImage, setTaskImage] = useState("");
  const [taskAssesment, setTaskAssesment] = useState([]);
  const [taskMembers, setTaskMembers] = useState([]);

  // ! usequery
  const { data: allUserData, isLoading: alluserLoading } = useQuery({
    queryKey: ["all_user"],
    queryFn: getAllUserApi,
    enabled: !!userIsLogin,
  });

  // ! add task
  const handleAddTaskSubmit = async (e) => {
    e.preventDefault();
    setcreatedTaskLoader(true);
    const formData = new FormData();
    formData.append("title", taskTile);
    formData.append("description", taskDescription);
    formData.append("deadline", taskDeadline);
    formData.append("priority", taskPriority);
    formData.append("members", JSON.stringify(taskMembers));
    formData.append("attachments", JSON.stringify(taskAttachments));
    formData.append("assesment", JSON.stringify(taskAssesment));

    if (taskImage instanceof File) {
      formData.append("image", taskImage);
    }

    try {
      const data = await addTaskApi(formData);
      
      if (data?.success) {
        toast.success(data?.message);
        setcreatedTaskLoader(false);
        setTaskTile("");
        setTaskDescription("");
        setTaskPriority("normal");
        setTaskDeadline("");
        setTaskImage("");
        setTAskattachments([]);
        setTaskAssesment([]);
        setTaskMembers([]);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setcreatedTaskLoader(false)
    }
  };

  return (
    <TaskContext.Provider
      value={{
        // ! adding task data
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

        // ! all user data
        allUserData,
        alluserLoading,

        // ! add task
        handleAddTaskSubmit,

        // !loader
        createdTaskLoader
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
