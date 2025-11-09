// backend/seedExpenses.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Expense from "../models/expenseModel.js";
import User from "../models/userModel.js";

dotenv.config();

// ✅ Connect to MongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/ai_expense_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("✅ MongoDB connected");

// Get a user ID (you can replace this manually with your own user’s _id)
const user = await User.findOne({ _id: "69109290d275dd0ea429b8ee" });
if (!user) {
  console.log("❌ No user found. Please register a user first.");
  process.exit();
}

// Categories and sample titles
const categories = {
  Food: [
    "McDonald's",
    "Domino's Pizza",
    "KFC",
    "Subway",
    "Starbucks Coffee",
    "Zomato Order",
    "Swiggy Lunch",
    "Big Bazaar Groceries",
  ],
  Travel: [
    "Uber Ride",
    "Ola Cab",
    "Train Ticket",
    "Flight Booking",
    "Fuel Refill",
    "Bus Ticket",
    "Car Maintenance",
  ],
  Shopping: [
    "Amazon Order",
    "Flipkart Purchase",
    "Clothing Mall",
    "Shoe Store",
    "Electronics Shop",
    "Book Purchase",
  ],
  Bills: [
    "Electricity Bill",
    "Internet Recharge",
    "Mobile Bill",
    "Netflix Subscription",
    "Spotify Premium",
    "Water Bill",
  ],
  Entertainment: [
    "Movie Ticket",
    "Concert Pass",
    "Theme Park",
    "PUBG UC Purchase",
    "OTT Subscription",
  ],
  Health: [
    "Doctor Consultation",
    "Medicine Purchase",
    "Gym Membership",
    "Protein Supplement",
    "Health Checkup",
  ],
  Education: [
    "Udemy Course",
    "College Fees",
    "Online Certification",
    "Books Purchase",
    "Exam Fee",
  ],
};

// Helper function
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✅ Generate random expenses for each month of 2025
const dummyExpenses = [];
const year = 2025;

for (let month = 0; month < 12; month++) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const numExpenses = 20 + Math.floor(Math.random() * 15); // ~20–35 per month

  for (let i = 0; i < numExpenses; i++) {
    const category = getRandom(Object.keys(categories));
    const title = getRandom(categories[category]);
    const amount = randomAmount(100, 5000);
    const day = Math.floor(Math.random() * daysInMonth) + 1;

    dummyExpenses.push({
      user: user._id,
      title,
      category,
      amount,
      date: new Date(year, month, day),
      description: `${title} expense in ${category} category.`,
    });
  }
}

// ✅ Save to Mongo
await Expense.insertMany(dummyExpenses);
console.log(`✅ Inserted ${dummyExpenses.length} dummy expenses for ${user.name}.`);

await mongoose.disconnect();
console.log("✅ MongoDB disconnected.");
