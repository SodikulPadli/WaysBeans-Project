import React from 'react';
import { Col, Container, Row, Stack, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Icon from '../../assets/iconchat.png';
const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3" style={{ color: 'red' }}>
      Info penting
    </Popover.Header>
    <Popover.Body>Mohon Maaf untuk sementara Fitur tidak dapat digunakan?</Popover.Body>
  </Popover>
);

export default function Chat() {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-start bg-secondary rounded pt-2">
            <img src={Icon} className="rounded-circle me-2 img-chat" alt="bubble avatar" />
            <p className="text-success ps-2 fw-bold">Online</p>
          </Col>
        </Row>
        <Row>
          <Col md={3} id="chat-messages" style={{ height: '80vh' }} className="py-2 ">
            <p className="text-start bg-light  rounded px-3 me-5">Hallo Selamat Siang</p>
            <p className="text-start bg-light rounded px-3 ">Siang </p>
          </Col>
        </Row>
        <Stack direction="horizontal" gap={2}>
          <div style={{ height: '6vh', width: '100%' }} className="text-start">
            <input placeholder="Send Message" className="input-message me-3" style={{ width: '80%' }} />
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <Button>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </OverlayTrigger>
          </div>
        </Stack>
      </Container>
    </>
  );
}
