import axios from "axios";
import { toast } from "react-toastify";
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
    const { data } = await api.put("/user/profile-update",fromData);
    return data;
  } catch (error) {
    console.log("profile Update Api error", error);
    toast.error(error.response.data.message);
  }
};
// ! ===================================================================================================================================================
