import apiClient from "./api"
import { logger } from "../utils/logger"

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      logger.info("Registration successful");
      return response.data;
    } catch (error) {
      logger.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password }); // FIXED: Added await
      logger.info("Login successful");
      return response.data; // FIXED: Return response.data
    } catch (error) {
      logger.error("Login failed:", error.response?.data?.message || error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      logger.info("Logout successful");
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      logger.error('Logout failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      logger.error('Failed to get current user:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      logger.info("Profile updated successfully");
      return response.data;
    } catch (error) {
      logger.error('Failed to update profile:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await apiClient.post('/auth/change-password', { oldPassword, newPassword });
      logger.info("Password changed successfully");
      return response.data;
    } catch (error) {
      logger.error('Failed to change password:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}