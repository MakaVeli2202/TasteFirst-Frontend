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