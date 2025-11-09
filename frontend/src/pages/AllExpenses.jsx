import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, deleteExpense } from "../features/expenses/expenseSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllExpenses = () => {
  const dispatch = useDispatch();
  const { expenses, isLoading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
    toast.info("Expense deleted");
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
            <Link to="/add-expense" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Add Expense
            </Link>
            <Link
              to="/expenses"
              className="px-6 py-2 bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
            >
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">All Expenses</h2>
            <p className="text-gray-500">
              View, manage, and analyze all your recorded expenses.
            </p>
          </div>
          <Link
            to="/add-expense"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Add Expense
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Title</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Date</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && expenses.length > 0 ? (
                expenses.map((exp) => (
                  <tr
                    key={exp._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-2">{exp.title}</td>
                    <td className="py-2">₹{exp.amount}</td>
                    <td className="py-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                        {exp.category || exp.aiCategory || "Other"}
                      </span>
                    </td>
                    <td className="py-2">
                      {new Date(exp.date).toLocaleDateString()}
                    </td>
                    <td className="text-right py-2 flex justify-end gap-3">
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    {isLoading ? "Loading expenses..." : "No expenses found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AllExpenses;
