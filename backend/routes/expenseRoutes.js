// backend/routes/expenseRoutes.js
import express from "express";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  getMonthlySummary
} from "../controllers/expenseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/expenses
// @desc    Get all user expenses
router.get("/", protect, getExpenses);

// @route   POST /api/expenses
// @desc    Add new expense (AI category later)
router.post("/", protect, addExpense);

// @route   PUT /api/expenses/:id
// @desc    Update expense
router.put("/:id", protect, updateExpense);

// @route   DELETE /api/expenses/:id
// @desc    Delete expense
router.delete("/:id", protect, deleteExpense);

router.get("/monthly-summary", protect, getMonthlySummary);

export default router;
