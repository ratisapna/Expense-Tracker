import api from "../../utils/api";

const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

const addExpense = async (expenseData) => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};

const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

const getMonthlySummary = async () => {
  const response = await api.get("/expenses/monthly-summary");
  return response.data;
};

const expenseService = { getExpenses, addExpense, updateExpense, deleteExpense, getMonthlySummary };

export default expenseService;
