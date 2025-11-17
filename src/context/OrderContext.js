import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';


const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

    useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  

  const addOrder = async (orderData) => {
    try {
      const { data } = await API.post('/orders', orderData);
      setOrders(prev => [data.data.order, ...prev]);
      return data.data.order;
    } catch (error) {
      console.error('Error creating order:', error);

      const localOrder = {
        ...orderData,
        _id: Date.now().toString(),
        status: 'Shipped'
      };

      setOrders(prev => [localOrder, ...prev]);
      return localOrder;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
