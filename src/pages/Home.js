import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ addToCart }) {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate(); // Correct usage

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/products')
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((err) => console.error('Failed to load products', err));
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/products'); // Now works correctly
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to E-Food Hub</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {foodItems.map(item => (
          <div key={item.id}>
            <img src={item.image_url} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
  