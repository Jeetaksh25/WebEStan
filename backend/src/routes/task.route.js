import express from "express";
import {
  getTasks,
  addTask,
  completeTask,
} from "../controllers/task.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/tasks", protectRoute, getTasks);
router.post("/tasks/:taskId/complete", protectRoute, completeTask);
router.post("/tasks", protectRoute,addTask);

export default router;
