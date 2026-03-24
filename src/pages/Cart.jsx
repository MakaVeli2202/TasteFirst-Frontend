import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

function Cart() {

  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();


  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
        <Link to="/products" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            // Loop through cart items

            <div key={item.id} className="bg-white border rounded-lg p-6 mb-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600">QAR {item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Minus size={20} />
                </button>

                <span className="text-xl font-bold">{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">QAR {(item.price * item.quantity).toFixed(2)}</p>


                <button
                  onClick={() => removeFromCart(item.id)}

                  className="text-red-600 hover:text-red-700 mt-2 flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">

          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-2 mb-6 border-b pb-4">


            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>QAR {cartTotal.toFixed(2)}</span>
              {/* .toFixed(2) = Format to 2 decimal places */}
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total</span>
            <span>QAR {cartTotal.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full block text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="w-full block text-center mt-3 border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;