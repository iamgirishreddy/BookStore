import React, { useState, useContext, createContext } from 'react';

const AddressContext = createContext();

export function useAddress() {
  return useContext(AddressContext);
}

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Home', address: '123 MG Road, Bangalore', isDefault: true },
    { id: 2, name: 'Office', address: '456 Tech Park, Whitefield', isDefault: false }
  ]);
  return (
    <AddressContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </AddressContext.Provider>
  );
}