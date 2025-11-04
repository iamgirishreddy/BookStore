import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import { books, categories } from '../../data/books';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductList = () => {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(category ? [category] : []);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  useEffect(() => {
    let result = [...books];
    
    if (localSearchQuery.trim()) {
      const query = localSearchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategories.length > 0) {
      result = result.filter(book => selectedCategories.includes(book.category));
    }
    
    if (minRating > 0) {
      result = result.filter(book => book.rating >= minRating);
    }
    
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });
    
    setFilteredBooks(result);
  }, [selectedCategories, minRating, sortBy, localSearchQuery]);
  
  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
  }, [category]);
  
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);
  
  const handleCategoryChange = (categoryName) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setMinRating(0);
    setSortBy('name');
    setLocalSearchQuery('');
  };
  
  return (
    <Container className="py-4">
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Filters</h5>
                <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Search Books</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by title or author..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Categories</Form.Label>
                {categories.map(cat => (
                  <Form.Check
                    key={cat.name}
                    type="checkbox"
                    label={`${cat.displayName} (${cat.count})`}
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryChange(cat.name)}
                  />
                ))}
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Minimum Rating</Form.Label>
                <Form.Range
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                />
                <div className="text-center">
                  <span className="text-warning">★</span> {minRating}+ and above
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating (High to Low)</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>
              {category ? `${categories.find(cat => cat.name === category)?.displayName || category} Books` : 'All Books'}
              {searchQuery && (
                <small className="text-muted"> - Search: "{searchQuery}"</small>
              )}
            </h2>
            <Badge bg="primary">{filteredBooks.length} books found</Badge>
          </div>
          
          <Row>
            {filteredBooks.length > 0 ? (
              filteredBooks.map(book => (
                <Col lg={4} md={6} key={book.id} className="mb-4">
                  <ProductCard book={book} />
                </Col>
              ))
            ) : (
              <Col>
                <div className="text-center py-5">
                  <h4>No books found</h4>
                  <p className="text-muted">Try adjusting your filters or search terms</p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
