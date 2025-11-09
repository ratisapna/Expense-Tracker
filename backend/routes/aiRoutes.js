// backend/routes/aiRoutes.js
import express from "express";
import { getAIInsights, chatWithAI } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🧠 Generate insights based on user's expenses
router.get("/insights", protect, getAIInsights);

// 💬 Chat assistant for queries
router.post("/chat", protect, chatWithAI);

export default router;
