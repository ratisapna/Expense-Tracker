import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">404 – Page Not Found 😅</h1>
      <p className="text-gray-500 mb-6">We couldn’t find that page.</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/7089/7089314.png"
        alt="Not Found"
        className="w-40 mb-8"
      />
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Back to Dashboard
      </Link>

      <footer className="mt-12 text-sm text-gray-500">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
        </div>
        <p>© {new Date().getFullYear()} AI Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotFound;
