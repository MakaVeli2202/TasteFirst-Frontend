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