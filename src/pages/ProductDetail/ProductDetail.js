import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { books } from '../../data/books';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  
  const book = books.find(book => book.id === parseInt(id));
  
  if (!book) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Book Not Found</h2>
          <p className="text-muted mb-4">Sorry, the book you're looking for doesn't exist.</p>
          <Button as={Link} to="/products" variant="primary">
            Back to Books
          </Button>
        </div>
      </Container>
    );
  }
  
  const handleAddToCart = () => {
    if (book.inStock) {
      addToCart(book);
      setAlertMessage(`"${book.title}" has been added to your cart!`);
      setAlertVariant('success');
      setShowAlert(true);
    }
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
      setAlertMessage(`"${book.title}" removed from wishlist`);
      setAlertVariant('info');
    } else {
      addToWishlist(book);
      setAlertMessage(`"${book.title}" added to wishlist!`);
      setAlertVariant('success');
    }
    setShowAlert(true);
  };
  
  const relatedBooks = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 3);
  
  return (
    <Container className="py-4">
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          onClose={() => setShowAlert(false)} 
          dismissible
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}
      
      <Row>
        <Col md={4}>
          <div 
            className="text-center mb-4"
            style={{
              width: '100%',
              maxWidth: '300px',
              height: '400px',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              margin: '0 auto'
            }}
          >
            <span style={{ fontSize: '4rem' }}>📖</span>
          </div>
        </Col>
        
        <Col md={8}>
          <div className="mb-2">
            <Badge bg="secondary" className="me-2">
              {book.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
            {!book.inStock && <Badge bg="danger">Out of Stock</Badge>}
          </div>
          
          <h1 className="mb-3">{book.title}</h1>
          <h5 className="text-muted mb-3">by {book.author}</h5>
          
          <div className="d-flex align-items-center mb-3">
            <span className="text-warning me-2">★★★★★</span>
            <span className="me-2">{book.rating}/5</span>
            <span className="text-muted">({book.reviewCount} reviews)</span>
          </div>
          
          <div className="mb-4">
            <span className="h3 text-success">₹{book.price}</span>
            {book.originalPrice > book.price && (
              <>
                <span className="text-muted text-decoration-line-through ms-3 h5">
                  ₹{book.originalPrice}
                </span>
                <Badge bg="danger" className="ms-2">
                  Save ₹{book.originalPrice - book.price}
                </Badge>
              </>
            )}
          </div>
          
          <p className="lead mb-4">{book.description}</p>
          
          <div className="d-flex flex-wrap gap-3 mb-4">
            <Button 
              variant="success" 
              size="lg"
              onClick={handleAddToCart}
              disabled={!book.inStock}
              className="flex-grow-1"
              style={{ minWidth: '200px' }}
            >
              {book.inStock ? (
                <>🛒 Add to Cart</>
              ) : (
                'Out of Stock'
              )}
            </Button>
            
            <Button 
              variant={isInWishlist(book.id) ? "danger" : "outline-danger"}
              size="lg"
              onClick={handleWishlistToggle}
              style={{ minWidth: '150px' }}
            >
              {isInWishlist(book.id) ? (
                <>❤️ In Wishlist</>
              ) : (
                <>🤍 Add to Wishlist</>
              )}
            </Button>
          </div>
          
          <div className="border rounded p-3 bg-light">
            <h6>Book Information</h6>
            <p className="mb-1"><strong>Author:</strong> {book.author}</p>
            <p className="mb-1"><strong>Category:</strong> {book.category.replace('-', ' ')}</p>
            <p className="mb-1"><strong>Rating:</strong> {book.rating}/5 ({book.reviewCount} reviews)</p>
            <p className="mb-0"><strong>Availability:</strong> {book.inStock ? 'In Stock' : 'Out of Stock'}</p>
          </div>
        </Col>
      </Row>
      
      {relatedBooks.length > 0 && (
        <Row className="mt-5">
          <Col>
            <h3 className="mb-4">You might also like</h3>
            <Row>
              {relatedBooks.map(relatedBook => (
                <Col md={4} key={relatedBook.id} className="mb-3">
                  <div className="border rounded p-3 h-100">
                    <div className="text-center mb-2">
                      <div 
                        style={{
                          width: '100px',
                          height: '130px',
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          border: '1px solid #dee2e6'
                        }}
                      >
                        📖
                      </div>
                    </div>
                    <h6>{relatedBook.title}</h6>
                    <p className="text-muted small">by {relatedBook.author}</p>
                    <p className="text-success mb-2">₹{relatedBook.price}</p>
                    <Button 
                      as={Link} 
                      to={`/product/${relatedBook.id}`}
                      variant="outline-primary" 
                      size="sm"
                      className="w-100"
                    >
                      View Details
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetail;
