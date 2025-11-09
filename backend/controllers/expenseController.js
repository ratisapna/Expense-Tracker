// backend/controllers/expenseController.js
import Expense from "../models/expenseModel.js";
import axios from "axios";
import mongoose from "mongoose";

// 🧠 AI helper for categorization
export const categorizeExpenseWithAI = async (description) => {
  try {
    const prompt = `
    You are an intelligent financial assistant.
    Categorize the following expense into ONE of these:
    ["Food", "Travel", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"]

    Expense description: "${description}"

    Respond with only the category name. No explanation.
    `;

    // ✅ Send prompt to Ollama local model (free)
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral", // or "llama3" / "phi3" / "gemma" — whichever you installed
      prompt,
      stream: false,
    });

    // Extract and sanitize AI’s reply
    const category = response.data.response.trim();

    // Fallback safety
    const validCategories = [
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Entertainment",
      "Health",
      "Education",
      "Other",
    ];
    return validCategories.includes(category) ? category : "Other";
  } catch (error) {
    console.error("AI categorization failed:", error.message);
    return "Other";
  }
};

// 🧾 Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💰 Add new expense with AI categorization
export const addExpense = async (req, res) => {
  try {
    const { title, amount, description, date } = req.body;

    if (!title || !amount)
      return res.status(400).json({ message: "Title and amount are required" });

    // 🧠 Get AI category
    const aiCategory = await categorizeExpenseWithAI(description || title);

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category: aiCategory,
      aiCategory,
      date,
      description,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ convert to ObjectId

    const result = await Expense.aggregate([
      {
        $match: { user: userId },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = result.map((r) => ({
      month: `${months[r._id.month - 1]} ${r._id.year}`,
      total: r.total,
    }));

    console.log("Monthly Summary:", formatted);
    res.json(formatted);
  } catch (error) {
    console.error("Monthly Summary Error:", error);
    res.status(500).json({ message: "Failed to load monthly summary" });
  }
};

