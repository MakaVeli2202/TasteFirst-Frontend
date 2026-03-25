import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/auth";
import { logger } from "../utils/logger";

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    // Initialize user from localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper to update user and persist to localStorage
    const updateUserState = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (token) {
                    const userData = await authAPI.getCurrentUser();
                    updateUserState(userData);
                    logger.info('User authenticated', userData);
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    logger.warn("Token expired or invalid");
                    setError("Your session has expired. Please login again.");
                } else {
                    logger.error("Auth check failed", error);
                }
                
                localStorage.removeItem("authToken");
                setToken(null);
                updateUserState(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [token]);

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.register(userData);
            logger.info('User registered successfully');
            
            if (response.token) {
                localStorage.setItem("authToken", response.token);
                setToken(response.token);
                updateUserState({
                    id: response.userId,
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    role: response.role,
                });
            }
            
            return { success: true, data: response };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            logger.error('Registration error', error);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.login(email, password);
            
            localStorage.setItem("authToken", response.token);
            setToken(response.token);
            
            updateUserState({
                id: response.userId,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                role: response.role,
            });
            
            logger.info('User logged in', email);
            return { success: true, data: response };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            setError(errorMessage);
            logger.error('Login error', error);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            logger.error('Logout API call failed', error);
        } finally {
            localStorage.removeItem("authToken");
            setToken(null);
            setError(null);
            updateUserState(null);
            logger.info("User logged out");
        }
    };

    const updateProfile = async (profileData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authAPI.updateProfile(profileData);
            
            updateUserState({
                ...user,
                ...response
            });
            
            logger.info('Profile updated successfully');
            return { success: true, data: response };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Update failed';
            setError(errorMessage);
            logger.error('Profile update error', error);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    const isAuthenticated = () => {
        return !!user && !!token;
    };

    const isAdmin = () => {
        return user?.role === 'Admin';
    };

    const value = {
        user,
        token,
        error,
        loading,
        register,
        login,
        logout,
        updateProfile,
        clearError,
        isAuthenticated,
        isAdmin,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}