import apiClient from "../services/api"
import { logger } from "../utils/logger"

export const productsAPI = {
    // Get all products with optional pagination
    getAll: async (params = {}) => {
        try {
            const { pageNumber = 1, pageSize = 10, categoryId, searchTerm } = params;
            const response = await apiClient.get("/products", {
                params: { pageNumber, pageSize, categoryId, searchTerm }
            });
            return response.data;
        } catch (error) {
            logger.error(`Error fetching all products: ${error.message}`);
            throw error;
        }
    },

    // Get single product by ID
    getById: async (id) => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching product with ID ${id}: ${error.message}`);
            throw error;
        }
    },

    // Get product by slug (if you add this endpoint later)
    getBySlug: async (slug) => {
        try {
            const response = await apiClient.get(`/products/slug/${slug}`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching product with slug ${slug}: ${error.message}`);
            throw error;
        }
    },

    // Create new product (Admin only)
    create: async (productData) => {
        try {
            const response = await apiClient.post("/products", productData);
            logger.info(`Product "${productData.name}" has been added successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error creating product: ${error.response?.data?.message || error.message}`);
            throw error;
        }
    },

    // Update product details (Admin only)
    update: async (id, productData) => {
        try {
            const response = await apiClient.put(`/products/${id}`, productData);
            logger.info(`Product ${id} has been updated successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error updating product ${id}: ${error.response?.data?.message || error.message}`);
            throw error;
        }
    },

    // ✅ NEW: Adjust stock quantity
    adjustStock: async (id, adjustment, reason) => {
        try {
            const response = await apiClient.patch(`/products/${id}/stock`, {
                adjustment,
                reason
            });
            logger.info(`Stock adjusted for product ${id}: ${adjustment > 0 ? '+' : ''}${adjustment} (${reason})`);
            return response.data;
        } catch (error) {
            logger.error(`Error adjusting stock for product ${id}: ${error.response?.data?.message || error.message}`);
            throw error;
        }
    },

    // ✅ NEW: Get stock history
    getStockHistory: async (id) => {
        try {
            const response = await apiClient.get(`/products/${id}/stock-history`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching stock history for product ${id}: ${error.message}`);
            throw error;
        }
    },

    // Soft delete product (Admin only)
    delete: async (id) => {
        try {
            const response = await apiClient.delete(`/products/${id}`);
            logger.info(`Product ${id} has been deactivated successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error deleting product ${id}: ${error.response?.data?.message || error.message}`);
            throw error;
        }
    },

    // ✅ BONUS: Bulk operations (if needed later)
    bulkDelete: async (productIds) => {
        try {
            const response = await apiClient.post("/products/bulk-delete", { productIds });
            logger.info(`${productIds.length} products deactivated`);
            return response.data;
        } catch (error) {
            logger.error(`Error bulk deleting products: ${error.message}`);
            throw error;
        }
    },

    // ✅ BONUS: Get products by category
    getByCategory: async (categoryId, params = {}) => {
        try {
            const { pageNumber = 1, pageSize = 10 } = params;
            const response = await apiClient.get(`/products/category/${categoryId}`, {
                params: { pageNumber, pageSize }
            });
            return response.data;
        } catch (error) {
            logger.error(`Error fetching products for category ${categoryId}: ${error.message}`);
            throw error;
        }
    }
}