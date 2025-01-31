import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import axios from "axios";
import {toast} from "react-hot-toast";

export const useTaskStore = create((set)=>({
    tasks:[],
    fetchTasks: async () => {
        try {
            const res = await axiosInstance.get("/tasks",{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},

            });
            set({tasks:res.data});
        }
        catch (error) {
            console.log(error);
            toast.error("Failed to fetch tasks");
        }
    },
    completeTask: async (taskId) => {
        try {
            await axiosInstance.post(`/tasks/${taskId}/complete`,null,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            });

            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== taskId),
            }));

        } catch (error) {
            console.log(error);
            toast.error("Failed to complete task");
        }
    },

}))