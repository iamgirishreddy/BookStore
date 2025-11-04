import React, { createContext, useContext, useState } from 'react';

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
