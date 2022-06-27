import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Icon from '../../assets/iconchat.png';

export default function Contact() {
  return (
    <>
      <Container>
        <div className="rounded py-2 px-2 bg-secondary ">
          <Stack direction="horizontal">
            <div>
              <img src={Icon} className="rounded-circle me-2 img-contact" alt="user avatar" />
            </div>
            <div className="ps-1 text-contact d-flex flex-column justify-content-around">
              <p className="mb-0">Sodikul</p>
              <p className="text-contact-chat mt-1 mb-0">Help Me</p>
            </div>
          </Stack>
        </div>
      </Container>
    </>
  );
}
