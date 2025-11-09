import api from "../../utils/api";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = { register, login, getProfile, logout };

export default authService;
