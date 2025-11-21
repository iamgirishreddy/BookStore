import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {useOrder} from '../../context/OrderContext';

const UserProfile = () => {
  const [user] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com", 
    phone: "+91 9876543210",
    joinDate: "January 2024"
  });
  
  const [addresses , setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 MG Road, Bangalore, Karnataka 560001",
      isDefault: true
    },
    {
      id: 2,
      name: "Office", 
      address: "456 Tech Park, Whitefield, Bangalore 560066",
      isDefault: false
    }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);
const [newAddress, setNewAddress] = useState({ name: '', address: '', isDefault: false });

  
  
  
  const {orders} = useOrder();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

   const getOrderNumber = (id) => {
    return `#${id.slice(-8).toUpperCase()}`;
  };

    const handleAddAddress = () => {
  if (newAddress.name && newAddress.address) {
    const newAddr = {
      id: Date.now(),
      ...newAddress
    };
    setAddresses([...addresses, newAddr]);
    setNewAddress({ name: '', address: '', isDefault: false });
    setShowAddressModal(false);
  }
};

const handleEditAddress = (addr) => {
  setEditingAddress(addr);
  setNewAddress(addr);
  setShowAddressModal(true);
};

const handleUpdateAddress = () => {
  setAddresses(addresses.map(addr => 
    addr.id === editingAddress.id ? { ...editingAddress, ...newAddress } : addr
  ));
  setEditingAddress(null);
  setNewAddress({ name: '', address: '', isDefault: false });
  setShowAddressModal(false);
};

const handleDeleteAddress = (id) => {
  if (window.confirm('Are you sure you want to delete this address?')) {
    setAddresses(addresses.filter(addr => addr.id !== id));
  }
};



  
  return (
    <Container className="py-4">
      <h2 className="mb-4">My Profile</h2>
      
      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Profile Information</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p className="mb-0"><strong>Member Since:</strong> {user.joinDate}</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Addresses</h5>
             <Button 
  variant="outline-primary" 
  size="sm"
  onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
>
  Add New Address
</Button>

            </Card.Header>
            <Card.Body>
  {addresses.map(addr => (
    <div key={addr.id} className="border rounded p-3 mb-3">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start">
        <div className="mb-2 mb-sm-0">
          <h6 className="mb-1">
            {addr.name} 
            {addr.isDefault && <span className="badge bg-primary ms-2">Default</span>}
          </h6>
          <p className="text-muted mb-0">{addr.address}</p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => handleEditAddress(addr)}
          >
            Edit
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => handleDeleteAddress(addr.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  ))}
</Card.Body>

          </Card>
          
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order History</h5>
            </Card.Header>
            <Card.Body>
              {orders.length === 0 ? (
                <p className="text-muted">No orders yet.</p>
              ) : (
                orders.map(order => (
                  <div key={order._id} className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">Order {getOrderNumber(order._id)}</h6>
                        <p className="text-muted small mb-1">Placed on {formatDate(order.createdAt)}</p>
                        <p className="small text-muted mb-0">
                         {order.items.length} item{order.items.length > 1 ? 's' : ''} • 
      {order.items.map((item, index) => (
      <span key={index}>
      {item.product?.title || 'Product'} (×{item.quantity})
      {index < order.items.length - 1 ? ', ' : ''}
      </span>
        ))}
                        </p>
                      </div>
                      <div className="text-end">
                        <p className="h6 text-success mb-1">₹{order.totalAmount}</p>
                        <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
     {showAddressModal && (
        <div 
          className="modal-backdrop" 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <h5 className="mb-3">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h5>

              <input 
                className="form-control my-2"
                placeholder="Name (Home, Office...)"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              />

              <textarea 
                className="form-control my-2"
                placeholder="Enter full address"
                rows={3}
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              />

            
              <div className="form-check my-2">
                
                
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowAddressModal(false);
                    setEditingAddress(null);
                    setNewAddress({ name: '', address: '', isDefault: false });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                >
                  {editingAddress ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </Container>
  );
};

export default UserProfile;
