import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos nuestro "Contexto" o memoria global para el carrito
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Inicializamos el carrito, leyendo de LocalStorage por si el usuario recarga la página
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('celulares-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cada vez que 'cart' cambie, lo guardamos en LocalStorage automáticamente
  useEffect(() => {
    localStorage.setItem('celulares-cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un celular al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si ya está, le sumamos 1
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Si no está, lo añadimos con cantidad 1
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Función para remover completamente del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para cambiar cantidad específica (más o menos)
  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return; // evitar cantidades negativas o cero
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  // Calcular el total en dinero
  const cartTotal = cart.reduce((total, item) => total + item.priceCOP * item.qty, 0);
  
  // Calcular el total de elementos (la suma de cantidades)
  const cartItemCount = cart.reduce((count, item) => count + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
