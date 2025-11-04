import React, { useState } from 'react';
import { Navbar, Nav, Container, Badge, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const NavigationBar = () => {
  const { getTotalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };
  
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          📚 BookStore
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">All Books</Nav.Link>
            <Nav.Link as={Link} to="/products/fiction">Fiction</Nav.Link>
            <Nav.Link as={Link} to="/products/mythology">Mythology</Nav.Link>
            <Nav.Link as={Link} to="/products/biography">Biography</Nav.Link>
          </Nav>
          
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '250px' }}
            />
            <Button variant="outline-light" type="submit">
              🔍
            </Button>
          </Form>
          
          <Nav>
            <Nav.Link as={Link} to="/wishlist" className="position-relative">
              ❤️ Wishlist
              {wishlistItems.length > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {wishlistItems.length}
                </Badge>
              )}
            </Nav.Link>
            
            <Nav.Link as={Link} to="/cart" className="position-relative">
              🛒 Cart
              {getTotalItems() > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {getTotalItems()}
                </Badge>
              )}
            </Nav.Link>
            
            <Nav.Link as={Link} to="/profile">
              👤 Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
