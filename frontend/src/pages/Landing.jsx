import { Link } from "react-router-dom";
import img from '../images/dashboard.png';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-5 px-8 bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">
          <span className="text-blue-600">💸</span> AI Expense Tracker
        </h1>
        <div className="flex gap-6 text-gray-600">
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-blue-600 transition">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-10 md:px-20 py-16">
        {/* Text Content */}
        <div className="max-w-xl mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            AI Expense Tracker
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            <span className="text-blue-600 font-medium">
              Track • Analyze • Predict with AI
            </span>
            <br />
            Simplify your expense management with intelligent insights, helping
            you stay in control of your finances effortlessly.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-[400px]">
          <img
            src={img}
            alt="Dashboard Preview"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Features Designed for You
        </h3>
        <p className="text-gray-500 mb-10">
          Everything you need to manage your finances intelligently and
          effortlessly.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <div className="text-blue-600 text-3xl mb-3">📊</div>
            <h4 className="font-semibold text-lg mb-2">Smart Tracking</h4>
            <p className="text-gray-500 text-sm">
              Automatically categorize your expenses and get a clear view of
              your spending habits.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <div className="text-blue-600 text-3xl mb-3">📈</div>
            <h4 className="font-semibold text-lg mb-2">In-depth Analysis</h4>
            <p className="text-gray-500 text-sm">
              Visualize your financial data with easy-to-understand charts and
              reports.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <div className="text-blue-600 text-3xl mb-3">🤖</div>
            <h4 className="font-semibold text-lg mb-2">AI Predictions</h4>
            <p className="text-gray-500 text-sm">
              Leverage AI to forecast future expenses and make smarter financial
              decisions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-gray-100">
        <h3 className="text-2xl font-semibold mb-3 text-gray-800">
          Ready to take control of your finances?
        </h3>
        <p className="text-gray-500 mb-6">
          Join now and start your journey towards financial clarity.
        </p>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 text-sm border-t">
        <div className="flex justify-center gap-4 mb-3">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
        </div>
        <p>© {new Date().getFullYear()} AI Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
