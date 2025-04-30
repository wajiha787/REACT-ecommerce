// src/pages/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const foodItems = [
  {
    id: 1,
    name: 'Pizza',
    price: 8.99,
    image: '/images/pizza.jpg',
  },
  {
    id: 2,
    name: 'Burger',
    price: 5.99,
    image: '/images/burger.jpg',
  },
  {
    id: 3,
    name: 'Pasta',
    price: 7.49,
    image: '/images/pasta.jpg',
  },
];

function Home({ addToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/products');
  };
  
  

  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, rgb(227,151,151), rgb(171,243,243))',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', color: '#333', marginBottom: '0.5rem' }}>
        Welcome to E-Food Hub 
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
        Your perfect partner for quality food
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        {foodItems.map((item) => (
          <div key={item.id} style={{
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '250px',
            padding: '10px',
            textAlign: 'center',
          }}>
            <img 
              src={item.image} 
              alt={item.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
            />
            <h3 style={{ margin: '10px 0' }}>{item.name}</h3>
            <p style={{ color: '#888' }}>${item.price.toFixed(2)}</p>
            
            <button 
              onClick={() => handleAddToCart(item)}
              style={{
                backgroundColor: '#ff6b6b',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
