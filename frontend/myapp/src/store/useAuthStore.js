import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast";
import {io} from "socket.io-client";


const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set,get) => ({
  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,

  isCheckingAuth: true,

  onlineUsers: [],

  socket: null,

  checkAuth: async (req, res) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
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
        set({ authUser: res.data });
        toast.success("Logged in successful");

        get().connectSocket();

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
        set({ authUser: res.data }); 
        toast.success("Signed up successfull");

        get().connectSocket();

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
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();

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

  connectSocket: () => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    
    const socket = io(BASE_URL,{
      query: {userId:authUser._id},
      transports: ["websocket"],
    });
    socket.connect();
    set({ socket:socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers:userIds });
    })
  },

  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },
  

}));
