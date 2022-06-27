import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Container, Navbar, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import Jumbotron from '../assets/Jumbotron.png';
import Produk from '../assets/poduk1.png';
import Icon from '../assets/Icon.png';
import SignInModal from '../components/auth/SignInModal';
import SignUpModal from '../components/auth/SignUpModal';

export default function Landing() {
  let navigate = useNavigate();
  const title = 'WaysBeans';
  document.title = title;
  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      navigate('/');
    }
  };
  checkAuth();

  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const modalSignIn = async (e) => {
    await setSignInModal(true);
    setSignUpModal(false);
  };

  const modalSignUp = async (e) => {
    await setSignUpModal(true);
    setSignInModal(false);
  };
  return (
    <>
      <Navbar bg="light" sticky="top" className="shadow  mb-3 bg-body rounded">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Icon} className="d-inline-block align-top" alt="WaysBeansLogo" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-dark" size="sm" style={{ marginRight: 10, paddingRight: 20, paddingLeft: 20 }} onClick={modalSignIn}>
              Login
            </Button>
            <Button variant="outline-dark" size="sm" style={{ paddingRight: 20, paddingLeft: 20, color: 'white', background: '#613D2B ' }} onClick={modalSignUp}>
              Register
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ width: '80%' }}>
        <Row className="mb-3">
          <Col>
            <Image src={Jumbotron} width={'100%'} />
          </Col>
        </Row>
        <CardGroup>
          <Row className="mb-3">
            <Col className="mb-3" onClick={modalSignIn}>
              <Card style={{ backgroundColor: '#F6E6DA' }}>
                <Card.Img variant="top" src={Produk} />
                <Card.Body className="text-start">
                  <Card.Title>Kopi Abah TGr</Card.Title>
                  <Card.Text>Rp.10.000</Card.Text>
                  <Card.Text>Stock : 20</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </CardGroup>
      </Container>
      <SignUpModal trigger={modalSignIn} show={signUpModal} onHide={() => setSignUpModal(false)} />
      <SignInModal trigger={modalSignUp} show={signInModal} onHide={() => setSignInModal(false)} />
    </>
  );
}
