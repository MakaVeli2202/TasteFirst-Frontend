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