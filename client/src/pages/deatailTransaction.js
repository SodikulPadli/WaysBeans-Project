import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Container, Button, Image, Card, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import NavbarCustomer from '../components/navbar';
import Produk from '../assets/poduk1.png';
import convertRupiah from 'rupiah-format';
import dateFormat from 'dateformat';
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';

export default function MyTransaction() {
  const title = 'Konfirmasi Pesanan ';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [transaction, setTransaction] = useState([]);
  const [form, setForm] = useState({
    attechment: '',
  });

  const getTransaction = async () => {
    try {
      const response = await API.get('/transaction/' + id);
      setTransaction(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (transaction) {
      setPreview(transaction.attechment);
      setForm({
        ...form,
      });
      setTransaction(transaction);
    }
  }, [transaction]);

  // Create function for handle change data on form here ...
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.attechment) {
        formData.set('attechment', form?.attechment[0], form?.attechment[0]?.name);
      }

      // Insert product data
      const response = await API.patch('/transaction/' + id, formData, config);
      console.log(response.data.data);

      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <>
      <NavbarCustomer title={title} />
      <Container>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Card style={{ width: '60%', margin: 'auto' }} className="mt-5">
            <Card.Header className="text-center">Informasi Pemesanan </Card.Header>
            <Card.Body className="text-start">
              {transaction?.map((item) => (
                <Row className="mb-3">
                  <Col className="py-3">
                    <div>Customer Name : {state.user.fullName}</div>
                    <hr />
                    <div>Product :{item.product?.name}</div>
                    <div>Price : {item.product?.price}</div>
                    <div>Order : {item.orderQuantity}</div>
                    <div>Total : {convertRupiah.convert(`${item.price}`)}</div>
                    <div>Status Payment :{item.status}</div>

                    <Form.Label for="upload" className="label-file-add-product text-start">
                      <div style={{ backgroundColor: '#BCBCBC40', marginTop: 10, color: '#613D2B' }} className="border border-secondary p-1 rounded">
                        <Form.Control type="file" id="upload" name="attechment" onChange={handleChange} />
                        Upload Bukti Pembayaran <FontAwesomeIcon icon={faPaperclip} className="ms-2" />
                      </div>
                    </Form.Label>
                    {preview && (
                      <div>
                        <img
                          src={preview}
                          style={{
                            maxWidth: '150px',
                            maxHeight: '150px',
                            objectFit: 'cover',
                          }}
                          alt="preview"
                        />
                      </div>
                    )}
                  </Col>
                  <Col>
                    <div className="d-flex flex-start">
                      <img src={Produk} />
                    </div>
                  </Col>
                </Row>
              ))}
            </Card.Body>
            <Button type="submit">Send</Button>
          </Card>
        </form>
      </Container>
    </>
  );
}
