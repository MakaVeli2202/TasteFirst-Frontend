import apiClient from "../services/api"
import { logger } from "../utils/logger"

export const productsAPI = {
    create: async (productData) => {
        try {
            const response = await apiClient.post("/products", productData);
            logger.info(`Product ${productData.name} has been added successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error creating product: ${error.message}`);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const response = await apiClient.get("/products");
            return response.data;
        } catch (error) {
            logger.error(`Error fetching all products: ${error.message}`);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching product with ID ${id}: ${error.message}`);
            throw error;
        }
    },

    update: async (id, productData) => {
        try {
            const response = await apiClient.put(`/products/${id}`, productData);
            logger.info(`Product ${id} has been updated successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error updating product ${id}: ${error.message}`);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await apiClient.delete(`/products/${id}`);
            logger.info(`Product ${id} has been deleted successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error deleting product ${id}: ${error.message}`);
            throw error;
        }
    }
}