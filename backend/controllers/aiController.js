// backend/controllers/aiController.js
import Expense from "../models/expenseModel.js";
import axios from "axios";

// 🧠 Generate spending insights
export const getAIInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    if (!expenses.length)
      return res.status(200).json({ message: "No expenses found yet." });

    // Create a readable list for the AI
    const expenseSummary = expenses
      .map(
        (e) =>
          `${e.title} - ${e.category} - ₹${e.amount} on ${e.date
            .toISOString()
            .split("T")[0]}`
      )
      .join("\n");

    const prompt = `
    You are a financial assistant. Analyze the following expenses:
    ${expenseSummary}

    Write 3 short sentences that include:
    1. Spending trends.
    2. Tips for saving money.
    3. Highlight of top spending categories.
    Be concise, insightful, and user-friendly.
    `;

    // ✅ Use free local Ollama model instead of OpenAI
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral", // or "llama3" if installed
      prompt,
      stream: false,
    });

    const aiInsight = response.data.response.trim();

    res.json({ insights: aiInsight });
  } catch (error) {
    console.error("AI Insights Error:", error.message);
    res.status(500).json({
      message:
        "Failed to generate insights. Make sure Ollama is running on localhost:11434.",
    });
  }
};

//chat with AI
export const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ message: "Please provide a question." });

    // ✅ 1️⃣ Fetch user’s expense data
    const expenses = await Expense.find({ user: req.user.id });

    // Format into readable text for AI
    const expenseList = expenses
      .map(
        (e) =>
          `${e.title} - ${e.category} - ₹${e.amount} on ${new Date(
            e.date
          ).toLocaleDateString()}`
      )
      .join("\n");

    // ✅ 2️⃣ Construct intelligent prompt
    const prompt = `
    You are an AI financial assistant analyzing the following user expenses:
    ${expenseList || "No expenses found."}

    Based on this data, answer the following question:
    "${question}"

    Please reply with concise, data-based insights. If the data doesn't exist, politely explain that.
    `;

    // ✅ 3️⃣ Use Ollama (free) or OpenAI (if available)
    let aiReply;

    try {
      // Try Ollama first (local, free)
      const ollamaResponse = await axios.post("http://localhost:11434/api/generate", {
        model: "mistral",
        prompt,
        stream: false,
      });
      aiReply = ollamaResponse.data.response.trim();
    } catch (err) {
      console.warn("Ollama failed, using OpenAI fallback...");
      const openaiResponse = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      });
      aiReply = openaiResponse.choices[0].message.content.trim();
    }

    // ✅ 4️⃣ Send AI’s personalized response
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ message: "AI chat failed to process your question." });
  }
};