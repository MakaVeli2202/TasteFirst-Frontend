import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/products'; 
import { logger } from '../utils/logger';
import { ShoppingCart, AlertCircle } from 'lucide-react';

function ProductCatalog() {

  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        logger.info('Fetching products from API');
        // --- Mock data for now ---
        const mockData = [
          {
            id: 'prod1',
            name: 'Protein Tiramisu',
            description: 'Delicious protein-packed Italian dessert.',
            imageUrl: 'https://placehold.co/400x300?text=Tiramisu',
            price: 25.00,
            calories: 180,
            protein: 15,
            carbs: 20,
            fat: 8,
            fiber: 2,
            stockQuantity: 10,
            category: 'Desserts'
          },
          {
            id: 'prod2',
            name: 'Chocolate Mousse',
            description: 'Rich and creamy chocolate mousse with low carbs.',
            imageUrl: 'https://placehold.co/400x300?text=Chocolate+Mousse',
            price: 22.00,
            calories: 150,
            protein: 12,
            carbs: 10,
            fat: 10,
            fiber: 3,
            stockQuantity: 5,
            category: 'Desserts'
          },
          {
            id: 'prod3',
            name: 'Berry Cheesecake',
            description: 'Light and fresh cheesecake with mixed berries.',
            imageUrl: 'https://placehold.co/400x300?text=Berry+Cheesecake',
            price: 28.00,
            calories: 200,
            protein: 18,
            carbs: 25,
            fat: 9,
            fiber: 4,
            stockQuantity: 15,
            category: 'Desserts'
          },
          {
            id: 'prod4',
            name: 'Vanilla Bean Pudding',
            description: 'Smooth vanilla pudding, high in protein.',
            imageUrl: 'https://placehold.co/400x300?text=Vanilla+Pudding',
            price: 18.00,
            calories: 130,
            protein: 10,
            carbs: 15,
            fat: 5,
            fiber: 1,
            stockQuantity: 20,
            category: 'Desserts'
          },
        ];
        // --- End Mock data ---

        // In Week 4, you'll uncomment the actual API call:
        // const data = await productsAPI.getAll();
        // setProducts(data);
        // logger.info(`Fetched ${data.length} products`);

        // For now, use mock data and simulate a delay
        setTimeout(() => {
          setProducts(mockData);
          logger.info(`Loaded ${mockData.length} mock products`);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (err) {
        const errorMessage = err.message || 'Failed to load products';
        setError(errorMessage);
        logger.error('Error fetching products', err);
        setLoading(false); // Also set loading to false on error
      }
    };
    fetchProducts();

  }, []);
  // [] = Dependencies (empty = run only once on mount)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-4">

          <AlertCircle className="text-red-600" size={32} />

          <div>
            <h3 className="font-bold text-red-800">Error Loading Products</h3>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">
              Make sure the backend API is running on http://localhost:5000
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Our Products</h1>
      <p className="text-gray-600 text-lg mb-12">
        Premium desserts with transparent nutrition
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (


          <div
            key={product.id}


            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition transform hover:scale-105"

          >
            <Link to={`/products/${product.id}`}> {/* Link to product detail page */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"

                onError={(e) => {
                  // onError = If image fails to load
                  e.target.src = 'https://via.placeholder.com/400x300?text=Product';
                  // Use fallback placeholder image
                }}
              />
            </Link>

            <div className="p-6">
              {/* p-6 = Padding inside card */}

              <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {/* flex-wrap = Items wrap to next line
                    gap-2 = Space between items
                    mb-6 = Margin bottom
                */}

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {/* Badge styling (background, text color, rounded) */}
                  {product.calories} kcal
                </span>

                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {product.protein}g protein
                </span>
              </div>

              <div className="flex justify-between items-center mb-6">
                {/* flex = Flexbox
                    justify-between = Space between (price on right)
                    items-center = Vertically center
                    mb-6 = Margin bottom
                */}

                <span className="text-3xl font-bold text-green-600">
                  {/* text-3xl = Huge text
                      text-green-600 = Green color
                  */}
                  QAR {product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => addToCart(product, 1)}

                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"

              >
                <ShoppingCart size={18} />
                {/* Shopping cart icon */}

                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;