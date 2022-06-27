import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardGroup, Image, Stack } from 'react-bootstrap';
import Jumbotron from '../assets/Jumbotron.png';
import Produk from '../assets/poduk1.png';
import convertRupiah from 'rupiah-format';
import NavbarCustomer from '../components/navbar';

// API config
import { API } from '../config/api';

export default function Products() {
  const title = 'Product';
  document.title = 'WaysBeans | ' + title;
  const [products, setProduct] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get('/products');
      setProduct(response.data.data.products);
      console.log(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavbarCustomer title={title} />
      <Container style={{ width: '80%' }}>
        <Row className="mb-3">
          <Col>
            <Image src={Jumbotron} width={'100%'} />
          </Col>
        </Row>
        <CardGroup>
          <Stack direction="horizontal" className="mb-3" gap={5}>
            {products?.map((item, index) => (
              <Link key={index} to={`/detail-product/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <Card style={{ backgroundColor: '#F6E6DA' }}>
                  <div>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body className="text-start">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{convertRupiah.convert(item.price)}</Card.Text>
                      <Card.Text>Stock : {item.stock}</Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Link>
            ))}
          </Stack>
        </CardGroup>
      </Container>
    </>
  );
}
