import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import { ordersAPI } from '../services/orders'; // Will be created in Week 3
import { VALIDATION, DELIVERY_AREAS, PAYMENT_METHODS } from '../constants/config';
import { logger } from '../utils/logger';
import { AlertCircle } from 'lucide-react';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryArea: 'AL_SADD', // Default to Al Sadd
    deliveryAddress: '',
    deliveryInstructions: '',
    paymentMethod: PAYMENT_METHODS.CASH.id, // Default to Cash on Delivery
  });

  const [formErrors, setFormErrors] = useState({});

  const deliveryFee = DELIVERY_AREAS[formData.deliveryArea]?.fee || 0; // Default to 0 if area not found
  const total = cartTotal + deliveryFee;

  const validateForm = () => {
    const errors = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Name is required';
    }
    if (!VALIDATION.EMAIL_REGEX.test(formData.customerEmail)) {
      errors.customerEmail = 'Valid email is required';
    }
    if (!VALIDATION.PHONE_REGEX.test(formData.customerPhone)) {
      errors.customerPhone = 'Valid Qatar phone is required (e.g., +97450123456)';
    }
    if (!formData.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!validateForm()) {
      setError('Please fix the errors above');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        deliveryArea: formData.deliveryArea,
        deliveryAddress: formData.deliveryAddress,
        deliveryInstructions: formData.deliveryInstructions,
        paymentMethod: formData.paymentMethod,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      logger.info('Attempting to create order', orderData);

      // --- Mock API call for now ---
      // In Week 4, you'll uncomment the actual API call:
      // const response = await ordersAPI.create(orderData);
      const mockResponse = { orderNumber: `ORD-${Date.now()}`, message: 'Order placed successfully!' };

      setTimeout(() => {
        logger.info('Order created (mocked)', mockResponse);
        clearCart();
        navigate(`/order-confirmation/${mockResponse.orderNumber}`, {
          state: { orderData: { ...orderData, ...mockResponse } }
        });
      }, 1500); // Simulate network delay
      // --- End Mock API call ---

    } catch (err) {
      logger.error('Checkout error', err);
      const errorMessage = err.message || 'Failed to place order. Please try again.';
      setError(errorMessage);
    } finally {
      // setLoading(false); // Will be set to false after the setTimeout in mock, or directly from real API
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1 column on mobile, 3 on desktop
            Left 2 columns: form
            Right 1 column: summary
        */}

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-6 rounded-lg">
          {/* onSubmit = Form submission handler */}

          {error && (
            // Show error message if any
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-red-800">{error}</h3>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* space-y-6 = Vertical space between form groups */}

            {/* Customer Info */}
            <div>
              <label className="block font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${formErrors.customerName ? 'border-red-500' : 'border-gray-300'}`}

              />
              {formErrors.customerName && <p className="text-red-600 text-sm mt-1">{formErrors.customerName}</p>}
              {/* Show error message if validation failed */}
            </div>

            <div>
              <label className="block font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${formErrors.customerEmail ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.customerEmail && <p className="text-red-600 text-sm mt-1">{formErrors.customerEmail}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2">Phone *</label>
              <input
                type="tel"
                name="customerPhone"
                placeholder="+974XXXXXXXX"
                value={formData.customerPhone}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${formErrors.customerPhone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.customerPhone && <p className="text-red-600 text-sm mt-1">{formErrors.customerPhone}</p>}
            </div>

            {/* Delivery Info */}
            <div>
              <label className="block font-semibold mb-2">Delivery Area *</label>
              <select
                name="deliveryArea"
                value={formData.deliveryArea}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                {Object.entries(DELIVERY_AREAS).map(([key, { label, fee }]) => (
                  // .entries() = Convert object to array of [key, value] pairs
                  // .map() = Loop through and create option element for each

                  <option key={key} value={key}>
                    {label} (+QAR {fee})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Delivery Address *</label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 ${formErrors.deliveryAddress ? 'border-red-500' : 'border-gray-300'}`}
                rows="3"
              />
              {formErrors.deliveryAddress && <p className="text-red-600 text-sm mt-1">{formErrors.deliveryAddress}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2">Special Instructions (Optional)</label>
              <textarea
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
                rows="2"
                placeholder="e.g., Ring the bell twice, Leave at door, etc."
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-semibold mb-2">Payment Method *</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                {Object.values(PAYMENT_METHODS).map(method => (
                  <option key={method.id} value={method.id}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'}
              {/* Show "Processing..." while submitting */}
            </button>
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <ul className="mb-6 space-y-3">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center text-gray-700">
                <span>{item.name} x {item.quantity}</span>
                <span>QAR {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 mb-6 border-t pt-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>QAR {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee ({DELIVERY_AREAS[formData.deliveryArea]?.label || 'Unknown'})</span>
              <span>QAR {deliveryFee.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total</span>
            <span>QAR {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;