import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendAIChat } from "../features/ai/aiSlice";
import { Link } from "react-router-dom";

const AIChat = () => {
  const dispatch = useDispatch();
  const { chatHistory, isLoading } = useSelector((state) => state.ai);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return; // prevent spam

    setIsTyping(true);
    await dispatch(sendAIChat(message));
    setMessage("");
    setIsTyping(false);
  };

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isTyping]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600 px-6 py-4 flex items-center gap-2">
            🤖 AI Expense Tracker
          </h1>
          <nav className="flex flex-col mt-4">
            <Link to="/dashboard" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link to="/add-expense" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Add Expense
            </Link>
            <Link to="/expenses" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              All Expenses
            </Link>
            <Link
              to="/chat"
              className="px-6 py-2 bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
            >
              AI Chat
            </Link>
            <Link to="/settings" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Chat Section */}
      <main className="flex-1 flex flex-col">
        <header className="px-8 py-4 border-b bg-white flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">💬 Financial Assistant</h2>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50 space-y-6">
          {chatHistory.length === 0 && (
            <p className="text-gray-400 text-center mt-20">
              Start a conversation with your AI assistant!
            </p>
          )}

          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow px-4 py-3 rounded-xl flex items-center gap-2 text-gray-500 text-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
                <span>AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Box */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-white border-t flex items-center gap-3"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your finances..."
            disabled={isTyping}
            className={`flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
              isTyping ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />

          <button
            type="submit"
            disabled={isTyping || !message.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isTyping || !message.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {isTyping ? "..." : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AIChat;
