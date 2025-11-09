# 🧾 AI Expense Tracker — Full Setup Guide

An intelligent expense tracker built using the MERN stack (MongoDB, Express, React, Node.js) with JWT authentication and AI-powered insights.  
It uses Ollama + Llama/Mistral for free local AI processing — no OpenAI API key required.

---

## 🧠 Features

- ✅ Add, edit, and delete expenses
- ✅ JWT-secured authentication (login/register)
- ✅ Monthly summaries and visual charts
- ✅ AI-powered categorization and insights
- ✅ AI chat assistant for spending analysis
- ✅ TailwindCSS responsive design
- ✅ Works offline with Ollama (local AI)

---

## ⚙️ 1. Clone the Repository

```bash
[git clone https://github.com/](https://github.com/ratisapna/Expense-Tracker.git)
cd Expense-Tracker
```

---

## ⚙️ 2. Backend Setup

```bash
cd backend
npm install
```

**🔧 Create `.env` file inside backend/**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expenseAI
JWT_SECRET=your_secret_key_here
```

*(Optional, for OpenAI fallback:)*

```
OPENAI_API_KEY=your_openai_api_key_here
```

**▶️ Start Backend Server**

```bash
npm run dev
```

Backend will run at:  
👉 http://localhost:5000

---

## 💻 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**🛠️ Update API Base URL**

In `frontend/src/api/api.js`, set your backend address:

```js
export const API_URL = "http://localhost:5000";
```

Then start the frontend:

```bash
npm run dev
```

Frontend will run at:  
👉 http://localhost:5173

---

## 🧩 4. Setting Up Ollama (Free Local AI)

Ollama lets you run powerful open-source models like Llama 3 and Mistral on your local machine — no API keys needed.

### 🧱 Step 1: Install Ollama

🔗 [Download here](https://ollama.com/download)

Install it according to your OS:

- **Windows:** download .exe, install normally
- **macOS:** drag Ollama to Applications
- **Linux:** run

    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

### ⚙️ Step 2: Pull the Models

Once installed, run these in your terminal:

```bash
ollama pull llama3
ollama pull mistral
```

This downloads both models locally (can take a few minutes).

### ▶️ Step 3: Start Ollama

Start the Ollama server in the background:

```bash
ollama serve
```

By default, it runs on:  
http://localhost:11434

---

## 🔗 5. Using Ollama with the Backend

Your backend automatically connects to Ollama via:  
http://localhost:11434/api/generate

If Ollama is running, your AI routes will:

- Categorize expenses automatically
- Generate personalized insights
- Respond in AI Chat

---

## 🧠 6. Optional: Seeding Dummy Data

Generate sample expenses to test charts and insights:

```bash
cd backend
node seedExpenses.js
```

This script creates 200+ random expenses across all months and categories.

---

## 💬 Questions, Issues & Contributions

Please open issues or PRs for bug reports, feature requests, or suggestions.

---

**Happy tracking! 🚀**
