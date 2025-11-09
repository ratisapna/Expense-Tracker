import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "./expenseService";
import { toast } from "react-toastify";

const initialState = {
  expenses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  monthlySummary: []
};

// Fetch all expenses
export const getExpenses = createAsyncThunk(
  "expenses/getAll",
  async (_, thunkAPI) => {
    try {
      return await expenseService.getExpenses();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to load expenses";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add expense
export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expenseData, thunkAPI) => {
    try {
      return await expenseService.addExpense(expenseData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to add expense";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id, thunkAPI) => {
    try {
      return await expenseService.deleteExpense(id);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to delete expense";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMonthlySummary = createAsyncThunk(
  "expenses/getMonthlySummary",
  async (_, thunkAPI) => {
    try {
      return await expenseService.getMonthlySummary();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to load summary";
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    resetExpense: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload);
        toast.success("Expense added successfully");
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((e) => e._id !== action.meta.arg);
        toast.success("Expense deleted");
      })
      .addCase(getMonthlySummary.fulfilled, (state, action) => {
        state.monthlySummary = action.payload;
      });
  },
});

export const { resetExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
