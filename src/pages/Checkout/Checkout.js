import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

const presetAddress = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '9876543210',
  address: '123 MG Road, Bangalore',
  city: 'Bangalore',
  state: 'Karnataka',
  pincode: '560001',
  paymentMethod: 'cod'
};


const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

    const handleAddAddress = () => {
    setFormData(presetAddress);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      phone: formData.phone
    },
    paymentMethod: formData.paymentMethod,
    totalAmount: getTotalPrice()
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
  

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p className="text-muted mb-4">Add items to cart before checkout.</p>
          <Button onClick={() => navigate('/products')} variant="primary" size="lg">
            Browse Books
          </Button>
        </div>
      </Container>
    );
  }

  if (orderPlaced) {
    return (
      <Container className="py-5">
        <Alert variant="success" className="text-center">
          <h2>🎉 Order Placed Successfully!</h2>
          <p className="mb-0">Thank you for your purchase. Redirecting to your profile...</p>
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
              <Button variant="outline-primary" size="sm" onClick={handleAddAddress}>
                Add Address
              </Button>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePlaceOrder}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode *</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        placeholder="Enter pincode"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter complete address"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter city"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="Enter state"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Card className="mt-4">
                  <Card.Header>
                    <h5 className="mb-0">Payment Method</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form.Check
                      type="radio"
                      label="Cash on Delivery (COD)"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="UPI Payment"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="Credit/Debit Card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                  </Card.Body>
                </Card>

                <Button variant="success" size="lg" type="submit" className="w-100 mt-4">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="card" >
            {/* <Card className="sticky-top" style={{ top: '20px', zIndex: 1020 }}> */}

            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className="mb-3">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="px-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-0">{item.title}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span>₹{item.price * item.quantity}</span>
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
