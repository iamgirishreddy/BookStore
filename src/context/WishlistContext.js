import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const WishlistContext = createContext();


export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get('/wishlist');
      setWishlistItems(data.data.wishlist.products || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlistItems([]);
    }
  };


  
  const addToWishlist = async (book) => {
    try {
      const { data } = await API.post('/wishlist/add', {
        productId: book._id || book.id
      });
      setWishlistItems(data.data.wishlist.products);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setWishlistItems(prev => {
        const productId = book._id || book.id;
        if (!prev.find(item => item._id === productId || item.id === productId)) {
          return [...prev, book];
        }
        return prev;
      });
    }
  };
  
  const removeFromWishlist = async (bookId) => {
    try {
      const { data } = await API.delete(`/wishlist/remove/${bookId}`);
      setWishlistItems(data.data.wishlist.products);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setWishlistItems(prev =>
        prev.filter(item => item._id !== bookId && item.id !== bookId)
      );
    }
  };
  
  const isInWishlist = (bookId) =>{
    return wishlistItems.some(
      item => item._id === bookId || item.id === bookId
    );
  };
  
  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
  
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
