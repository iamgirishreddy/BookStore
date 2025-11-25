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
    <Navbar bg="dark" variant="dark" expand="lg" className="">
      <Container>
        <Navbar.Brand as={Link} to="/">
          📚 BookStore
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          
             <Nav.Link as={Link} to="/products">Products</Nav.Link>

          </Nav>
          
         <Form className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0 w-100 w-lg-auto" onSubmit={handleSearch} >
  <FormControl
    type="search"
    placeholder="Search books..."
    className="w-100 w-lg-auto"
    aria-label="Search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    
  
  />
  <Button variant="outline-light" onClick={handleSearch}>Search</Button>
</Form>

          
          <Nav>
            <Nav.Link as={Link} to="/wishlist" className="d-flex align-items-center gap-1">
              ❤️ Wishlist {wishlistItems.length > 0 && <Badge bg="danger" className="ms-1">{wishlistItems.length}</Badge>}

            </Nav.Link>
            
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center gap-1">
             🛒 Cart {getTotalItems() > 0 && <Badge bg="danger" className="ms-1">{getTotalItems()}</Badge>}

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
