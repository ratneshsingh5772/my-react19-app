# 🚀 Modern React 19 Application

A comprehensive React application demonstrating advanced concepts, modern patterns,
and best practices for technical interviews.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [React Concepts Covered](#-react-concepts-covered)
- [State Management](#-state-management)
- [Routing System](#-routing-system)
- [API Integration](#-api-integration)
- [Styling & UI](#-styling--ui)
- [Performance Optimizations](#-performance-optimizations)
- [Code Organization](#-code-organization)
- [Interview Questions](#-interview-questions--concepts)

## 🛠 Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **ESLint + Prettier** - Code quality and formatting

## ✨ Key Features

- 🔐 **Authentication System** with Context API
- 🎨 **Theme Switching** (Light/Dark mode)
- 📱 **Responsive Design** with mobile-first approach
- 🔄 **Real-time Data Fetching** with loading states
- 📝 **Form Handling** with validation
- 🛒 **Cart Functionality** with state management
- 🎯 **Modern UI Components** with animations

## 🎯 React Concepts Covered

### Core React Hooks

#### `useState` - State Management

```jsx
// Basic state management
const [count, setCount] = useState(0);

// Object state
const [user, setUser] = useState({ name: '', email: '' });

// Array state for cart functionality
const [cart, setCart] = useState([]);

// Complex state with multiple properties
const [formData, setFormData] = useState({
  title: '',
  content: '',
  isSubmitting: false
});
```

#### `useEffect` - Side Effects

```jsx
// Component mounting & API calls
useEffect(() => {
  fetchUsers(); // Initial data loading
}, []); // Empty dependency array = runs once on mount

// Dependency-based effects
useEffect(() => {
  if (user) {
    console.log('User changed:', user);
  }
}, [user]); // Runs when user changes

// Cleanup functions
useEffect(() => {
  const timer = setTimeout(() => {
    setMessage('Data loaded!');
  }, 2000);

  return () => clearTimeout(timer); // Cleanup on unmount
}, []);

// Real-time updates
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

#### `useContext` - Context API

```jsx
// Creating context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Consuming context
const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
};
```

### Advanced Patterns

#### Custom Hooks

```jsx
// Custom hook for API calls
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage
const UserList = () => {
  const { data: users, loading, error } = useApi('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

#### Conditional Rendering

```jsx
// Multiple conditions
const UserStatus = ({ user, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;

  return user ? (
    <div>Welcome, {user.name}!</div>
  ) : (
    <div>Please log in</div>
  );
};

// Ternary operator
const Button = ({ isPrimary }) => (
  <button className={isPrimary ? 'btn-primary' : 'btn-secondary'}>
    Click me
  </button>
);

// Logical AND (&&)
const Notification = ({ show, message }) => (
  show && <div className="notification">{message}</div>
);
```

#### List Rendering & Keys

```jsx
// Array mapping with unique keys
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {todo.text}
      </li>
    ))}
  </ul>
);

// Dynamic list with conditional rendering
const ProductList = ({ products, searchTerm }) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};
```

## 🏗 State Management

### Local State vs Global State

#### Local State (useState)

- Component-specific data
- Form inputs, UI states
- Temporary data

#### Global State (Context API)

- User authentication
- Theme preferences
- App-wide settings

### Context API Pattern

```jsx
// Context creation
const AppContext = createContext();

// Provider with multiple states
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const contextValue = useMemo(() => ({
    user,
    theme,
    cart,
    login,
    logout,
    toggleTheme,
    setCart
  }), [user, theme, cart]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
```

## 🛣 Routing System

### React Router DOM Setup

```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Dynamic Routing & Parameters

```jsx
// Route with parameters
<Route path="/users/:userId" element={<UserDetail />} />

// Component using parameters
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
};
```

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(credentials);
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
    </form>
  );
};
```

## 🔌 API Integration

### Axios Setup & Usage

```jsx
// API service
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

// GET request with loading states
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

// POST request
const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};
```

### Error Handling Patterns

```jsx
const DataComponent = () => {
  const { data, loading, error } = useApi('/api/data');

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Render data */}
    </div>
  );
};
```

## 🎨 Styling & UI

### Tailwind CSS Patterns

```jsx
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Conditional styling
<button className={`px-4 py-2 rounded ${
  isPrimary ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
}`}>

// Dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// Hover and focus states
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700
         focus:outline-none focus:ring-2 focus:ring-blue-500">
```

### Component Composition

```jsx
// Base component
const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage
<Button variant="primary" onClick={handleClick}>
  Save Changes
</Button>
```

## ⚡ Performance Optimizations

### React.memo for Component Memoization

```jsx
const UserCard = React.memo(({ user, onSelect }) => (
  <div onClick={() => onSelect(user)}>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
));
```

### useMemo for Expensive Calculations

```jsx
const filteredUsers = useMemo(() => {
  return users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [users, searchTerm]);
```

### useCallback for Function Stability

```jsx
const handleUserSelect = useCallback((user) => {
  setSelectedUser(user);
}, []); // Empty deps = stable reference
```

## 📁 Code Organization

```bash
src/
├── components/           # Reusable UI components
│   ├── Navbar/
│   ├── Footer/
│   └── program/         # Feature-specific components
├── pages/               # Route components
├── components/
│   └── program/         # Business logic components
│       ├── AuthContextInstance.jsx
│       ├── AuthContextProvider.jsx
│       └── AuthContext.jsx
├── hooks/               # Custom hooks (if any)
└── utils/               # Helper functions
```

## 🎯 Interview Questions & Concepts

### React Fundamentals

1. **What is JSX?** - JavaScript XML, syntax extension for React
2. **Virtual DOM** - Lightweight representation of actual DOM
3. **Reconciliation** - Process of updating DOM efficiently
4. **Keys in lists** - Unique identifiers for efficient re-rendering

### Hooks Deep Dive

1. **useState vs useReducer** - Simple vs complex state logic
2. **useEffect dependencies** - When and how to include dependencies
3. **Custom hooks** - Reusable logic extraction
4. **Rules of hooks** - Only call at top level, only in React functions

### State Management

1. **Prop drilling** - Passing props through multiple levels
2. **Context API vs Redux** - When to use each
3. **Provider pattern** - Global state management
4. **State lifting** - Moving state up to common ancestor

### Performance

1. **Memoization** - React.memo, useMemo, useCallback
2. **Code splitting** - Lazy loading components
3. **Bundle optimization** - Tree shaking, dynamic imports
4. **Profiling** - React DevTools Profiler

### Routing

1. **Client-side vs Server-side routing**
2. **Protected routes** - Authentication guards
3. **Nested routes** - Parent-child route relationships
4. **History API** - Browser history manipulation

### Best Practices

1. **Component composition** - Building complex UIs
2. **Error boundaries** - Graceful error handling
3. **Accessibility** - ARIA attributes, semantic HTML
4. **Testing** - Unit tests, integration tests

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Learning Resources

- [React Official Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [JavaScript Info](https://javascript.info)

---

Built with ❤️ using React 19, Vite, and modern web technologies
