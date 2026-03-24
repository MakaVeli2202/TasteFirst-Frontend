import axios from "axios";
import {API_CONFIG} from "../constants/config"
import {logger} from "../utils/logger"

export const apiClient = axios.create ({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type' : 'application/json'
    }
});

apiClient.interceptors.request.use (
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
            logger.api("Token assigend Succesfuly");
        }
    },
    (error) => {
        logger.error("Request Error",error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        logger.api(response.config.method,response.config.url,response.status || 0);
    return response.data;
    },
    (error) => {
        if (error.response.status === 401){
              logger.warn('Unauthorized request - you might need to re-authenticate.', error);
              localStorage.removeItem("authToken");
        }
      
    if (error.response) {
      logger.error(`API Error ${error.response.status} for ${error.config.method} ${error.config.url}`, error.response.data);
    } else if (error.request) {
      logger.error('API Error: No response received', error.request);
    } else {
      logger.error('API Error:', error.message);
    }

    return Promise.reject(error);
    }
        
);
export default apiClient;