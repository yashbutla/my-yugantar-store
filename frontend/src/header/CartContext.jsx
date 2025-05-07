import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext to share cart data and functions across components
export const CartContext = createContext();

// CartProvider component that wraps the application to provide the cart context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage or default to an empty array
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (cartItem) => {
    const exists = cartItems.find(item => item.productId === cartItem.productId);
    if (exists) {
      // If product already exists in the cart, update its quantity
      updateQuantity(cartItem.productId, exists.quantity + cartItem.quantity);
    } else {
      // If product does not exist in the cart, add a new entry
      setCartItems([...cartItems, cartItem]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  // Update quantity of a product
  const updateQuantity = (productId, quantity) => {
    setCartItems(prev => 
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
