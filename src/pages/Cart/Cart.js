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
              {cartItems.length > 0 ? (
  cartItems.map((item, index) => {
    // ✅ Skip broken/null product entries
    if (!item.product) return null;

    return (
      <Card key={item.product._id || index} className="mb-3">
        <Card.Body>
          <Row className="align-items-center">

            <Col xs={3} md={2}>
              <img
                src={item.product.image || 'placeholder-image-url'}
                alt={item.product.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
              <div className="d-flex align-items-center justify-content-center gap-2">
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
      </Card>
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
        
        <Col lg={4}>
        
            <Card className="sticky-top" style={{ top: '80px', zIndex: 1010 }}>

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
