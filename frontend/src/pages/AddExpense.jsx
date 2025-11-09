import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../features/expenses/expenseSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddExpense = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [aiCategory, setAiCategory] = useState("Analyzing...");

  const { title, amount, date, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const expense = await dispatch(
        addExpense({ title, amount, description, date })
      ).unwrap();

      setAiCategory(expense.aiCategory || "Other");
      toast.success(`Expense Added — Category: ${expense.aiCategory}`);
      setFormData({
        title: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600 px-6 py-4 flex items-center gap-2">
            💰 AI Expense Tracker
          </h1>
          <nav className="flex flex-col mt-4">
            <Link to="/dashboard" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link to="/add-expense" className="px-6 py-2 bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium">
              Add Expense
            </Link>
            <Link to="/expenses" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              All Expenses
            </Link>
            <Link to="/chat" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              AI Chat
            </Link>
            <Link to="/settings" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Expense</h2>
        <p className="text-gray-500 mb-8">Enter your expense details below.</p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm max-w-2xl space-y-5"
        >
          <div>
            <label className="block text-gray-700 text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="e.g., Lunch with team"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={handleChange}
                placeholder="e.g., 150.00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              rows="3"
              placeholder="Add any extra details..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              AI-Suggested Category
            </label>
            <input
              type="text"
              value={aiCategory}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-600"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="reset"
              onClick={() => setFormData({ title: "", amount: "", description: "" })}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Expense"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddExpense;
