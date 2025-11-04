import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { books, categories } from '../../data/books';

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
                    <Card.Body className="text-center">
                      <h5 className="card-title">{category.displayName}</h5>
                      <p className="text-muted">{category.count} books</p>
                      <Button 
                        as={Link} 
                        to={`/products/${category.name}`}
                        variant="outline-primary"
                      >
                        Explore {category.displayName}
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
                  <Card className="h-100 shadow-sm book-card">
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
                          border: '1px solid #dee2e6'
                        }}
                      >
                        📖
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title className="h6">{book.title}</Card.Title>
                      <Card.Text className="text-muted small">
                        by {book.author}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="h6 text-success">₹{book.price}</span>
                          {book.originalPrice > book.price && (
                            <span className="text-muted text-decoration-line-through ms-2">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-warning">★</span>
                          <span className="small">{book.rating}</span>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <Button 
                        as={Link}
                        to={`/product/${book.id}`}
                        variant="primary" 
                        size="sm" 
                        className="w-100"
                      >
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card>
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
