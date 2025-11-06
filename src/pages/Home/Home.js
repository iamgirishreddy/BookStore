import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { books, categories } from '../../data/books';
import ProductCard from '../../components/ProductCard/ProductCard';

// You can change this URL to update all category images at once
const CATEGORY_HERO_IMAGE = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&h=300&q=80";

const Home = () => {
  const featuredBooks = books.filter(book => book.featured);
  
  return (
    <div>
      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <Row>
            <Col md={8} className="mx-auto text-center">
              <h1 className="display-4 mb-3">Welcome to Our Bookstore!</h1>
              <p className="lead mb-4">
                Discover amazing books from all genres. From classic literature 
                to modern science fiction, we have something for every reader.
              </p>
              <Button as={Link} to="/products" variant="light" size="lg">
                Browse All Books
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Container>
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Shop by Category</h2>
            <Row>
              {categories.map(category => (
                <Col md={3} sm={6} key={category.name} className="mb-3">
                  <Card className="h-100 shadow-sm category-card">
                    <div 
                      style={{
                        height: '160px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundImage: `url("${CATEGORY_HERO_IMAGE}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#f8f9fa' // Fallback color while image loads
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '15px'
                        }}
                      >
                        <h5 className="mb-0 text-white">{category.displayName}</h5>
                      </div>
                    </div>
                    <Card.Body className="text-center">
                      <p className="text-muted mb-3">{category.count} books</p>
                      <Button 
                        as={Link} 
                        to={`/products/${category.name}`}
                        variant="outline-primary"
                        className="w-100"
                      >
                        Explore Category
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Featured Books</h2>
            <Row>
              {featuredBooks.slice(0, 8).map(book => (
                <Col lg={3} md={6} key={book.id} className="mb-4">
                  <ProductCard book={book} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
