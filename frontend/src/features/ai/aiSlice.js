import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import aiService from "./aiService";
import { toast } from "react-toastify";

const initialState = {
  insights: "",
  chatHistory: [],
  isLoading: false,
  isError: false,
};

// Fetch AI insights
export const getAIInsights = createAsyncThunk(
  "ai/getInsights",
  async (_, thunkAPI) => {
    try {
      return await aiService.getInsights();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to get AI insights";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Chat with AI
export const sendAIChat = createAsyncThunk(
  "ai/sendChat",
  async (question, thunkAPI) => {
    try {
      return await aiService.sendChat(question);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "AI chat failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    resetAI: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.insights = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Insights
      .addCase(getAIInsights.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAIInsights.fulfilled, (state, action) => {
        state.isLoading = false;
        state.insights = action.payload.insights;
      })
      .addCase(getAIInsights.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      // Chat
      .addCase(sendAIChat.fulfilled, (state, action) => {
        state.chatHistory.push({
          role: "user",
          content: action.meta.arg,
        });
        state.chatHistory.push({
          role: "ai",
          content: action.payload.reply,
        });
      });
  },
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer;
