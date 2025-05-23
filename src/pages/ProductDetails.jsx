import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';



const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product.');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`https://fakestoreapi.com/products/${id}`)
        .then(() => {
          alert('Product deleted (simulated). Redirecting...');
          navigate('/products');
        })
        .catch(() => {
          alert('Failed to delete product.');
        });
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Img variant="top" src={product.image} style={{ height: '400px', objectFit: 'contain' }} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="success" onClick={() => addToCart(product)}>Add to Cart</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
