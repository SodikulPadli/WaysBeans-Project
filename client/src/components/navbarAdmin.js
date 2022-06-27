import React, { useContext } from 'react';
import { Container, Navbar, Image, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faBookOpenReader, faComments, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import Icon from '../assets/Icon.png';
import Profile from '../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function NavbarAdmin() {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();
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
            <Link to={'/product-admin'} style={{ textDecoration: 'none', color: 'black' }}>
              <img src={Icon} className="d-inline-block align-top" alt="WaysBeansLogo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <Image src={Profile} roundedCircle width={'50px'} height={'50px'} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={'/product-admin'} style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faSeedling} className="me-3" />
                    Product
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={'/transaction'} style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faBookOpenReader} className="me-3" />
                    Transaction
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={'/complain-admin'} style={{ textDecoration: 'none', color: 'black' }}>
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

export default NavbarAdmin;
