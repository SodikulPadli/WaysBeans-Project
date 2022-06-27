import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarCustomer from '../components/navbar';

export default function Konfirmasi() {
  // console.clear();
  const title = 'Konfirmasi Pembayaran';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();
  const [preview, setPreview] = useState(null); //For image preview

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    stock: '',
  });
  const handleSubmit = () => {
    navigate('/profile');
  };
  return (
    <>
      <NavbarCustomer title={title} />
      <Container className="my-5">
        <Card style={{ width: '60%', margin: 'auto' }} className="mt-5">
          <Card.Header className="text-center  mb-4 fw-bold" style={{ color: '#613D2B', fontSize: 20 }}>
            Transaction
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <div className="text-start mb-4 fw-bold">
                  <Form>
                    <Form.Label>Form Pengiriman</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="name" className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                    <Form.Control type="number" placeholder="Email" name="email" className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                    <Form.Control type="number" placeholder="Phone" name="phone" className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                    <Form.Control as="textarea" rows={3} placeholder="Address" name="address" className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                    <Form.Control type="number" placeholder="Post Code" name="postcode" className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                    <div className="mt-2">
                      <Form.Label>Detail Transaction</Form.Label>
                      <hr />
                      <Form.Label>Product : Kopi abah</Form.Label>
                      <br />
                      <Form.Label>Price : Rp.30.000</Form.Label>
                      <br />
                      <Form.Label>order : 2</Form.Label>
                      <br />
                      <Form.Label>Total : Rp.60.0000</Form.Label>
                      <br />
                    </div>
                    <Button
                      className="px-5"
                      style={{ backgroundColor: '#613D2B' }}
                      onClick={() => {
                        handleSubmit();
                      }}
                      type="submit"
                      size="sm"
                    >
                      Pay
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
