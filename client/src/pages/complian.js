import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavbarComplain from '../components/navbarComplain';
import Chat from '../components/complain/chat';
import Contact from '../components/complain/contact';

export default function Complain() {
  return (
    <>
      <NavbarComplain />
      <Container fluid style={{ height: '89.5vh' }}>
        <Row>
          <Col md={3} style={{ height: '89.5vh' }} className="px-3 border-end border-secondary overflow-auto">
            <Contact />
          </Col>
          <Col md={9} style={{ height: '89.5vh' }} className="px-0">
            <Chat />
          </Col>
        </Row>
      </Container>
    </>
  );
}
