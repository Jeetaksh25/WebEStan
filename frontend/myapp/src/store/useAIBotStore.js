import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";


const API_KEY="AIzaSyApCBdx6xDwRZhWFEqT7CsGwnvp1mkVEhg";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

console.log(API_KEY)

export const useAIBotStore = create((set, get) => ({
  prompts: [],
  isBotLoading: false,
  chatHistory: [],


  generateBotResponse: async (userMessage) => {
    set({ isBotLoading: true });

    const chatHistory = get().chatHistory;
    chatHistory.push({
      role: "user",
      parts: [{ text: userMessage.text }, ...(userMessage.file ? [{ inline_data: userMessage.file }] : [])],
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      chatHistory.push({ role: "model", parts: [{ text: apiResponseText }] });

      set((state) => ({ prompts: [...state.prompts, { sender: "bot", text: apiResponseText }], chatHistory }));
    } catch (error) {
      console.error("AI Bot Error:", error);
      toast.error("Failed to generate response");
    } finally {
      set({ isBotLoading: false });
    }
  },

  handleOutgoingMessage: (userMessage) => {
    set((state) => ({ prompts: [...state.prompts, { sender: "user", text: userMessage.text }] }));
    get().generateBotResponse(userMessage);
  },

  resetChat: () => set({ prompts: [], chatHistory: [] }),
}));
