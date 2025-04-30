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
        console.log("signupApi error", error);
        toast.error(error.response.data.message);
    }
};
// ! ===================================================================================================================================================



// ! ================================================== api call for login ===========================================================================
export const loginApi = async (fromData) => {
    try {
        console.log(fromData);
        
        const { data } = await api.post("/auth/login", fromData);
        return data;
    } catch (error) {
        console.log("login error", error);
        toast.error(error.response.data.message);
    }
};
// ! ===================================================================================================================================================

