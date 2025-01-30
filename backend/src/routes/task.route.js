import express from "express";
import {
  getTasks,
  updateTask,
  history,
} from "../controllers/task.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

const predefinedTasks = [
  { task: "Meditate for 5 minutes", isPredefined: true },
  { task: "Write 3 things you're grateful for", isPredefined: true },
  { task: "Drink a glass of water", isPredefined: true },
  { task: "Take a deep breath", isPredefined: true },
  { task: "Stretch for a minute", isPredefined: true },
  { task: "Call a friend or family member", isPredefined: true },
  { task: "Read a positive quote", isPredefined: true },
  { task: "Go for a short walk", isPredefined: true },
  { task: "Practice mindful breathing", isPredefined: true },
  { task: "Listen to calming music", isPredefined: true },
];

router.get("/", protectRoute, getTasks);
router.put("/:taskId", protectRoute, updateTask);
router.get("/history", protectRoute, history);
router.post("/insert-predefined-tasks", async (req, res) => {
  try {
    const taskCount = await Task.countDocuments({ isPredefined: true });

    if (taskCount === 0) {
      await Task.insertMany(predefinedTasks);
      return res
        .status(200)
        .json({ message: "Predefined tasks added successfully!" });
    }

    res
      .status(400)
      .json({ message: "Predefined tasks already exist in the database!" });
  } catch (error) {
    console.error("Error inserting tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
