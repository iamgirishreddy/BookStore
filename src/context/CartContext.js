import React, { createContext, useContext, cartItems, useEffect } from 'react';
import API from '../api/axios';

const CartContext = createContext();


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = cartItems(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/cart');
      setCartItems(data.data.cart.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };


  
  const addToCart = async (book) => {
    try {
      const { data } = await API.post('/cart/add', {
        productId: book._id || book.id,
        quantity: 1
      });
      setCartItems(data.data.cart.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
  
      setCartItems(prev => {
        const existing = prev.find(item => item.product._id === (book._id || book.id));
        if (existing) {
          return prev.map(item =>
            item.product._id === (book._id || book.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product: book, quantity: 1 }];
      });
    }
  };

  
  const removeFromCart = async (productId) => {
    try {
      const { data } = await API.delete(`/cart/remove/${productId}`);
      setCartItems(data.data.cart.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
      setCartItems(prev => prev.filter(item => item.product._id !== productId));
    }
  };
  
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const { data } = await API.put('/cart/update', {
        productId,
        quantity: newQuantity
      });
      setCartItems(data.data.cart.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
      setCartItems(prev =>
        prev.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };
  
  const getTotalPrice = () => {
   return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const clearCart = async () => {
    try {
      await API.delete('/cart/clear');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setCartItems([]);
    }
  };
  
  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart, 
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
