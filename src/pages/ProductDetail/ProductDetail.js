import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
// import { books } from '../../data/books';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [book, setBook] = useState(null);
const [relatedBooks, setRelatedBooks] = useState([]);
const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const productId = book?._id || book?.id;
  
useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/products/${id}`);
      const product = data.data.product;
      setBook(product);

      const relatedRes = await API.get(`/products?category=${product.category}`);
      const related = relatedRes.data.data.products
        .filter(b => b._id !== id)
        .slice(0, 3);
      setRelatedBooks(related);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

if (loading) {
  return (
    <Container className="py-5 text-center">
      <h3>Loading...</h3>
    </Container>
  );
}

  
  if (!book) {
    return (
      <Container className="py-5">
       <h2>Book Not Found</h2>
      <Button as={Link} to="/products" variant="primary">
        Back to Books
      </Button>
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
    const productId = book._id || book.id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      setAlertMessage(`"${book.title}" removed from wishlist`);
      setAlertVariant('info');
    } else {
      addToWishlist(book);
      setAlertMessage(`"${book.title}" added to wishlist!`);
      setAlertVariant('success');
    }
    setShowAlert(true);
  };
  
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
              margin: '0 auto',
              padding: '16px',
              overflow: 'hidden'
            }}
          >
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"%3E%3Crect width="100%25" height="100%25" fill="%23f8f9fa"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23495057"%3E📚%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : (
              <span style={{ fontSize: '4rem' }}>📚</span>
            )}
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
              variant={isInWishlist(productId) ? "danger" : "outline-danger"}
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
        <div className="mt-5">
          <h3 className="mb-4">You might also like</h3>
          <Row>
            {relatedBooks.map(relatedBook => (
              <Col md={4} key={relatedBook.id} className="mb-3">
                <ProductCard book={relatedBook} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductDetail;
