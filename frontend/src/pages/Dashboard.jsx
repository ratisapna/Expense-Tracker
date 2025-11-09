import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, getMonthlySummary } from "../features/expenses/expenseSlice";
import { getAIInsights } from "../features/ai/aiSlice";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { expenses, monthlySummary } = useSelector((state) => state.expenses);
  const { insights } = useSelector((state) => state.ai);
  const { user } = useSelector((state) => state.auth);

  // Fetch all data on mount
  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getAIInsights());
    dispatch(getMonthlySummary());
  }, [dispatch]);

  // 🧮 Total and Category Stats
  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const categoryData = useMemo(() => {
    const categories = {};
    expenses.forEach((e) => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });
    return Object.keys(categories).map((cat) => ({
      name: cat,
      value: categories[cat],
    }));
  }, [expenses]);

  const topCategory =
    categoryData.sort((a, b) => b.value - a.value)[0]?.name || "N/A";

  // ✅ Current Month Spending
  const thisMonthSpending = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTotal = expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((acc, e) => acc + e.amount, 0);

    return monthlyTotal;
  }, [expenses]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600 px-6 py-4 flex items-center gap-2">
            📊 AI Tracker
          </h1>
          <nav className="flex flex-col mt-4">
            <Link
              to="/dashboard"
              className="px-6 py-2 text-blue-600 font-medium bg-blue-50 border-l-4 border-blue-600"
            >
              Dashboard
            </Link>
            <Link to="/add-expense" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
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

        <div className="px-6 py-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500">
              Here’s your financial overview for this month.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/add-expense"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              + Add Expense
            </Link>
            <Link
              to="/login"
              onClick={() => localStorage.removeItem("token")}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ₹{totalExpenses.toLocaleString()}
            </h3>
          </div>

          {/* Top Category */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Top Category</p>
            <h3 className="text-xl font-bold text-gray-800 mt-1">{topCategory}</h3>
          </div>

          {/* This Month Spending */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">This Month Spending</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ₹{thisMonthSpending.toLocaleString()}
            </h3>
          </div>

          {/* ✅ Scrollable AI Tip */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">💡 AI Tip</p>
            <div className="text-sm mt-2 text-gray-800 max-h-24 overflow-y-auto pr-2">
              {insights ? insights : "Fetching personalized insights..."}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4 text-gray-800">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                {/* ✅ Tooltip for hover */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                  formatter={(value, name) => [`₹${value}`, name]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
              {categoryData.map((d, i) => (
                <span key={i}>
                  <span
                    className="inline-block w-3 h-3 mr-1 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></span>
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          {/* ✅ Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4 text-gray-800">Monthly Trend</h3>
            {monthlySummary?.length ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={monthlySummary}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center mt-10">
                No monthly data available yet.
              </p>
            )}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Recent Expenses</h3>
            <Link to="/expenses" className="text-blue-600 text-sm hover:underline">
              View All
            </Link>
          </div>

          <table className="w-full text-left text-gray-700">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Item</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 5).map((exp) => (
                <tr key={exp._id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="py-2">{new Date(exp.date).toLocaleDateString()}</td>
                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                      {exp.category}
                    </span>
                  </td>
                  <td>{exp.title}</td>
                  <td className="text-right">₹{exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
