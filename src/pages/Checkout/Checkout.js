import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';



const Checkout = () => {
const navigate = useNavigate();
const location = useLocation();

const selectedAddress = location.state?.selectedAddress;
   
   const [paymentMethod, setPaymentMethod] = useState("cod");
   const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
 
  


  


  
   if (!selectedAddress) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>No delivery address selected.</h4>
          <Button as={Link} to="/cart" variant="primary">Go Back to Cart</Button>
        </Alert>
      </Container>
    );
  }

  
   const handlePlaceOrder = async (e) => {
  e.preventDefault();

  const orderData = {
    items: cartItems.map(item => ({
      product: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity
    })),
    shippingAddress: {
      name: selectedAddress.fullName || selectedAddress.name,
      email: selectedAddress.email,
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
    },
    paymentMethod,
    totalAmount: getTotalPrice(),
  };

  const order = await addOrder(orderData);
  if (order) {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/profile');
    }, 3000);
  }
};


  if (orderPlaced) {
    return (
      <Container className="py-5">
        <Alert variant="success" className="text-center">
          <h2>🎉 Order Placed Successfully!</h2>
          <p className="mb-0">Redirecting to profile...</p>
        </Alert>
      </Container>
    );
  }
  return (
    <Container className="py-4">
      <h2 className="mb-4">Checkout</h2>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            
            <Card.Header>
              <h5 className="mb-0">Delivery Address</h5>
      
            </Card.Header>

            <Card.Body>
              <div><strong>Name:</strong> {selectedAddress.fullName}</div>
              <div><strong>Email:</strong> {selectedAddress.email}</div>
              <div><strong>Phone:</strong> {selectedAddress.phone}</div>
              <div><strong>Address:</strong> {selectedAddress.address}</div>
              <div><strong>City:</strong> {selectedAddress.city}</div>
              <div><strong>State:</strong> {selectedAddress.state}</div>
              <div><strong>Pincode:</strong> {selectedAddress.pincode}</div>
            </Card.Body>
          </Card>
          <Button 
            variant="success" 
            size="lg" 
            className="w-100"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>

        </Col>

        {/* RIGHT SECTION — Order Summary unchanged */}
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>

            <Card.Body>
              <ListGroup variant="flush" className="mb-3">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="px-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-0">{item.product.title}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span>₹{item.product.price * item.quantity}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>₹{getTotalPrice()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery:</span>
                <span className="text-success">Free</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between h5">
                <span>Total:</span>
                <span className="text-success">₹{getTotalPrice()}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
    

        
          
  );
};

export default Checkout;
