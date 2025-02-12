import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "../config/config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import chatRoutes from "./routes/chat.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);
app.use("/api/chat", chatRoutes);

app.listen(5001, () => {
  connectDB();
  console.log(`Server is running on port 5001`);
});
