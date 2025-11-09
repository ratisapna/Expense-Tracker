import api from "../../utils/api";

const getInsights = async () => {
  const response = await api.get("/ai/insights");
  return response.data;
};

const sendChat = async (question) => {
  const response = await api.post("/ai/chat", { question });
  return response.data;
};

const aiService = { getInsights, sendChat };

export default aiService;
