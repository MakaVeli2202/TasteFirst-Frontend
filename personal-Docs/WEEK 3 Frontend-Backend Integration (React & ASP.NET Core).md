## **WEDNESDAY (4-5 hours) - Frontend (React): Integrate Auth & Products**

Now you'll connect your React frontend to the backend API you just built.

### **STEP 1: Expand Frontend API Services**

You previously created `src/services/products.js` and `src/services/auth.js`. Let's ensure `auth.js` is fully leveraging the `apiClient` and expand `products.js` to match the backend controller.

1.  **Update `src/services/auth.js`:**
    This should already be mostly correct based on the placeholder logic in Week 1, but ensure it's structured to call the `apiClient` and handle responses.

    File: `src/services/auth.js`
    ````javascript
    // src/services/auth.js
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
    ````

2.  **Update `src/services/products.js`:**
    Modify the `getAll` method to make an actual API call and add a `getById` method.

    File: `src/services/products.js`
    ````javascript
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
    ````

### **STEP 2: Update `src/context/AuthContext.jsx`**

The `AuthContext` already has the structure for `register`, `login`, `logout`, `isAuthenticated`, and `isAdmin`. Ensure that the `register`, `login`, and `checkAuth` methods call the `authAPI` functions correctly. The provided `AuthContext.jsx` from Week 1 already does this.

File: `src/context/AuthContext.jsx` (verify this content is present)
````javascript
// src/context/AuthContext.jsx
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
````

### **STEP 3: Update `src/components/Header.jsx`**

Modify the header to display "Login" or "Profile/Logout" based on the user's authentication status.

File: `src/components/Header.jsx`
````javascript
// src/components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { cartItems } = useCart();
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = async () => {
        await logout();
        setMobileMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="text-2xl md:text-3xl font-bold text-green-600 hover:text-green-700 transition"
                    >
                        🍰 TasteFirst
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-6 items-center">
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-green-600 transition font-medium"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/products" 
                            className="text-gray-700 hover:text-green-600 transition font-medium"
                        >
                            Products
                        </Link>

                        {/* Admin Dashboard Link - Only for admins */}
                        {isAdmin() && (
                            <Link 
                                to="/admin" 
                                className="text-purple-600 hover:text-purple-700 transition font-medium flex items-center gap-1"
                            >
                                <Shield size={18} />
                                Admin
                            </Link>
                        )}

                        {/* Auth-dependent Navigation */}
                        {isAuthenticated() ? (
                            <>
                                <Link 
                                    to="/profile" 
                                    className="text-gray-700 hover:text-green-600 transition font-medium flex items-center gap-1"
                                >
                                    <User size={20} />
                                    <span className="hidden lg:inline">
                                        {user?.firstName || 'Profile'}
                                    </span>
                                </Link>
                                <Link 
                                    to="/orders" 
                                    className="text-gray-700 hover:text-green-600 transition font-medium"
                                >
                                    Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-700 transition flex items-center gap-1 font-medium"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                    <span className="hidden lg:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="text-gray-700 hover:text-green-600 transition font-medium flex items-center gap-1"
                            >
                                <User size={20} />
                                Login
                            </Link>
                        )}

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative flex items-center text-gray-700 hover:text-green-600 transition"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700 hover:text-green-600 transition"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
                        <Link 
                            to="/" 
                            className="block text-gray-700 hover:text-green-600 transition font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/products" 
                            className="block text-gray-700 hover:text-green-600 transition font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Products
                        </Link>

                        {isAdmin() && (
                            <Link 
                                to="/admin" 
                                className="block text-purple-600 hover:text-purple-700 transition font-medium flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Shield size={18} />
                                Admin Dashboard
                            </Link>
                        )}

                        {isAuthenticated() ? (
                            <>
                                <Link 
                                    to="/profile" 
                                    className="block text-gray-700 hover:text-green-600 transition font-medium flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <User size={20} />
                                    Profile ({user?.firstName})
                                </Link>
                                <Link 
                                    to="/orders" 
                                    className="block text-gray-700 hover:text-green-600 transition font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                                <Link 
                                    to="/cart" 
                                    className="block text-gray-700 hover:text-green-600 transition font-medium flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ShoppingCart size={20} />
                                    Cart {cartCount > 0 && `(${cartCount})`}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-red-600 hover:text-red-700 transition font-medium flex items-center gap-2"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/cart" 
                                    className="block text-gray-700 hover:text-green-600 transition font-medium flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <ShoppingCart size={20} />
                                    Cart {cartCount > 0 && `(${cartCount})`}
                                </Link>
                                <Link 
                                    to="/login" 
                                    className="block text-gray-700 hover:text-green-600 transition font-medium flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <User size={20} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
````

### **STEP 4: Update `src/pages/ProductCatalog.jsx`**

Modify this page to fetch actual product data from your backend API instead of mock data.

File: `src/pages/ProductCatalog.jsx`
````javascript
// src/pages/ProductCatalog.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/products';
import { logger } from '../utils/logger';
import { ShoppingCart, AlertCircle, Search, Filter } from 'lucide-react';

function ProductCatalog() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        logger.info('Fetching products from API');
        
        const data = await productsAPI.getAll();
        setProducts(data);
        setFilteredProducts(data);
        logger.info(`Fetched ${data.length} products from API`);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load products';
        setError(errorMessage);
        logger.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.categoryName === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.categoryName))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <p className="text-gray-600 mt-6 text-lg">Loading delicious products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4 max-w-2xl mx-auto">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={32} />
          <div className="flex-1">
            <h3 className="font-bold text-red-800 text-lg mb-2">Error Loading Products</h3>
            <p className="text-red-600 mb-3">{error}</p>
            <div className="bg-red-100 rounded p-3 text-sm text-red-700">
              <p className="font-semibold mb-1">Troubleshooting:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure the backend API is running on http://localhost:5000</li>
                <li>Check the browser console for detailed errors</li>
                <li>Verify database connection is working</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600 text-lg">
          Premium desserts with transparent nutrition
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-600 mb-6">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found matching your criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=TasteFirst';
                    }}
                  />
                  {/* Stock badge */}
                  {product.stockQuantity === 0 ? (
                  <span className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Out of Stock
                  </span>) 
                  : product.stockQuantity < 5 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Only {product.stockQuantity} left!
                  </span>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                {/* Nutrition badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {product.calories} kcal
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {product.protein}g protein
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-green-600">
                    QAR {product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={product.stockQuantity === 0}
                  className={`w-full py-2 rounded font-semibold flex items-center justify-center gap-2 transition ${
                    product.stockQuantity === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
````

### **STEP 5: Create `ProductDetailPage.jsx` (React)**

This page will display details of a single product.

```bash
touch src/pages/ProductDetailPage.jsx
```

File: `src/pages/ProductDetailPage.jsx`
````javascript
// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/products';
import { useCart } from '../context/CartContext';
import { logger } from '../utils/logger';
import { ShoppingCart, AlertCircle, Plus, Minus, ArrowLeft } from 'lucide-react';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        logger.info(`Fetching product with ID: ${id}`);
        
        const data = await productsAPI.getById(id);
        setProduct(data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load product details';
        setError(errorMessage);
        logger.error(`Error fetching product ${id}`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      logger.info(`Added ${quantity} of ${product.name} to cart`);
      // Optional: Show success toast or reset quantity
      // setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(product.stockQuantity, prev + 1));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          <p className="text-gray-600 mt-6 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4 max-w-2xl mx-auto">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={32} />
          <div className="flex-1">
            <h3 className="font-bold text-red-800 text-lg mb-2">Error Loading Product</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h3 className="font-bold text-2xl text-gray-700 mb-4">Product not found</h3>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="text-green-600 hover:text-green-700 mb-6 inline-flex items-center gap-2 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x400?text=Product';
            }}
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>

          {/* Nutrition Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
              {product.calories} kcal
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
              {product.protein}g protein
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium">
              {product.carbs}g carbs
            </span>
            <span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-medium">
              {product.fat}g fat
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium">
              {product.fiber}g fiber
            </span>
          </div>

          {/* Category & Ingredients */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <p className="text-gray-700">
              <span className="font-bold">Category:</span> {product.categoryName}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Ingredients:</span> {product.ingredients}
            </p>
          </div>

          {/* Price & Quantity Selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-5xl font-bold text-green-600">
              QAR {product.price.toFixed(2)}
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="p-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.stockQuantity}
                className="p-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              product.stockQuantity === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <ShoppingCart size={24} />
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Stock Warnings */}
          {product.stockQuantity === 0 ? (
            <p className="text-red-600 text-sm mt-3 text-center font-medium">
              Sorry, this item is currently out of stock!
            </p>
          ) : product.stockQuantity < 10 && (
            <p className="text-yellow-600 text-sm mt-3 text-center font-medium">
              Hurry! Only {product.stockQuantity} left in stock!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
````

### **STEP 6: Update `src/App.jsx` to Include `ProductDetailPage` Route**

Modify your main `App.jsx` to include the new product detail page.

File: `src/App.jsx`
````javascript
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetailPage from './pages/ProductDetailPage'; // New import
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Header />
            <main className="min-h-screen bg-white">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductCatalog />} />
                <Route path="/products/:id" element={<ProductDetailPage />} /> {/* New route */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
````

### **STEP 7: Test React Frontend Integration**

1.  **Ensure Backend API is running:** (`dotnet run` in `TasteFirstAPI` directory).
2.  **Start React development server:** Navigate to your React project (`TasteFirst`) and run `npm run dev`.
3.  **Test Product Catalog:**
    *   Navigate to `http://localhost:5173/products`. You should now see products fetched directly from your backend database (the seeded data).
    *   Click on a product image or name. You should be taken to `http://localhost:5173/products/{id}` and see the product details.
4.  **Test Authentication:**
    *   Navigate to `http://localhost:5173/register`. Try to register a new user. If successful, you should be redirected to `/login` with a success message.
    *   Navigate to `http://localhost:5173/login`. Log in with the registered user or the `user@example.com` seeded user (`Password123!`).
    *   If login is successful, the header should change to show "Profile" and a logout button.
    *   Refresh the page. You should remain logged in.
    *   Click the logout button. The header should change back to "Login".
5.  **Test Cart & Checkout:** Add items to the cart and proceed to checkout. The mock order placement should still work.

---

## **FRIDAY (2-3 hours) - Final Testing & Refinement**

*   **Review Backend API:**
    *   Run `dotnet run` for the backend.
    *   Access Swagger UI (`https://localhost:5001/swagger`) to ensure all endpoints (Auth, Products) are visible and testable.
    *   Verify that `[Authorize]` endpoints (like `GET /api/Auth/me`) require a valid JWT token.
*   **Review React Frontend:**
    *   Run your React application (`npm run dev`).
    *   Perform a full end-to-end test: Register a new user -> Log in -> Browse products -> Click a product to see details -> Add to cart -> Go to cart -> Proceed to checkout -> Place a mock order -> Verify order confirmation.
    *   Test logout/login functionality thoroughly.
    *   Check console for any errors in both frontend and backend.
    *   Ensure styling is consistent and responsive.

---

## **COMMIT YOUR WORK**

After completing all tasks and verifying functionality for the React frontend, commit your changes.

**First, commit your backend changes:**
```bash
# Navigate to the root of your backend project (C:\Users\Mahm\Desktop\TasteFirst-api)
cd TasteFirst-api

git add .
git commit -m "feat: WEEK 3 - Backend Auth & Products Controllers

## Backend Features
- Implemented `AuthDtos.cs` for registration, login, profile updates, and password changes.
- Created `AuthController.cs` with endpoints for:
    - `POST /api/Auth/register`: New user registration, password hashing, JWT generation.
    - `POST /api/Auth/login`: User authentication, JWT generation, last login update.
    - `GET /api/Auth/me`: Retrieve current authenticated user's details (requires JWT).
    - `PUT /api/Auth/profile`: Update authenticated user's profile details (requires JWT).
    - `POST /api/Auth/change-password`: Change authenticated user's password (requires JWT).
- Implemented `ProductDtos.cs` for product data transfer.
- Created `ProductsController.cs` with endpoints for:
    - `GET /api/Products`: Retrieve all active products with optional pagination.
    - `GET /api/Products/{id}`: Retrieve a single active product by ID.
- Ensured proper use of DTOs, `[ApiController]`, `[Route]`, `[Authorize]`, and dependency injection.
- Comprehensive error handling and logging for all controller actions."

git push origin main
```

**Then, commit your React frontend changes:**
```bash
# Navigate to the root of your React frontend project (C:\Users\Mahm\Desktop\TasteFirst)
cd TasteFirst

git add .
git commit -m "feat: WEEK 3 - React Frontend Integration (Auth & Products)

## React Frontend Features
- `AuthContext` now fully integrated with `authAPI` for registration, login, and session persistence (`getCurrentUser`).
- `LoginPage.jsx` and `RegisterPage.jsx` connect to `AuthContext` for backend authentication.
- `Header.jsx` dynamically displays 'Login' or 'Profile/Logout' based on user authentication status.
- `ProductCatalog.jsx` now fetches real product data from the backend `ProductsController` via `productsAPI.getAll()`.
- Added `ProductDetailPage.jsx` to display individual product details, fetching data via `productsAPI.getById()`.
- Updated `App.jsx` to include the route for `ProductDetailPage`.
- Enhanced `src/services/products.js` to include `getAll` and `getById` methods.

## Next Steps
- Implement Order, SavedAddress, and Wishlist features (Backend & Frontend)."

git push origin main
```

---

You've successfully set up the backend's core authentication and product APIs, and fully integrated your React frontend with these functionalities!

Let me know when you're ready for **WEEK 4**, where we'll continue building out the full e-commerce features, focusing on protected routes, user profile management, and ordering!
