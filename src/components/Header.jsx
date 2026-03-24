import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Header() {
    const { cartItems } = useCart();
    
    // Calculate total number of items in cart
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold text-green-600">
                    TasteFirst
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link to="/products" className='text-green-700 hover:text-green-600 transition'>
                        Products
                    </Link>
                    <Link to="/cart" className='text-green-700 hover:text-green-600 transition relative'>
                        <ShoppingCart size={24}/>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <Link 
                        to="/login"
                        className='text-green-700 hover:text-green-600 transition'>
                        <User size={24}/>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;