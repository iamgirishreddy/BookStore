import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = 'bookstore_wishlist';

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  const addToWishlist = (book) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === book.id);
      if (!exists) {
        return [...prevItems, book];
      }
      return prevItems;
    });
  };
  
  const removeFromWishlist = (bookId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };
  
  const isInWishlist = (bookId) => {
    return wishlistItems.some(item => item.id === bookId);
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
