import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Stack, Row, Col, Image } from 'react-bootstrap';
import NavbarCustomer from '../components/navbar';
import Photo from '../assets/profile.png';
import Produk from '../assets/poduk1.png';
import Icon from '../assets/Icon.png';
import QR from '../assets/qr-code.png';
import convertRupiah from 'rupiah-format';
import dateFormat from 'dateformat';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';

export default function Profile() {
  const [transaction, setTransaction] = useState([]);
  const [state, dispatch] = useContext(UserContext);

  const getTransaction = async () => {
    try {
      const response = await API.get('/transaction');
      setTransaction(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      <NavbarCustomer />
      <Container>
        <div style={{ margin: '50px' }}>
          <Stack direction="horizontal" gap={5}>
            <div className="text-start">
              <div className="text-start mb-4 mt-5 fw-bold " style={{ color: '#613D2B' }}>
                My Profile
              </div>
              <Row>
                <Col>
                  <img src={Photo} className="img-fluid rounded" width={400} />
                </Col>
                <Col>
                  <div className="profile-header fw-bold" style={{ color: '#613D2B' }}>
                    Full Name
                  </div>
                  <div className="profile-content mb-3">{state.user.fullName}</div>
                  <div className="profile-header fw-bold" style={{ color: '#613D2B' }}>
                    Email
                  </div>
                  <div className="profile-content">{state.user.email}</div>
                </Col>
              </Row>
            </div>
            <div className="text-start">
              <div className="text-start mb-4 fw-bold " style={{ color: '#613D2B' }}>
                My Transaction
              </div>
              <div>
                {transaction?.length !== 0 ? (
                  <Container fluid className="px-1">
                    {transaction?.map((item, index) => (
                      <Link key={index} to={`/my-transaction/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Row className="mb-3 p-2" style={{ background: '#F6E6DA' }}>
                          <Col xs="3">
                            <Image src={Produk} alt="img" className="img-fluid" width={'100%'} />
                          </Col>
                          <Col xs="6">
                            <div
                              style={{
                                fontSize: '18px',
                                color: '#F74D4D',
                                fontWeight: '500',
                                lineHeight: '19px',
                              }}
                            >
                              {item.product.name}
                            </div>
                            <div
                              className="mt-2"
                              style={{
                                fontSize: '14px',
                                color: '#F74D4D',
                                fontWeight: '300',
                                lineHeight: '19px',
                              }}
                            >
                              {dateFormat(item.createdAt, 'dddd, d mmmm yyyy, HH:MM ')}
                              WIB
                            </div>

                            <div
                              className="mt-3"
                              style={{
                                fontSize: '14px',
                                fontWeight: '300',
                              }}
                            >
                              {convertRupiah.convert(`${item.product?.price}`)}
                            </div>

                            <div
                              className="mt-3"
                              style={{
                                fontSize: '14px',
                                fontWeight: '300',
                              }}
                            >
                              Qty : {item.orderQuantity}
                            </div>
                            <div
                              className="mt-3"
                              style={{
                                fontSize: '14px',
                                fontWeight: '700',
                              }}
                            >
                              Sub Total : {convertRupiah.convert(`${item.price}`)}
                            </div>
                          </Col>
                          <Col xs="3">
                            <Image src={Icon} alt="img" width={'100%'} />
                            <div className="mt-3 mb-3 ms-3">
                              <Image src={QR} alt="img" width={'80%'} />
                            </div>
                            <div className="rounded d-flex align-items-center justify-content-center">{item.status}</div>
                          </Col>
                        </Row>
                      </Link>
                    ))}
                  </Container>
                ) : (
                  <div className="no-data-transaction">No transaction</div>
                )}
              </div>
            </div>
          </Stack>
        </div>
      </Container>
    </>
  );
}
