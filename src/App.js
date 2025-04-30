import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import PastOrders from './pages/PastOrders';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const checkout = () => {
    alert('Thank you for your purchase!');
    setCartItems([]);
  };
  

  return (
    <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/past-orders">Order History</Link>

      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
  path="/products"
  element={
    <Products
      cartItems={cartItems}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      checkout={checkout}
    />
  }
/>
<Route path="/past-orders" element={<PastOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
