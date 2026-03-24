import { createContext,useContext,useState,useEffect, use } from "react";
import { authAPI } from "../services/auth";
import { logger } from "../utils/logger";
import { LogIn, Thermometer, UserCogIcon } from "lucide-react";

const AuthContext = createContext(null);

export function useAuth (){
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }){
    const [user,setUser] = useState(null);
    const [token,setToken ] = useState(localStorage.getItem("authToken"));
    const [loading,setloading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try{
                if(token)
                {
                    const userData = await authAPI.getCurrentUser();
                    setUser(userData);
                    logger.info('User authenticated', userData);
                }
            }
            catch(error)
            {
                logger.error("auth check failed",error)
                localStorage.removeItem("authToken");
                setToken(null);
                setUser(null);
            }
            finally
            {
                setloading(false);
            }
        };
        checkAuth();    
    },[token]);

    const register = async (userData) => {
        try{
            setloading(true);
            setError(null);
            const response = await authAPI.register(userData);
            logger.info('User registered successfully');
            return { success: true, data: response };
        }
        catch(error)
        {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            logger.error('Registration error', error);
            return { success: false, error: errorMessage };
        }
        finally
        {
            setloading(false);
        }
    };

    const login = async (email,password) =>{
        try{
            setloading(true);
            setError(null);
            const response = await authAPI.login(email,password);
            localStorage.setItem("authToken",response.token);
            setToken(response.token);
            setUser({
                id: response.userData.userId,
                email: response.userData.email,
                firstName: response.userData.firstName,
                lastName: response.userData.lastName,
                role: response.userData.role,
            });
            logger.info('User logged in', response.email);
            return { success: true, data: response };
        }
        catch(error)
        {
            const errorMessage = error.response?.data?.message || 'Login failed';
            setError(errorMessage);
            logger.error('Login error', error);
            return { success: false, error: errorMessage };
        }
        finally
        {
            setloading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        setError(null);
        setUser(null);
        logger.info("user logged out");
    };

    const isAuthenticated = () => {
        return !!user && !!token;
    };

    const isAdmin = () => {
        return user?.role === 'Admin';
    };

    const value ={
        user,
        token,
        error,
        loading,
        register,
        login,
        logout,
        isAuthenticated,
        isAdmin,
    }

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    );
}
