import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Truck, Home } from 'lucide-react';

function OrderConfirmation() {
  // OrderConfirmation = Shows order confirmation with timeline

  const { orderNumber } = useParams();
  // useParams() = Get URL parameters
  // :orderNumber from URL like /order-confirmation/ORD-20250115-1234

  const { state } = useLocation();
  // useLocation() = Get location object including state
  // state = Data passed from navigate() in Checkout

  const orderData = state?.orderData;
  // Get order data passed from checkout page

  if (!orderData) {
    // If no order data, show error

    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Order Not Found</h1>
        <Link to="/" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
          {/* Huge green checkmark icon */}

          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Your order has been successfully placed
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center mb-8">
          <p className="text-gray-600 mb-2">Order Number</p>
          <p className="text-4xl font-bold text-blue-600">{orderNumber}</p>
          {/* Display order number from URL */}
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What's Next?</h2>

          <div className="space-y-4">
            {/* space-y-4 = Vertical space between timeline items */}

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white">
                  <CheckCircle size={24} />
                  {/* Green checkmark (completed) */}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Order Received</h3>
                <p className="text-gray-600">We've received your order and will start preparing it</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 text-gray-600">
                  <Clock size={24} />
                  {/* Gray clock (waiting) */}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Preparing</h3>
                <p className="text-gray-600">Our team will prepare your items with care</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 text-gray-600">
                  <Truck size={24} />
                  {/* Gray truck (not started) */}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Out for Delivery</h3>
                <p className="text-gray-600">Your order is on its way to you</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 text-gray-600">
                  <Home size={24} />
                  {/* Gray home (not started) */}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Delivered</h3>
                <p className="text-gray-600">Enjoy your order!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Questions?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please contact our support team:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>📧 Email: support@realcalories.qa</li>
            <li>📱 Phone: +974 4412 3456</li>
            <li>🕐 Hours: 10am - 10pm (Mon-Thu), 12pm - 11pm (Fri-Sat)</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            to="/products"
            className="flex-1 text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            Order More
          </Link>
          <Link
            to="/"
            className="flex-1 text-center border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;