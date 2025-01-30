import express from "express";
import { signup, login, logout, getProfile, checkAuth } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", protectRoute, getProfile)
router.get("/check", protectRoute, checkAuth)

export default router;