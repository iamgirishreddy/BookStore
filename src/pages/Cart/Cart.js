import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart = () => {
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
          
          <Card>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.id} className="p-3">
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <div 
                        style={{
                          width: '80px',
                          height: '100px',
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #dee2e6',
                          borderRadius: '4px'
                        }}
                      >
                        📖
                      </div>
                    </Col>
                    
                    <Col xs={9} md={4}>
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="text-muted small mb-1">by {item.author}</p>
                      <p className="text-success mb-0">₹{item.price}</p>
                    </Col>
                    
                    <Col xs={6} md={3}>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    
                    <Col xs={6} md={2}>
                      <p className="h6 text-success mb-0">
                        ₹{item.price * item.quantity}
                      </p>
                    </Col>
                    
                    <Col xs={12} md={1} className="text-end">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
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
                <Button variant="success" size="lg" as={Link} to="/checkout">
                  Proceed to Checkout
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
