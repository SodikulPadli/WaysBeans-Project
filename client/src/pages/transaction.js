import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import NavbarAdmin from '../components/navbarAdmin';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { API } from '../config/api';

export default function Transaction() {
  const title = 'Transaction Admin';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState([]);

  const updateStatus = async (id, status) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify({ status: status });
      const response = await API.patch(`/transaction-admin/${id}`, body, config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTransactions = async () => {
    try {
      const response = await API.get('/transactions');
      setTransactions(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5" style={{ height: '89.5vh', color: 'white' }}>
        <Row>
          <Col xs="6">
            <div className="text-start mb-4 fw-bold" style={{ color: '#613D2B', fontSize: 20 }}>
              Income Transaction
            </div>
          </Col>

          <Col xs="12">
            <Table striped hover size="lg" variant="light">
              <thead>
                <tr>
                  <th width="1%" className="text-center">
                    No
                  </th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Post Code</th>
                  <th>Product Order</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((item, index) => (
                  <tr>
                    <td className="align-middle text-center">{index + 1}</td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.address}</td>
                    <td className="align-middle">15560</td>
                    <td className="align-middle">{item.products?.map((item) => `${item.name} `)}</td>
                    <td className="align-middle text-warning">{item.status}</td>
                    <td className="align-middle">
                      <div>
                        <Button
                          onClick={() => {
                            updateStatus(item.id, 'cancel');
                          }}
                          className="btn-sm btn-danger me-2"
                          style={{ width: '135px' }}
                        >
                          Cancel
                        </Button>

                        <Button
                          onClick={() => {
                            updateStatus(item.id, 'approve');
                          }}
                          className="btn-sm btn-succes"
                          style={{ width: '135px' }}
                        >
                          Approve
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
