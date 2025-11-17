import React,{ useState, useEffect } from 'react';
import API from '../../api/axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { books, categories } from '../../data/books';
import ProductCard from '../../components/ProductCard/ProductCard';


// const CATEGORY_IMAGES = {
//   fiction: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop&q=80",
//   'science-fiction': "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&q=80",
//   fantasy: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop&q=80",
//   science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop&q=80",
//   philosophy: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop&q=80",
//   history: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&h=400&fit=crop&q=80",
//   business: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
//   mythology: "https://images.unsplash.com/photo-1546778316-dfda79f1c84e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   biography: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&q=80"
// };

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          API.get('/products'),
          API.get('/categories')
        ]);
        setBooks(productsRes.data.data.products);
        setCategories(categoriesRes.data.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const featuredBooks = books.filter(book => book.featured);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Loading...</h3>
      </Container>
    );
  }

  
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
                        backgroundImage: `url("${CATEGORY_IMAGES[category.name] || CATEGORY_IMAGES.fiction}")`,
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
