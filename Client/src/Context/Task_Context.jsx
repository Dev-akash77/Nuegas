import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { addTaskApi, allTaskApi, getAllUserApi } from "../Api/GlobalApi";
import { useGlobalContext } from "./GlobalContext";
import { generateSubTodo } from "../Config/Gemini.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { userIsLogin, profileRefetch } = useGlobalContext();
  const navigate = useNavigate();
  const [createdTaskLoader, setcreatedTaskLoader] = useState(false);
  const [aiLoader, setaiLoader] = useState(false);

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

  const {
    data: allTaskData,
    isLoading: allTaskLoading,
    refetch: allTaskRefetch,
  } = useQuery({
    queryKey: ["all_task_user"],
    queryFn: allTaskApi,
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

  //! Append image if valid
  if (taskImage instanceof File && taskImage.type.startsWith("image/")) {
    formData.append("image", taskImage);
  }

  try {
    // ! Generate task heading using Gemini
    const headingPrompt = `Summarize the task title into a short, clear heading (max 4–5 words). Title: ${taskTile}`;
    const response = await generateSubTodo(headingPrompt);

    let cleanHeading = (typeof response === "string" ? response : String(response)).trim();
    cleanHeading = cleanHeading.replace(/^["']|["']$/g, ""); //! remove surrounding quotes

    if (!cleanHeading) {
      toast.error("AI failed to generate a task heading.");
      setcreatedTaskLoader(false);
      return;
    }

    formData.append("heading", cleanHeading);
    console.log("Generated Heading:", formData.get("heading"));

    // ! Send to backend
    const data = await addTaskApi(formData);

    if (data?.success) {
      toast.success(data?.message);
      profileRefetch();
      allTaskRefetch();
      
      navigate(`/task/${data?.task._id}`);
      // ! Reset form
      setTaskTile("");
      setTaskDescription("");
      setTaskPriority("normal");
      setTaskDeadline("");
      setTaskImage("");
      setTAskattachments([]);
      setTaskAssesment([]);
      setTaskMembers([]);
    } else {
      toast.error(data?.message || "Task creation failed.");
    }

    console.log(data);
  } catch (error) {
    console.error("Task creation error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setcreatedTaskLoader(false);
  }
};

  //! generate sub todo via gemini llm
  const generateChecklist_LLM = async () => {
    setaiLoader(true);
    try {
      if (!taskTile) return toast.error("Add Title");
      if (!taskDeadline) return toast.error("Add Deadline");
      if (!taskDescription) return toast.error("Add Description");
      if (!taskPriority) return toast.error("Add Priority");
      if (taskMembers.length === 0) return toast.error("Add Members");

      // ! Convert to prompt string

      const rawPrompt = `
      Title: ${taskTile}
      Description: ${taskDescription}
      Priority: ${taskPriority}
      Members: ${taskMembers.join(", ")}
      Deadline: ${taskDeadline} `;

      const response = await generateSubTodo(rawPrompt);
      const text = response
        .split("\n")
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter(Boolean);

      const updatedChecklist = text.map((item) => ({
        name: item,
        completedBy: null,
        checked: false,
      }));

      //! State update karte hain
      setTaskAssesment(updatedChecklist);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setaiLoader(false);
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
        generateChecklist_LLM,

        // ! all user data
        allUserData,
        alluserLoading,
        aiLoader,

        // ! add task
        handleAddTaskSubmit,

        // !loader
        createdTaskLoader,

        // !all task data
        allTaskData,
        allTaskLoading,
        allTaskRefetch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
