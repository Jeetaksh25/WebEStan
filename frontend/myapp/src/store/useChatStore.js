import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

import { useAuthStore } from "./useAuthStore.js";
import { io } from "socket.io-client";  

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  suggestions: [],

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/chat/users");
      set({ users: res.data.filteredUsers });
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance(`/chat/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const {selectedUser,messages} = get();
    try {
      const res = await axiosInstance.post(`/chat/send/${selectedUser._id}`,messageData);
      set((state)=>({ messages:[...state.messages,res.data] }));
    } catch (error) {
      toast.error("Failed to send message");
    } 
  },
  //Todo: Optimize
  fetchSuggestions: async (input) =>{
    try {
      const res = await fetch(`https://api.datamuse.com/words?sp=${input}*`);
      const data = await res.json();
      if(!Array.isArray(data)) throw new Error("Invalid API response");

      set({ suggestions: data.slice(0, 5).map((item) => item.word) }); 
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      set({ suggestions: [] });
    }
  },



  setSelectedUser: (user) => set({ selectedUser:user }),
}));
