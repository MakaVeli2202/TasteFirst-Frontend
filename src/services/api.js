import axios from 'axios';
import { logger } from '../utils/logger';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        logger.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // ✅ FIXED: Check if error.response exists before accessing .status
        if (error.response) {
            // Server responded with an error
            const status = error.response.status;
            
            switch (status) {
                case 401:
                    // Unauthorized - token expired or invalid
                    logger.warn('Unauthorized access - redirecting to login');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;
                    
                case 403:
                    // Forbidden - user doesn't have permission
                    logger.error('Access forbidden');
                    break;
                    
                case 404:
                    // Not found
                    logger.error('Resource not found');
                    break;
                    
                case 500:
                    // Server error
                    logger.error('Server error occurred');
                    break;
                    
                default:
                    logger.error(`API error ${status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            // This happens when backend is not running
            logger.error('No response from server - is the backend running?');
            error.message = 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000';
        } else {
            // Something else went wrong
            logger.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;