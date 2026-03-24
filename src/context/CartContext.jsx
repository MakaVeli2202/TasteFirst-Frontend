import { createContext, useContext, useState, useEffect } from "react";
import { logger } from "../utils/logger";

const CartContext = createContext();

const calculateCartTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localCart = localStorage.getItem("cartItems");
            if (localCart) {
                return JSON.parse(localCart);
            } else {
                return [];
            }
        } catch (error) {
            logger.error('Failed to parse cart from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            logger.info('Cart saved to localStorage');
        } catch (error) {
            logger.error('Failed to save cart to localStorage:', error);
        }
    }, [cartItems]);

    const cartTotal = calculateCartTotal(cartItems);

    const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
        const existingItemIndex = currentItems.findIndex((item) => item.id === product.id);
            if (existingItemIndex > -1) {
                const newItems = [...currentItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + quantity
                };
                logger.info(`Updated quantity for ${product.name} in cart.`);
                return newItems;
            } else {
                logger.info(`Added ${product.name} to cart.`);
                return [...currentItems, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((currentItems) => {
            const newItems = currentItems.filter((item) => item.id !== id);
            logger.info(`Removed item with ID ${id} from cart.`);
            return newItems;
        });
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            logger.warn("Quantity must be greater than 0. Removing item from cart.");
            return;
        }
        setCartItems((currentItems) => {
            const updatedItems = currentItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        logger.info('Cart cleared.');
    };

    const value = {
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}