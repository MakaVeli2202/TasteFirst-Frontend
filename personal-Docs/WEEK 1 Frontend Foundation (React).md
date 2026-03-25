# Week 1 (React)

---

## **WEEK 1: Frontend Foundation (React Version)**

**Estimated Time:** 15-20 hours (can be adjusted based on learning pace)

This week, you'll lay the groundwork for your React application by setting up the project, configuring essential tools like Tailwind CSS, and implementing the core UI components and initial pages. You'll also establish basic routing and a global state management solution for the shopping cart.

### **📋 Quick Overview**
Build a professional React application with a complete UI, routing, and initial state management. This involves setting up the development environment, integrating styling, and creating the main navigation and content pages.

### **🎯 Objectives for the Week**
*   **Project Setup:** Finalize the Vite React project setup.
*   **Styling:** Integrate and configure Tailwind CSS for efficient styling.
*   **Core Components:** Create `Header` and `Footer` components.
*   **Routing:** Set up `react-router-dom` for navigation between pages.
*   **State Management:** Implement `CartContext` for global shopping cart state.
*   **Initial Pages:** Develop `HomePage`, `ProductCatalog`, and `Cart` pages.
*   **Dependencies:** Install all necessary frontend libraries.

### **🛠 Technologies**
*   React 18 + Vite
*   Tailwind CSS, PostCSS, Autoprefixer
*   React Router DOM
*   Context API
*   Axios (for API calls, though API implementation will follow in later weeks)
*   Lucide React (for icons)
*   ESLint (for code quality)

---

## **MONDAY (3-4 hours) - Project Setup & Professional Folder Structure**

You've already completed the basic Vite project creation, Git initialization, and `.gitignore` setup in Week 0. This Monday, we focus on refining the project's internal structure and core configurations.


### **STEP 1: Create `.env` Files for Environment Variables**

Environment variables allow you to configure your application differently for development, testing, and production without changing the code itself. Vite requires a `VITE_` prefix for client-side environment variables.

1.  **Create `.env.example` (PUBLIC - commit to GitHub):**
    This file serves as documentation for required environment variables.

    ```bash
    touch .env.example
    ```

    File: `.env.example`
    ````
    VITE_API_URL=http://localhost:5000/api
    # VITE_API_URL = Variable name (VITE_ prefix REQUIRED)
    # Vite only includes variables with VITE_ prefix in builds
    # http://localhost:5000/api = Backend address during development

    VITE_API_TIMEOUT=10000
    # How long to wait for API response (10 seconds = 10,000 milliseconds)

    VITE_APP_NAME=RealCalories
    VITE_APP_VERSION=1.0.0

    VITE_ENABLE_ANALYTICS=false
    # Track user behavior? false = not yet

    VITE_ENABLE_DEBUG_MODE=true
    # Show debug info? true = yes for development
    ````

2.  **Create `.env` (SECRET - ignored by Git):**
    This file holds the actual values for your *local* development environment. It should **NOT** be committed to Git (your `.gitignore` already handles this).

    ```bash
    touch .env
    ```

    File: `.env`
    ````
    VITE_API_URL=http://localhost:5000/api
    VITE_API_TIMEOUT=10000
    VITE_APP_NAME=RealCalories
    VITE_APP_VERSION=1.0.0

    VITE_ENABLE_ANALYTICS=false
    VITE_ENABLE_DEBUG_MODE=true
    ````

### **write to `README.md`**

````markdown
# RealCalories

> Premium nutrition e-commerce platform

## What is This?

RealCalories is a modern web app for buying healthy desserts with transparent nutrition.

- React 18 frontend
- ASP.NET Core backend
- PostgreSQL database

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/RealCalories.git
    cd RealCalories
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` file:**
    Copy `.env.example` to `.env` and fill in necessary environment variables (e.g., API URLs).
4.  **Run development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## Folder Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Top-level page components
├── context/          # React Context providers
├── services/         # API integration logic
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── constants/        # Configuration constants
├── types/            # TypeScript type definitions
├── styles/           # Global styles and Tailwind config
├── assets/           # Static assets (logos, etc.)
└── App.jsx           # Main application component
```
````

---

## **TUESDAY (4-5 hours) - Install Dependencies & Configure Tailwind CSS**

This day focuses on getting all the necessary libraries installed and configuring your styling framework.

### **STEP 1: Install Professional Dependencies**

Install libraries that will be used across the application for routing, API calls, and icons.

```bash
npm install react-router-dom axios lucide-react
```

*   `react-router-dom`: The standard library for client-side routing in React. It enables navigation between different components/pages without full page reloads.
*   `axios`: A popular promise-based HTTP client for making API requests from the browser or Node.js. It's often preferred over the native `fetch` API for its features like interceptors, automatic JSON transformation, and better error handling.
*   `lucide-react`: A library providing a collection of well-designed, customizable SVG icons as React components.

### **STEP 2: Install Development Dependencies (for Tailwind CSS & ESLint)**

These dependencies are only needed during development and won't be included in the production build.

```bash
npm install -D tailwindcss@3 postcss autoprefixer eslint eslint-plugin-react
# -D = Save as a dev dependency
```

*   `tailwindcss@3`: A utility-first CSS framework that provides low-level utility classes to build designs directly in your markup. It allows for highly customizable and responsive styling without writing custom CSS from scratch for most cases.
*   `postcss`: A tool for transforming CSS with JavaScript plugins. Tailwind CSS uses PostCSS to process its directives and generate the final CSS.
*   `autoprefixer`: A PostCSS plugin that adds vendor prefixes to CSS rules. This ensures your styles are compatible across different browsers without manual intervention.
*   `eslint`: A static code analysis tool for identifying problematic patterns found in JavaScript code. It helps enforce coding standards and catch errors early.
*   `eslint-plugin-react`: ESLint rules specific to React projects.

### **STEP 3: Configure Tailwind CSS**

Initialize Tailwind CSS and generate its configuration files.

```bash
npx tailwindcss init -p
```

*   `npx`: Executes an npm package binary without installing it globally.
*   `tailwindcss init`: Creates a `tailwind.config.js` file in your project root.
*   `-p`: Also creates a `postcss.config.js` file, which is necessary for PostCSS and Autoprefixer to work with Tailwind.

### **STEP 4: Configure `tailwind.config.js`**

Open `tailwind.config.js` and configure it to scan your project files for Tailwind classes.

File: `tailwind.config.js`
````javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS, TS, JSX, TSX files in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
````

### **STEP 5: Add Tailwind Directives to `src/index.css`**

Import Tailwind's base styles, components, and utility classes into your main CSS file.

File: `src/index.css`
````css
@tailwind base;
/* @tailwind = Tailwind directive
   base = Reset browser defaults
   Why needed? Different browsers have different default styles
*/

@tailwind components;
/* components = Reusable component classes (advanced)
   Used with @layer to create custom component classes
*/

@tailwind utilities;
/* utilities = All styling classes (main Tailwind feature)
   bg-green-600 = Green background
   text-white = White text
   px-4 = Padding left/right (spacing)
   py-2 = Padding top/bottom
   rounded = Rounded corners
   hover:bg-green-700 = Darker on hover
   md:grid-cols-2 = 2 columns on medium+ screens
   Thousands of utility classes available
*/
````

### **STEP 6: Add Tailwind VS Code Extension Configuration (Optional but Recommended)**

If you get warnings or want better IntelliSense for Tailwind in VS Code:

1.  Press `Ctrl + ,` to open VS Code settings.
2.  Search for `files.associations`.
3.  Click "Edit in settings.json" and add the following:
    ````json
    {
      "files.associations": {
        "*.css": "tailwindcss"
      }
    }
    ````

### **STEP 7: Create `src/utils/logger.js`**

A simple logging utility to help debug and track application flow.

```bash
touch src/utils/logger.js
```

File: `src/utils/logger.js`
````javascript
// src/utils/logger.js
export const logger = {
  info: (...args) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
      console.log('[INFO]', ...args);
    }
  },
  warn: (...args) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
      console.error('[ERROR]', ...args);
    }
  },
  // API specific logging
  api: (method, url, status, time) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
      console.log(`[API] ${method.toUpperCase()} ${url} - Status: ${status} - Time: ${time}ms`);
    }
  },
};
````

---

## **WEDNESDAY (4-5 hours) - Essential Configuration & Core Components**

Today, you'll set up global configurations, an API service base, and start building the main structural components of your application.

### **STEP 1: Create Constants File**

This file will centralize various configuration settings, making them easy to manage and access throughout your application.

```bash
touch src/constants/config.js
```

File: `src/constants/config.js`
````javascript
// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // BASE_URL = Starting URL for all API requests
  // import.meta.env.VITE_API_URL = Get from .env file
  // || 'http://localhost:5000/api' = Fallback if .env not set

  TIMEOUT: import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 10000,
  // TIMEOUT = Wait time before giving up (10 seconds = 10,000 milliseconds)
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'RealCalories',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@realcalories.qa',
};

// Delivery Areas
export const DELIVERY_AREAS = {
  AL_SADD: { label: 'Al Sadd', fee: 5 },
  // label = What users see in dropdown
  // fee = Delivery cost in QAR

  THE_PEARL: { label: 'The Pearl', fee: 7 },
  WEST_BAY: { label: 'West Bay', fee: 8 },
  LUSAIL: { label: 'Lusail', fee: 10 },
  OTHER: { label: 'Other', fee: 10 },
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: { id: 0, label: 'Cash on Delivery', value: 'CASH_ON_DELIVERY' },
  BANK_TRANSFER: { id: 1, label: 'Bank Transfer', value: 'BANK_TRANSFER' },
  CARD: { id: 2, label: 'Credit Card', value: 'CREDIT_CARD' },
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Pattern to validate email addresses
  // "/"        "Start/end of pattern"
  // "^"        "Start of string (must begin here)"
  // "[^\s@]"   "NOT whitespace or @"
  // "+"        "One or more of previous character"
  // "@"        "Literal @ symbol"
  // "\."       "Literal dot (.) - backslash escapes it"
  // "$"        "End of string (must end here)"

  PHONE_REGEX: /^\+?974?\d{8}$/,
  // Qatar phone number pattern (optional +974 prefix, then 8 digits)

  MIN_PASSWORD_LENGTH: 8,
  // Minimum password length
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
````

### **STEP 2: Create Base API Service (`src/services/api.js`)**

This `api.js` file will contain a shared Axios instance configured for your backend, along with interceptors for common tasks like adding authorization headers and handling global errors. Other specific API services will import and use this configured `apiClient`.

```bash
touch src/services/api.js
```

File: `src/services/api.js`
````javascript
// src/services/api.js
import axios from 'axios';
import { logger } from '../utils/logger';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        logger.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // ✅ FIXED: Check if error.response exists before accessing .status
        if (error.response) {
            // Server responded with an error
            const status = error.response.status;
            
            switch (status) {
                case 401:
                    // Unauthorized - token expired or invalid
                    logger.warn('Unauthorized access - redirecting to login');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;
                    
                case 403:
                    // Forbidden - user doesn't have permission
                    logger.error('Access forbidden');
                    break;
                    
                case 404:
                    // Not found
                    logger.error('Resource not found');
                    break;
                    
                case 500:
                    // Server error
                    logger.error('Server error occurred');
                    break;
                    
                default:
                    logger.error(`API error ${status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            // This happens when backend is not running
            logger.error('No response from server - is the backend running?');
            error.message = 'Cannot connect to server. Please make sure the backend is running on http://localhost:5000';
        } else {
            // Something else went wrong
            logger.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
````

### **STEP 3: Create Specific API Service (`src/services/products.js`)**

This file will contain functions specifically for interacting with product-related API endpoints. It uses the `apiClient` defined in `src/services/api.js`.

```bash
touch src/services/products.js
```

File: `src/services/products.js`
````javascript
import apiClient from "../services/api"
import { logger } from "../utils/logger"

export const productsAPI = {
    create: async (productData) => {
        try {
            const response = await apiClient.post("/products", productData);
            logger.info(`Product ${productData.name} has been added successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error creating product: ${error.message}`);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const response = await apiClient.get("/products");
            return response.data;
        } catch (error) {
            logger.error(`Error fetching all products: ${error.message}`);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching product with ID ${id}: ${error.message}`);
            throw error;
        }
    },

    update: async (id, productData) => {
        try {
            const response = await apiClient.put(`/products/${id}`, productData);
            logger.info(`Product ${id} has been updated successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error updating product ${id}: ${error.message}`);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await apiClient.delete(`/products/${id}`);
            logger.info(`Product ${id} has been deleted successfully`);
            return response.data;
        } catch (error) {
            logger.error(`Error deleting product ${id}: ${error.message}`);
            throw error;
        }
    }
}
````

### **STEP 4: Create Specific API Service (`src/services/auth.js`)**

This file will contain functions specifically for user authentication and profile management. It also uses the shared `apiClient`.

```bash
touch src/services/auth.js
```

File: `src/services/auth.js`
````javascript
// src/services/auth.js
import apiClient from "./api"
import { logger } from "../utils/logger"

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      logger.info("Registration successful");
      return response.data;
    } catch (error) {
      logger.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password }); // FIXED: Added await
      logger.info("Login successful");
      return response.data; // FIXED: Return response.data
    } catch (error) {
      logger.error("Login failed:", error.response?.data?.message || error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      logger.info("Logout successful");
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      logger.error('Logout failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      logger.error('Failed to get current user:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      logger.info("Profile updated successfully");
      return response.data;
    } catch (error) {
      logger.error('Failed to update profile:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await apiClient.post('/auth/change-password', { oldPassword, newPassword });
      logger.info("Password changed successfully");
      return response.data;
    } catch (error) {
      logger.error('Failed to change password:', error.response?.data?.message || error.message);
      throw error;
    }
  }
}
````

### **STEP 5: Create `Header` Component**

The `Header` component will contain your navigation links and branding, appearing on every page.


File: `src/components/Header.jsx`
````javascript
// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
// Import icons from Lucide React

function Header() {
  // Header = Functional component (displays at top of every page)

  return (
    <header className="bg-white shadow-md">
      {/* <header> = Top section of the page
          bg-white = White background
          shadow-md = Medium shadow (makes it float)
      */}

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* container = Max width for content
            mx-auto = Centers the container horizontally
            px-4 = Padding left and right
            py-4 = Padding top and bottom
            flex = Use flexbox layout
            justify-between = Puts space between logo and nav
            items-center = Vertically centers items
        */}

        <Link to="/" className="text-3xl font-bold text-green-600">
          {/* <Link> = React Router component for navigation (prevents full page reload)
              to="/" = Navigates to the home page
              text-3xl = Large text size
              font-bold = Bold font weight
              text-green-600 = Green text color
          */}
          RealCalories
        </Link>

        <nav className="flex items-center space-x-6">
          {/* <nav> = Navigation section
              flex = Use flexbox
              items-center = Vertically centers nav items
              space-x-6 = Adds horizontal space between children
          */}

          <Link to="/products" className="text-gray-700 hover:text-green-600 transition">
            Products
          </Link>

          <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition">
            <ShoppingCart size={24} />
            {/* ShoppingCart = Lucide React icon component, size 24px */}
            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0  {/* Placeholder for cart item count */}
            {/* </span> */}
          </Link>

          <Link to="/login" className="text-gray-700 hover:text-green-600 transition">
            <User size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
````

### **STEP 6: Create `Footer` Component**

The `Footer` component will display copyright information, contact details, and other static links, appearing at the bottom of every page.

```bash
touch src/components/Footer.jsx
```

File: `src/components/Footer.jsx`
````javascript
// src/components/Footer.jsx
import React from 'react';
import { Mail, Phone } from 'lucide-react';
// Import Mail and Phone icons

function Footer() {
  // Footer = Functional component (displays at bottom of every page)

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* <footer> = Bottom section
          bg-gray-900 = Dark gray/black background
          text-white = White text
          mt-16 = Large margin top (spacing from content)
      */}

      <div className="container mx-auto px-4 py-12">
        {/* container = Max width
            mx-auto = Center
            px-4 = Horizontal padding
            py-12 = Vertical padding (lots of space)
        */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* grid = Grid layout
              grid-cols-1 = 1 column on mobile (small screens)
              md:grid-cols-3 = 3 columns on medium+ screens (tablets/desktops)
              gap-8 = Large space between columns
          */}

          <div>
            <h3 className="text-xl font-bold mb-4">RealCalories</h3>
            {/* text-xl = Extra large text
                font-bold = Bold
                mb-4 = Margin bottom (spacing)
            */}

            <p className="text-gray-300">
              {/* text-gray-300 = Light gray text */}
              Premium desserts with transparent nutrition
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            {/* text-lg = Large text */}

            <div className="flex gap-2 items-center mb-2">
              {/* flex = Flexbox
                  gap-2 = Space between icon and text
                  items-center = Vertically center
                  mb-2 = Margin bottom
              */}

              <Mail size={18} />
              {/* Mail icon */}

              <a href="mailto:info@realcalories.qa" className="hover:text-green-400">
                {/* href="mailto:" = Click to open email client */}
                info@realcalories.qa
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <Phone size={18} />
              {/* Phone icon */}

              <a href="tel:+97444123456" className="hover:text-green-400">
                {/* href="tel:" = Click to call (on mobile) */}
                +974 4412 3456
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Hours</h4>
            <p className="text-gray-300">Mon-Thu: 10am - 10pm</p>
            <p className="text-gray-300">Fri-Sat: 12pm - 11pm</p>
            <p className="text-gray-300">Sun: Closed</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          {/* border-t = Top border
              border-gray-700 = Dark gray border
              mt-8 = Margin top (large space)
              pt-8 = Padding top
              text-center = Center text
          */}

          <p>&copy; 2025 RealCalories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
````

---

## **THURSDAY (4-5 hours) - Global State (Cart) & Routing**

Today is about implementing a global state management solution for your shopping cart using React's Context API and setting up the main routing for your application.

### **STEP 1: Create Cart Context (`src/context/CartContext.jsx`)**

The `CartContext` will manage the state of your shopping cart, allowing any component in your application to add, remove, or update items in the cart without prop drilling.

```bash
touch src/context/CartContext.jsx
```

File: `src/context/CartContext.jsx`
````javascript
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
````

### **STEP 2: Create Auth Context (`src/context/AuthContext.jsx`)**

The `AuthContext` will manage user authentication state, including login, logout, and checking if a user is authenticated or an admin. This will initially be a placeholder and get integrated with `authAPI` in Week 3.


File: `src/context/AuthContext.jsx`
````javascript
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/auth'; // Import authAPI from its specific file
import { logger } from '../utils/logger';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const userData = await authAPI.getCurrentUser(); // Use authAPI here
          setUser(userData);
          logger.info('User authenticated', userData);
        }
      } catch (err) {
        logger.error('Auth check failed', err);
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const register = async (firstName, lastName, email, password, phone) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(firstName, lastName, email, password, phone); // Use authAPI
      logger.info('User registered successfully');
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      logger.error('Registration error', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(email, password); // Use authAPI
      localStorage.setItem('authToken', response.token);
      setToken(response.token);
      setUser({
        id: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
      });
      logger.info('User logged in', response.email);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      logger.error('Login error', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setError(null);
    logger.info('User logged out');
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const isAdmin = () => {
    return user?.role === 'Admin';
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
````

### **STEP 3: Create `ErrorBoundary` Component**

An `ErrorBoundary` prevents the entire application from crashing if a component encounters an error. Instead, it displays a fallback UI.

```bash
touch src/components/ErrorBoundary.jsx
```

File: `src/components/ErrorBoundary.jsx`
````javascript
// src/components/ErrorBoundary.jsx
import React from 'react';
import { logger } from '../utils/logger';

// Error Boundary = React component that catches errors in child components
// If one component crashes, others still work
// Users see error message instead of blank white screen

class ErrorBoundary extends React.Component {
  // class component = Old React style (required for error boundaries)
  // Only class components can catch errors

  constructor(props) {
    // constructor = Initialization method
    // Runs when component is created
    super(props);
    // Call parent class constructor

    this.state = { hasError: false, error: null };
    // this.state = Component data that changes
    // hasError = Did an error happen? (boolean)
    // error = The actual error object
  }

  static getDerivedStateFromError(error) {
    // getDerivedStateFromError = React lifecycle method
    // Runs when error is thrown in child component
    // Purpose: Update state to reflect error occurred
    return { hasError: true, error };
    // Return new state: error happened
  }

  componentDidCatch(error, errorInfo) {
    // componentDidCatch = Runs after error caught
    // Good place to log error or send to error tracking service (Sentry, LogRocket)
    logger.error('Component error caught', {
      error: error.toString(),
      // error.toString() = Convert error object to string message
      componentStack: errorInfo.componentStack,
      // componentStack = Stack trace showing which component failed
    });
  }

  render() {
    // render() = What to display
    if (this.state.hasError) {
      // If error happened, show error screen instead of crashing app
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
          {/* min-h-screen = Full screen height
              bg-red-50 = Light red background (Tailwind class)
              flex = Use flexbox layout
              items-center = Vertically center content
              justify-center = Horizontally center content
              px-4 = Padding left and right
          */}
          <div className="max-w-md w-full">
            {/* max-w-md = Maximum width (medium size)
                w-full = Full width of container
            */}
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              {/* text-6xl = 6 times larger text
                  mb-4 = Margin bottom (spacing)
              */}

              <h1 className="text-2xl font-bold text-red-900 mb-2">
                Something went wrong
              </h1>
              {/* text-2xl = Large text
                  font-bold = Bold weight
                  text-red-900 = Dark red color
              */}

              <p className="text-red-700 mb-6">
                We're sorry for the inconvenience. The error has been reported.
              </p>

              {import.meta.env.DEV && (
                // Only show error details in development mode
                <details className="mb-6 text-left bg-red-100 p-4 rounded">
                  {/* <details> = Collapsible element
                      Can click to expand/collapse
                  */}
                  <summary className="cursor-pointer font-semibold">
                    {/* <summary> = Click text to expand/collapse */}
                    Error Details
                  </summary>

                  <pre className="mt-2 text-xs overflow-auto max-h-40">
                    {/* <pre> = Preserve formatting (monospace font)
                        mt-2 = Margin top
                        text-xs = Tiny text
                        overflow-auto = Scrollbar if too long
                    */}
                    {this.state.error?.toString()}
                    {/* Show error message
                        ?. = Optional chaining (if error exists, call toString)
                    */}
                  </pre>
                </details>
              )}

              <button
                onClick={() => (window.location.href = '/')}
                // onClick = Click event handler
                // window.location.href = '/' reload page to home
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                {/* w-full = Full width button
                    bg-red-600 = Red background
                    text-white = White text
                    py-2 = Padding top/bottom
                    rounded = Rounded corners
                    hover:bg-red-700 = Darker red on hover
                */}

                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    // If no error, show normal content
    return this.props.children;
    // this.props.children = Components wrapped inside <ErrorBoundary>
  }
}

export default ErrorBoundary;
````

### **STEP 4: Create `NotFound` Page (`src/pages/NotFound.jsx`)**

A simple page to display when a user navigates to an undefined route.



File: `src/pages/NotFound.jsx`
````javascript
// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-3xl text-gray-600 mb-4">Page Not Found</p>
      <p className="text-lg text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
````

### **STEP 5: Create `LoginPage` (`src/pages/LoginPage.jsx`)**

A basic login page structure. The actual login logic will connect to `AuthContext` and `authAPI` (already set up placeholders) in Week 3.

```bash
touch src/pages/LoginPage.jsx
```

File: `src/pages/LoginPage.jsx`
````javascript
// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error: contextError } = useAuth(); // Assuming useAuth from AuthContext

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">🍰 RealCalories</h1>
            <p className="text-gray-600">Welcome back</p>
          </div>

          {(error || contextError) && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-0.5" size={20} />
              <p className="text-red-700">{error || contextError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
````

### **STEP 6: Create `RegisterPage` (`src/pages/RegisterPage.jsx`)**

A basic registration page structure. The actual registration logic will connect to `AuthContext` and `authAPI` (already set up placeholders) in Week 3.

```bash
touch src/pages/RegisterPage.jsx
```

File: `src/pages/RegisterPage.jsx`
````javascript
// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { VALIDATION } from '../constants/config'; // Import VALIDATION

function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth(); // Assuming useAuth from AuthContext

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!VALIDATION.PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Valid Qatar phone number is required (e.g., +97450123456)';
    }

    if (formData.password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
      formData.phone
    );

    if (result.success) {
      navigate('/login', {
        state: { message: 'Registration successful! Please log in.' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">🍰 RealCalories</h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+974XXXXXXXX"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="rounded"
              />
              <label className="text-gray-700">
                I agree to Terms and Conditions
              </label>
            </div>
            {errors.agreeTerms && <p className="text-red-600 text-sm">{errors.agreeTerms}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 transition"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
````

### **STEP 7: Create `App.jsx` with Routing**

This is the main component where you'll set up your React Router, `CartProvider`, `AuthProvider`, and `ErrorBoundary` to wrap your entire application, making these contexts and routing available globally.

```bash
# Locate your App.jsx file, which should be in src/App.jsx
# If you used the Vite template, it's likely already there, just update its content
# cp src/App.jsx src/App.original.jsx # Optional: backup original
# touch src/App.jsx # Or just edit existing
```

File: `src/App.jsx`
````javascript
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// BrowserRouter = Router component (enables routing/URL changes)
// Routes = Container for Route components
// Route = Individual route/page

import { CartProvider } from './context/CartContext';
// CartProvider = Provides global cart state

import { AuthProvider } from './context/AuthContext';
// AuthProvider = Provides global auth state

import ErrorBoundary from './components/ErrorBoundary';
// ErrorBoundary = Catches component errors

import Header from './components/Header';
// Header = Top navigation

import Footer from './components/Footer';
// Footer = Bottom section

import HomePage from './pages/HomePage';
// HomePage = Home page component

// We'll create these components in next steps
import ProductCatalog from './pages/ProductCatalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';

function App() {
  // App = Main component (root of app)

  return (
    <ErrorBoundary>
      {/* ErrorBoundary = Catches errors anywhere in app */}

      <AuthProvider>
        {/* AuthProvider = Provides auth context to all children */}

        <CartProvider>
          {/* CartProvider = Provides cart context to all children */}

          <Router>
            {/* Router = Enable routing (URL changes) */}

            <Header />
            {/* Show header on every page */}

            <main className="min-h-screen bg-white">
              {/* main = Main content area
                  min-h-screen = At least full screen height
                  bg-white = White background
              */}

              <Routes>
                {/* Routes = Container for all routes */}

                <Route path="/" element={<HomePage />} />
                {/* / = Home page URL
                    element = What component to show
                */}

                <Route path="/products" element={<ProductCatalog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                {/* :orderNumber = Dynamic parameter (URL variable) */}

                <Route path="/login" element={<LoginPage />} />
                {/* /login = Login page route */}

                <Route path="/register" element={<RegisterPage />} />
                {/* /register = Registration page route */}

                <Route path="*" element={<NotFound />} />
                {/* * = Catch-all (any URL not matched) = 404 page */}
              </Routes>
            </main>

            <Footer />
            {/* Show footer on every page */}
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
````

---

## **FRIDAY (3-4 hours) - Initial Pages & Verification**

Today you'll build the initial content pages and verify that your routing and context work correctly.

### **STEP 1: Create `HomePage` (`src/pages/HomePage.jsx`)**

The `HomePage` will be the landing page of your application, showcasing featured products and general information.



File: `src/pages/HomePage.jsx`
````javascript
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
````

### **STEP 2: Create `ProductCatalog` Page (`src/pages/ProductCatalog.jsx`)**

This page will display a list of products. Initially, it will fetch dummy data, and later it will integrate with the backend API.

```bash
touch src/pages/ProductCatalog.jsx
```

File: `src/pages/ProductCatalog.jsx`
````javascript
// src/pages/ProductCatalog.jsx
import React, { useState, useEffect } from 'react';
// useState = State hook (for component data)
// useEffect = Effect hook (for side effects like API calls)

import { Link } from 'react-router-dom'; // Import Link for navigation
import { useCart } from '../context/CartContext';
import { productsAPI } from '../services/products'; // Use specific productsAPI
import { logger } from '../utils/logger';
import { ShoppingCart, AlertCircle } from 'lucide-react';

function ProductCatalog() {
  // ProductCatalog = Shows all products in grid

  const { addToCart } = useCart();
  // Get addToCart function from cart context

  const [products, setProducts] = useState([]);
  // products = Array of products from backend
  // setProducts = Function to update products

  const [loading, setLoading] = useState(true);
  // loading = Is data loading? (true while fetching)

  const [error, setError] = useState(null);
  // error = Error message if any

  useEffect(() => {
    // useEffect = Run code on component mount or when dependencies change
    // Runs once when component first loads (because [] dependency array)

    const fetchProducts = async () => {
      // async = This function uses await (async/await syntax)

      try {
        // try = Try to execute code

        setLoading(true);
        // Show loading state

        setError(null);
        // Clear previous errors

        logger.info('Fetching products from API');
        // Log for debugging

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
        // catch = If error happens

        const errorMessage = err.message || 'Failed to load products';
        setError(errorMessage);
        // Set error state

        logger.error('Error fetching products', err);
        // Log error
        setLoading(false); // Also set loading to false on error
      }
    };

    fetchProducts();
    // Call the function

  }, []);
  // [] = Dependencies (empty = run only once on mount)

  if (loading) {
    // If loading, show spinner

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin text-4xl">⏳</div>
          {/* animate-spin = CSS animation that spins */}

          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    // If error, show error message

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-4">
          {/* Error box styling */}

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
        {/* grid-cols-1 = 1 column on mobile
            md:grid-cols-2 = 2 columns on tablet
            lg:grid-cols-3 = 3 columns on desktop
            gap-8 = Space between items
        */}

        {products.map(product => (
          // map() = Loop through products array
          // Creates a div for each product

          <div
            key={product.id}
            {/* key = React needs unique key for list items (for tracking) */}

            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition transform hover:scale-105"
            {/* Card styling and hover effects */}
          >
            <Link to={`/products/${product.id}`}> {/* Link to product detail page */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
                {/* w-full = Full width
                    h-48 = 48 units height
                    object-cover = Fill container (crop if needed)
                */}

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
                {/* onClick = Click event handler
                    addToCart(product, 1) = Add this product, quantity 1
                */}

                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
                {/* Button styling with hover effect */}
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
````

### **STEP 3: Create `Cart` Page (`src/pages/Cart.jsx`)**

This page will display the items currently in the shopping cart, allow quantity adjustments, and provide a link to the checkout page.

```bash
touch src/pages/Cart.jsx
```

File: `src/pages/Cart.jsx`
````javascript
// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

function Cart() {
  // Cart = Shows items in shopping cart

  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  // Get cart functions and data from context

  if (cartItems.length === 0) {
    // If no items, show empty state

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
        {/* 1 column on mobile, 3 columns on desktop
            Left 2 columns: cart items
            Right 1 column: order summary
        */}

        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* lg:col-span-2 = Take up 2 of 3 columns on large screens */}

          {cartItems.map(item => (
            // Loop through cart items

            <div key={item.id} className="bg-white border rounded-lg p-6 mb-4 flex justify-between items-center">
              {/* Each item is a row with product info and controls */}

              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600">QAR {item.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Quantity controls */}

                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  {/* Minus button - decrease quantity */}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Minus size={20} />
                </button>

                <span className="text-xl font-bold">{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  {/* Plus button - increase quantity */}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">QAR {(item.price * item.quantity).toFixed(2)}</p>
                {/* Show subtotal for this item */}

                <button
                  onClick={() => removeFromCart(item.id)}
                  {/* Delete button */}
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
          {/* h-fit = Height fit to content
              sticky top-4 = Stick to top when scrolling
          */}

          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-2 mb-6 border-b pb-4">
            {/* space-y-2 = Vertical space between items */}

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
````

### **STEP 4: Create `Checkout` Page (`src/pages/Checkout.jsx`)**

This page will provide a form for users to enter delivery details and select a payment method. It currently uses mock API calls.

```bash
touch src/pages/Checkout.jsx
```

File: `src/pages/Checkout.jsx`
````javascript
// src/pages/Checkout.jsx
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
                {/* Border color changes if error */}
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
              {/* disabled = Button is disabled while loading
                  disabled:opacity-50 = Gray out button when disabled
              */}
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
````

### **STEP 4: Create `OrderConfirmation` Page (`src/pages/OrderConfirmation.jsx`)**

This page will display details about a newly placed order after a successful checkout.

```bash
touch src/pages/OrderConfirmation.jsx
```

File: `src/pages/OrderConfirmation.jsx`
````javascript
// src/pages/OrderConfirmation.jsx
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
````

---

## **Verification and Testing**

1.  **Start your development server:**
    ```bash
    npm run dev
    ```
2.  **Open your browser:** Navigate to `http://localhost:5173`.
3.  **Check `HomePage`:** You should see the hero section, product deals, and other content.
4.  **Navigate to `/products`:**
    *   Click "Products" in the header or directly type `http://localhost:5173/products`.
    *   You should see the mock products displayed in a grid.
    *   Click "Add to Cart" on a few products.
5.  **Navigate to `/cart`:**
    *   Click the cart icon in the header or `http://localhost:5173/cart`.
    *   You should see the items you added, be able to adjust quantities, and remove items.
    *   The total should update.
6.  **Navigate to `/checkout`:**
    *   From the cart page, click "Proceed to Checkout" or go to `http://localhost:5173/checkout`.
    *   Fill out the form and click "Place Order".
    *   You should be redirected to the `/order-confirmation/:orderNumber` page.
7.  **Navigate to `/login` and `/register`:**
    *   Check these pages directly from the header or by URL. They should render correctly.
8.  **Test 404 page:** Try `http://localhost:5173/non-existent-page`. You should see the `NotFound` page.
9.  **Check Console:** Open your browser's developer console (`F12`) and look for any errors or warnings. The `logger` outputs (`[INFO]`, `[WARN]`, `[ERROR]`) should also be visible.

---

## **COMMIT YOUR WORK**

Once you've completed this week's tasks and verified everything, commit your changes:

```bash
git add .
git commit -m "feat: WEEK 1 - Frontend Foundation (React)

## Frontend Features Implemented:
- Professional folder structure for scalability.
- Environment variable setup (.env, .env.example).
- Tailwind CSS configured for utility-first styling.
- Core layout components (Header, Footer).
- Global state management for shopping cart using CartContext.
- Global authentication context using AuthContext (with placeholder logic for now).
- React Router DOM setup for navigation.
- Initial pages: HomePage, ProductCatalog (with mock data), Cart, Checkout (mocked order placement), OrderConfirmation, LoginPage, RegisterPage, NotFound.
- ErrorBoundary component to gracefully handle UI errors.
- Basic API service structure (api.js, products.js, auth.js).

## Key Dependencies Added:
- react-router-dom
- axios
- lucide-react
- tailwindcss, postcss, autoprefixer
- eslint, eslint-plugin-react

## Next Steps:
- Week 2 will focus on the Backend API (ASP.NET Core)."

git push origin main
```

---

This completes Week 1 for the React version. Let me know when you're ready, and I can provide the **Week 1 for the Angular 21 version** (which would essentially be the equivalent setup steps in Angular) or move on to **Week 2: Backend API** for the React roadmap.
