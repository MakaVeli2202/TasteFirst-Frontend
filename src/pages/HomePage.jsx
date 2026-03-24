import { Link } from 'react-router-dom';
import { Leaf, Target, Zap, Star, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function HomePage() {
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(null);
  
  const [timeLeft, setTimeLeft] = useState({
    discount1: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    discount2: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    discount3: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  });

  useEffect(() => {
    const now = new Date();
    const target1 = new Date(now);
    target1.setDate(now.getDate() + 7);
    target1.setHours(0, 0, 0, 0);

    const target2 = new Date(now);
    target2.setDate(now.getDate() + 3);
    target2.setHours(0, 0, 0, 0);

    const target3 = new Date(now);
    target3.setDate(now.getDate() + 14);
    target3.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const calculateTimeLeft = (target) => {
        const distance = target.getTime() - currentTime;
        if (distance > 0) {
          return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      };
      setTimeLeft({
        discount1: calculateTimeLeft(target1),
        discount2: calculateTimeLeft(target2),
        discount3: calculateTimeLeft(target3)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Protein Iced Coffee',
      title: 'Protein Iced Coffee',
      subtitle: 'Healthy energy boost, low sugar',
      badge: '20% off',
      price: 100,
      stock: 80,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=360&h=240&fit=crop'
    },
    {
      id: 2,
      name: 'MilkYccino®',
      title: 'MilkYccino®',
      subtitle: 'Creamy plant-based shake',
      badge: 'Buy 2 Get 1',
      price: 139,
      stock: 65,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=360&h=240&fit=crop'
    },
    {
      id: 3,
      name: 'Matcha Chunky Bundle',
      title: 'Matcha Chunky Bundle',
      subtitle: 'Limited edition pack',
      badge: '30% off',
      price: 160,
      stock: 40,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=360&h=240&fit=crop'
    },
    {
      id: 4,
      name: 'Clear Protein',
      title: 'Clear Protein',
      subtitle: 'Hydrating and refreshing',
      badge: '20% off',
      price: 95,
      stock: 25,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=360&h=240&fit=crop'
    }
  ];

  const bestSellers = [
    {
      id: 5,
      name: 'Protein Brownie',
      price: 45,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Chocolate Chip Bar',
      price: 38,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Salted Caramel Cake',
      price: 85,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Vanilla Protein Mug Cake',
      price: 42,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop'
    }
  ];

  const newProducts = [
    {
      id: 9,
      name: 'Berry Blast Smoothie',
      price: 55,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Cinnamon Oat Bites',
      price: 48,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop'
    },
    {
      id: 11,
      name: 'Matcha Cream Dream',
      price: 68,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1587241321921-91a834d82e76?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Keto Coco Crunch',
      price: 52,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop'
    }
  ];

  // Add this array with your other product arrays (after newProducts)
const bundles = [
  {
    id: 13,
    name: 'Starter Pack: 5 picks',
    description: '5 of your favorite treats',
    price: 199,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=300&fit=crop'
  },
  {
    id: 14,
    name: 'Workout Pack: 10 picks',
    description: '10 protein-packed items',
    price: 349,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop'
  },
  {
    id: 15,
    name: 'Monthly Pack: 20 picks',
    description: '20 items, best value',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400&h=300&fit=crop'
  }
];

  const handleAddToCart = (product) => {
    setAddingToCart(product.id);
    addToCart(product, 1);
    
    setTimeout(() => {
      setAddingToCart(null);
    }, 600);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} className="fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={14} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <section className="bg-green-100 py-3 text-center">
        <p className="text-sm font-semibold text-green-900">Free delivery for all orders over <span className="font-bold">200 QAR</span></p>
      </section>
      
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Special Product Deals</h2>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 whitespace-nowrap pb-4">
              {products.map((product) => (
                <div key={product.id} className="inline-block min-w-[220px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                  <img src={product.image} alt={product.title} className="w-full h-44 object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-1">{product.badge}</p>
                    <h3 className="text-lg font-bold">{product.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{product.subtitle}</p>
                    
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                    </div>
                    
                    <p className="mt-2 text-green-600 font-semibold">{product.price} QAR</p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Stock</span>
                        <span>{product.stock}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3 mt-1">
                        <div
                          className={`h-3 rounded-full ${product.stock > 50 ? 'bg-green-500' : product.stock > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${product.stock}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                      className={`w-full mt-3 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                        addingToCart === product.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {addingToCart === product.id ? 'Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  
                  <p className="text-green-600 font-semibold mb-3">{product.price} QAR</p>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id}
                    className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      addingToCart === product.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {addingToCart === product.id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">New Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newProducts.map((product) => (
              <div key={product.id} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  
                  <p className="text-green-600 font-semibold mb-3">{product.price} QAR</p>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id}
                    className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      addingToCart === product.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {addingToCart === product.id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Packs & Monthly Bundles</h2>
        <p className="text-center text-gray-600 mb-6">Get to know packs: choose value and save on your favorite healthy favorites.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-white border-2 border-green-100 rounded-xl shadow-sm hover:shadow-lg hover:border-green-300 transition overflow-hidden">
              <div className="relative">
                <img src={bundle.image} alt={bundle.name} className="w-full h-52 object-cover" />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Best Value
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2">{bundle.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{bundle.description}</p>
                
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(bundle.rating)}
                  <span className="text-xs text-gray-600 ml-1">({bundle.rating})</span>
                </div>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-green-600 font-bold text-2xl">{bundle.price} QAR</p>
                  <p className="text-gray-400 text-sm line-through">{Math.round(bundle.price * 1.3)} QAR</p>
                </div>
                
                <button
                  onClick={() => handleAddToCart(bundle)}
                  disabled={addingToCart === bundle.id}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                    addingToCart === bundle.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {addingToCart === bundle.id ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
      
      <section className="py-8 bg-green-100 text-center rounded-lg mx-4 lg:mx-24">
        <p className="text-xl md:text-2xl font-bold text-green-900">Less calories, more delicious — healthier treats that taste amazing.</p>
      </section>
      
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Premium Desserts, SweetLab
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No hidden sugars. No rounded numbers. Just honest nutrition.
          </p>
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold">
            Shop Now
          </Link>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Leaf className="mx-auto text-green-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">100% Transparent</h3>
              <p className="text-gray-600">Every calorie counted, every nutrient tracked</p>
            </div>
            <div className="text-center">
              <Target className="mx-auto text-blue-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">Macro-Focused</h3>
              <p className="text-gray-600">Designed for your fitness and health goals</p>
            </div>
            <div className="text-center">
              <Zap className="mx-auto text-yellow-600 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2">Fresh & Fast</h3>
              <p className="text-gray-600">Baked daily, delivered to your door</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;