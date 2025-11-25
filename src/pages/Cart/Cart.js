import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';


import {useAddress} from '../../context/AddressContext';






const Cart = () => {

   const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = React.useState(null);
const [showAddressModal, setShowAddressModal] = React.useState(false);

 const [alertMsg, setAlertMsg] = React.useState("");
const { addresses } = useAddress();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    clearCart 
  } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added any books yet.</p>
          <Button as={Link} to="/products" variant="primary" size="lg">
            Start Shopping
          </Button>
        </div>
      </Container>
    );
  }
  
  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Shopping Cart ({getTotalItems()} items)</h2>
            <Button variant="outline-danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

               {alertMsg && (
            <Alert variant="warning" className="py-2"> 
              {alertMsg}
            </Alert>
          )}
          
          <Card>
            <ListGroup variant="flush">
              {cartItems.length > 0 ? (
      cartItems.map((item, index) => {
  
     if (!item.product) return null;

     return (
      <ListGroup.Item key={item.product._id || index} className="mb-3">
        <Card.Body>
          <Row className="align-items-center g-3">

            <Col xs={3} md={2}>
              <img
                src={item.product.image || 'placeholder-image-url'}
                alt={item.product.title}
                className="img-fluid rounded"
              />
            </Col>

            <Col xs={9} md={4}>
              <h5>{item.product.title}</h5>
              <p className="text-muted mb-0">{item.product.author}</p>
            </Col>

            <Col xs={6} md={2} className="text-center">
              <p className="mb-0">₹{item.product.price}</p>
            </Col>

            <Col xs={6} md={2} className="text-center">
              <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </Col>

            <Col xs={12} md={2} className="text-center mt-2 mt-md-0">
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(item.product._id)}
                className="w-100 w-md-auto"
              >
                Remove
              </Button>
            </Col>

          </Row>
        </Card.Body>
      </ListGroup.Item>
       );
         })
          ) : (
        <div className="text-center py-5">
    <h4>Your cart is empty</h4>
    <p className="text-muted">Add some books to get started!</p>
    <Button as={Link} to="/products" variant="primary">
      Browse Books
    </Button>
        </div>
)}

            </ListGroup>
          </Card>
        </Col>
        
        <Col xs={12} lg={4} className="mt-4 mt-lg-0">
        
            <Card className="sticky-top" style={{ top: '80px', zIndex: 1010 }}>

  <Card className="mb-4">
  <Card.Header className="d-flex justify-content-between align-items-center">
    <h5 className="mb-0">Delivery Address</h5>
  </Card.Header>
  <Card.Body>
    {selectedAddress ? (
      <>
        <div className="mb-2">
          <strong>{selectedAddress.fullName}</strong><br />
          <span>{selectedAddress.address}</span>
          {selectedAddress.isDefault && <span className="badge bg-primary ms-2">Default</span>}
        </div>
        <Button variant="outline-secondary" size="sm" onClick={() => setShowAddressModal(true)}>
          Change Address
        </Button>
      </>
    ) : (
      <Button variant="outline-primary" size="sm" onClick={() => setShowAddressModal(true)}>
        Add Address
      </Button>
    )}
  </Card.Body>
</Card>

            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({getTotalItems()}):</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between h5">
                <span>Total:</span>
                <span className="text-success">₹{getTotalPrice()}</span>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-grid">
                <Button variant="success" size="lg" onClick={() => {
                    if (!selectedAddress) {
                      setAlertMsg("Select a delivery address before checkout!");
                      return;
                    }
                    navigate('/checkout', { state: { selectedAddress } });
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {showAddressModal && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,20,20,0.75)', // 🔧 CHANGE
            zIndex: 1050
          }}
        >
          <div className="modal-dialog modal-dialog-centered w-100">
            <div
              className="modal-content p-3"
              style={{ background: 'white', borderRadius: 8, minWidth: 320 }} // 🔧 CHANGE
            >
              <h5 className="mb-3">Select Delivery Address</h5>

              {addresses.length === 0 ? (
                <p>No addresses saved yet.</p>
              ) : (
                addresses.map(addr => (
                  <div
                    key={addr.id}
                    className="border rounded p-2 my-2 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{addr.fullName || addr.name}</strong><br />
                      <span>{addr.address}</span>
                      {addr.isDefault && <span className="badge bg-primary ms-2">Default</span>}
                    </div>

                    {/* 🔧 CHANGE: Proper select button */}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddressModal(false);
                        setAlertMsg(""); // remove alert when selected
                      }}
                    >
                      Deliver Here
                    </Button>
                  </div>
                ))
              )}

              <div className="d-flex justify-content-end gap-2 mt-2">
                <Button variant="secondary" onClick={() => setShowAddressModal(false)}>
                  Cancel
                </Button>
                <Button as={Link} to="/profile" variant="outline-primary">
                  Add/Edit Addresses
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </Container>
    

  );
};

export default Cart;
