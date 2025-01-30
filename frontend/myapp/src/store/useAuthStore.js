import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,

  isCheckingAuth: true,

  checkAuth: async (req, res) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login", data);
        toast.success("Logged in successful");
        set({ authUser: res.data });
    } catch (error) {
        console.log(error);
        toast.error("Invalid credentials");
    } finally {
        set({ isLoggingIn: false });
    }
  },

  signup: async (data) => {
    set({isSigningUp: true});
    try {
        const res = await axiosInstance.post("/auth/signup", data);
        toast.success("Signed up successfull");
        set({ authUser: res.data }); 
    } catch (error) {
        console.log(error);
        toast.error("Signup failed");
    } finally {
        set({isSigningUp: false});
    }
  }, 

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged out successfully");
      set({ authUser: null });
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  },

  getProfile: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    }
  },

  

}));
