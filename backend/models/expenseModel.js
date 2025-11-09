// backend/models/expenseModel.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title for the expense"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    category: {
      type: String,
      default: "Other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    aiCategory: {
      type: String, // AI-suggested category (from OpenAI)
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
