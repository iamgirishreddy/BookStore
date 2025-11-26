import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleMoveToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book._id);
  };
  
  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Your Wishlist is Empty</h2>
          <p className="text-muted mb-4">Save books you love for later!</p>
          <Button as={Link} to="/products" variant="primary" size="lg">
            Browse Books
          </Button>
        </div>
      </Container>
    );
  }
  
  return (
    <Container className="py-4">
      <h2 className="mb-4">My Wishlist ({wishlistItems.length} items)</h2>
      
      <Row>
        {wishlistItems.map(book => (
          <Col xs={12} md={6}
 key={book._id} className="mb-3">
            <Card>
              <Card.Body>
                <Row className="align-items-center g-3">

                  <Col xs={4} sm={3} md={3} lg={3}>
                    <img 
  src={book.image}
  alt={book.title}
  className="img-fluid rounded border"
  style={{width: "100%",
    maxWidth: "90px", 
    height: "130px",
    objectFit: "cover",
    objectPosition: "top"}}

/>

                  </Col>
                  <Col xs={9}>
                    <h6>{book.title}</h6>
                    <p className="text-muted small">by {book.author}</p>
                    <p className="text-success mb-2">₹{book.price}</p>
                   <div className="d-flex flex-wrap gap-2">

                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleMoveToCart(book)}
                        disabled={!book.inStock}
                      >
                        Move to Cart
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromWishlist(book._id)}
                      >
                        Remove
                      </Button>
                      <Button 
                        as={Link}
                        to={`/product/${book._id}`}
                        variant="outline-primary" 
                        size="sm"
                      >
                        View
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
