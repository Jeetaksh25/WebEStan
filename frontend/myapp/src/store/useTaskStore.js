import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import axios from "axios";

export const useTaskStore = create((set)=>({
    tasks:[],
    history:[],
    allCompleted: false,

    fetchTasks: async () => {
        try {
            const {data} = await axiosInstance.get("/tasks");
            set({
                tasks: data,
                allCompleted: data.length === 3 && data.every(task => task.taskStatus)
            });
        } catch (error) {
            console.log(error);
        }
    },

    fetchHistory: async () => {
        try {
            const {data} = await axiosInstance.get("/tasks/history");
            set({history: data})
        } catch (error) {
            console.log(error);
        }
    },

    completedTask: async (taskId) => {
        try {
            const {data} = axiosInstance.put(`/tasks/${taskId}`,{taskStatus: true});

            set((state)=>{
                const updatedTasks = state.tasks.map(task => task._id === taskId ? data : task);
                const allCompleted = updatedTasks.length === 3 && updatedTasks.every(task => task.taskStatus);

                return {tasks: updatedTasks, allCompleted}
            })
        }
        catch (error) {
            console.log(error);
        }
    }
}))