import React, { useState } from 'react';
import { Card, Button, Badge, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ book }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
    setToastMessage(`"${book.title}" added to cart!`);
    setShowToast(true);
  };
  
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
      setToastMessage(`"${book.title}" removed from wishlist`);
    } else {
      addToWishlist(book);
      setToastMessage(`"${book.title}" added to wishlist!`);
    }
    setShowToast(true);
  };
  
  return (
    <>
      <Card className="h-100 shadow-sm product-card position-relative">
        <Button
          variant="link"
          className="position-absolute top-0 end-0 p-2 text-danger"
          onClick={handleWishlistToggle}
          style={{ zIndex: 1 }}
        >
          {isInWishlist(book.id) ? '❤️' : '🤍'}
        </Button>
        
        <div className="text-center pt-3">
          <div 
            style={{
              width: '150px',
              height: '200px',
              backgroundColor: '#f8f9fa',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          >
            📖
          </div>
        </div>
        
        <Card.Body>
          <Card.Title className="h6" title={book.title}>
            {book.title.length > 50 ? book.title.substring(0, 47) + '...' : book.title}
          </Card.Title>
          
          <Card.Text className="text-muted small mb-2">
            by {book.author}
          </Card.Text>
          
          <div className="mb-2">
            <Badge bg="secondary" className="me-1">
              {book.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
            {!book.inStock && (
              <Badge bg="danger">Out of Stock</Badge>
            )}
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <span className="h6 text-success">₹{book.price}</span>
              {book.originalPrice > book.price && (
                <>
                  <span className="text-muted text-decoration-line-through ms-2 small">
                    ₹{book.originalPrice}
                  </span>
                  <Badge bg="danger" className="ms-1">
                    Save ₹{book.originalPrice - book.price}
                  </Badge>
                </>
              )}
            </div>
          </div>
          
          <div className="d-flex align-items-center mb-3">
            <span className="text-warning me-1">★</span>
            <span className="me-2">{book.rating}</span>
            <span className="text-muted small">({book.reviewCount} reviews)</span>
          </div>
        </Card.Body>
        
        <Card.Footer className="bg-transparent">
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={!book.inStock}
            >
              {book.inStock ? 'Add to Cart 🛒' : 'Out of Stock'}
            </Button>
            
            <Button
              as={Link}
              to={`/product/${book.id}`}
              variant="outline-primary"
              size="sm"
            >
              View Details
            </Button>
          </div>
        </Card.Footer>
      </Card>
      
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-success">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default ProductCard;
