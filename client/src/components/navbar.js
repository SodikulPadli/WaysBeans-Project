import React, { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Image, Dropdown, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faUser, faComments, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import Icon from '../assets/Icon.png';
import Profile from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';

function NavbarCustomer() {
  const [state, dispatch] = useContext(UserContext);
  const [qtyCart, setQtyCart] = useState(0);
  let navigate = useNavigate();
  const getProductCart = async () => {
    try {
      const response = await API.get('/carts');

      setQtyCart(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductCart();
  }, [state]);
  const logout = () => {
    console.log(state);
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };
  return (
    <>
      <Navbar bg="light" sticky="top" className="shadow  mb-3 bg-body rounded">
        <Container>
          <Navbar.Brand>
            <Link to={'/product'}>
              <img src={Icon} className="d-inline-block align-top" alt="WaysBeansLogo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to={'/cart'} style={{ textDecoration: 'none', color: 'black' }}>
              <FontAwesomeIcon icon={faBasketShopping} size="2x" />
              {qtyCart ? (
                <Badge bg="danger" pill style={{ marginLeft: '-20px', marginTop: '-50px' }}>
                  {qtyCart}
                </Badge>
              ) : (
                <></>
              )}
            </Link>
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <Image src={Profile} roundedCircle width={'50px'} height={'50px'} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={'/profile'} style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faUser} className="me-3" />
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={'/complain'} style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faComments} className="me-2" />
                    Complain
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={logout}>
                    <FontAwesomeIcon icon={faDoorClosed} className="me-3" />
                    Logout
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarCustomer;
