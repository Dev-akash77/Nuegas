import axios from "axios";
import toast from "react-hot-toast";
// ! base url
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// ! ================================================== api call for signup ===========================================================================
export const signupApi = async (fromData) => {
  try {
    const { data } = await api.post("/auth/register", fromData);
    return data;
  } catch (error) {
    console.log("signup Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================

// ! ================================================== api call for login ===========================================================================
export const loginApi = async (fromData) => {
  try {
    const { data } = await api.post("/auth/login", fromData);
    return data;
  } catch (error) {
    console.log("login Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================

// ! ================================================== api call for logout ===========================================================================
export const logoutApi = async () => {
  try {
    const { data } = await api.post("/auth/logout");
    return data;
  } catch (error) {
    console.log("profile Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================

// ! ================================================== api call for profile ===========================================================================
export const profileApi = async () => {
  try {
    const { data } = await api.get("/user/profile");
    return data;
  } catch (error) {
    console.log("profile Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================

// ! ================================================== api call for profile ===========================================================================
export const profile_UpdateApi = async (fromData) => {
  try {
    const { data } = await api.put("/user/profile-update", fromData);
    return data;
  } catch (error) {
    console.log("profile Update Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================

// ! ================================================== api call for all user Data ================================================================
export const getAllUserApi = async () => {
  try {
    const { data } = await api.get("/user/all-user");
    return data;
  } catch (error) {
    console.log("getAllUserApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===============================================================================================================================================

// ! ================================================== api call for all user Data ================================================================
export const getTopUserApi = async () => {
  try {
    const { data } = await api.get("/user/top-user");
    return data;
  } catch (error) {
    console.log("getAllUserApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===============================================================================================================================================

// ! ================================================== api call for add task Data ================================================================
export const addTaskApi = async (fromData) => {
  try {
    const { data } = await api.post("/task/add-task", fromData);
    return data;
  } catch (error) {
    console.log("addTaskApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================

// ! ================================================== api call for all task Data =====================================================================
export const allTaskApi = async () => {
  try {
    const { data } = await api.get("/task");
    return data;
  } catch (error) {
    console.log("addTaskApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ====================================================================================================================================================

// ! ================================================== api call for recent task Data =====================================================================
export const recentTaskApi = async () => {
  try {
    const { data } = await api.get("/task/recent");
    return data;
  } catch (error) {
    console.log("addTaskApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===============================================================================================================================================

// ! ================================================== api call for all task Data ================================================================
export const getTaskById = async (id) => {
  try {
    const { data } = await api.get(`/task/selcted/${id}`);
    return data;
  } catch (error) {
    console.log("addTaskApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ================================================================================================================================================

// ! ================================================== api call for all task Data =================================================================
export const addAttachment = async (fromData) => {
  try {
    const { data } = await api.put(`/task/attachment-update`, fromData);
    return data;
  } catch (error) {
    console.log("addTaskApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ================================================================================================================================================

// ! ================================================== api call for all task Data =================================================================
export const DeleteAttachmentApi = async (DeleteData) => {
  try {
    const { data } = await api.delete(`/task/attachment-delete`, {
      data: DeleteData,
    });
    return data;
  } catch (error) {
    console.log("addTaskApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ================================================================================================================================================

// ! ================================================== api call for all user Data ==================================================================
export const getAllChartStatApi = async () => {
  try {
    const { data } = await api.get("/user/chart-stats");
    return data;
  } catch (error) {
    console.log("getAllUserApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===============================================================================================================================================

// ! ================================================== api call for all user Data ==================================================================
export const getAllMessageUserApi = async () => {
  try {
    const { data } = await api.get("/message/user");
    return data;
  } catch (error) {
    console.log("getAllMessageUserApi Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===============================================================================================================================================
