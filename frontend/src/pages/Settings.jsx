import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currency: "USD",
    monthlyBudget: 2500,
  });

  useEffect(() => {
    dispatch(getUserProfile()).then((res) => {
      if (res.payload) setProfile(res.payload);
    });
  }, [dispatch]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { data } = await api.put("/auth/profile", profile);
      setProfile(data);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600 px-6 py-4 flex items-center gap-2">
            ⚙️ AI Expense Tracker
          </h1>
          <nav className="flex flex-col mt-4">
            <Link to="/dashboard" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link to="/expenses" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              Expenses
            </Link>
            <Link to="/chat" className="px-6 py-2 text-gray-700 hover:bg-gray-100">
              AI Chat
            </Link>
            <Link
              to="/settings"
              className="px-6 py-2 bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile & Settings</h2>

        <div className="bg-white p-6 rounded-xl shadow-sm max-w-3xl">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <p className="font-medium text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Currency</label>
              <select
                name="currency"
                value={profile.currency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>USD</option>
                <option>INR</option>
                <option>EUR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Monthly Budget</label>
              <input
                type="number"
                name="monthlyBudget"
                value={profile.monthlyBudget}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
