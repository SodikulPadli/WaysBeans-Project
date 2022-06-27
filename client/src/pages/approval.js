import React from 'react';
import { Container, Button, Image, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../components/navbarAdmin';
import Produk from '../assets/poduk1.png';

export default function Approval() {
  const title = 'Approval Transaction';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/transaction');
  };

  return (
    <>
      <NavbarAdmin title={title} />
      <Container>
        <Card style={{ width: '60%', margin: 'auto' }} className="mt-5">
          <Card.Header className="text-center">Detail Transaction</Card.Header>
          <Card.Body className="text-start">
            <Row>
              <Col className="py-3">
                <div>Customer Name : Sodikul</div>
                <hr />
                <div>Product :Kopi Abah Tgr</div>
                <div>Price : 30.000</div>
                <div>Order : 2</div>
                <div>Total : 60.000</div>
                <div>Status Payment : Success</div>
                <div>Status Approval: Waiting Approval</div>
              </Col>
            </Row>
          </Card.Body>
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Approve
          </Button>
        </Card>
      </Container>
    </>
  );
}
