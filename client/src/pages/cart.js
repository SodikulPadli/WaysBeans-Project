import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Stack, Image, Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromWaterPump, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavbarCustomer from '../components/navbar';
// import Produk from '../assets/poduk1.png';
import convertRupiah from 'rupiah-format';
import { API } from '../config/api';

export default function MyCart() {
  const title = 'My Cart';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);

  const getProductCart = async () => {
    try {
      const response = await API.get('/carts');
      setProducts(response.data.data);
      const totalqty = response.data.data.reduce((sum, elem) => sum + elem.orderQuantity, 0);
      setQty(totalqty);
      console.log(totalqty);
      const totalprice = response.data.data.reduce((sum, elem) => sum + elem.orderQuantity * elem.product.price, 0);
      setTotal(totalprice);
      console.log(totalprice);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseCart = async (idProduct) => {
    try {
      const result = products.find(({ id }) => id == idProduct);
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify({ orderQuantity: result.orderQuantity + 1 });
      const response = await API.patch('/cart/' + idProduct, body, config);

      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  const getQty = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCart = async (idProduct) => {
    try {
      const result = products.find(({ id }) => id == idProduct);
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify({ orderQuantity: result.orderQuantity - 1 });
      const response = await API.patch('/cart/' + idProduct, body, config);

      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const { name, email, phone, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuy = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const data = {
        name,
        email,
        phone,
        address,
        price: total,
        orderQuantity: qty,
        product: products,
      };

      const body = JSON.stringify(data);
      const response = await API.post('/transaction/', body, config);
      navigate('/profile');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      getProductCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductCart();
    getQty();
  }, []);
  return (
    <>
      <NavbarCustomer title={title} />
      <Container>
        <div style={{ margin: '100px' }}>
          <form>
            <Stack direction="horizontal" gap={5}>
              <div className="text-start me-5">
                <p style={{ color: '#613D2B', fontSize: 30, fontWeight: 'bold' }}> My Cart</p>
                <p> Review Your Order</p>
                <hr />
                <Stack direction="horizontal" gap={5}>
                  {products?.map((item, index) => (
                    <Row key={index}>
                      <Col sm={4}>
                        <Image src={item.product.image} width={'80%'} />
                      </Col>
                      <Col sm={4} className="text-start my-auto">
                        <h5>{item.product.name}</h5>
                        <FontAwesomeIcon icon={faMinus} className="pe-3" onClick={() => decreaseCart(item.id)} />
                        {item.orderQuantity}
                        <FontAwesomeIcon icon={faPlus} className="ps-3" onClick={() => increaseCart(item.id)} />
                      </Col>
                      <Col sm={4} className="text-end my-auto">
                        <p> {convertRupiah.convert(item.product.price)}</p>
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteById(item.id)} />
                      </Col>
                    </Row>
                  ))}
                </Stack>
                <hr />
              </div>
              <Stack direction="horizontal" gap={5}>
                <div style={{ marginTop: '70px' }}>
                  <hr />
                  <Row>
                    <Col sm={4} className="text-start">
                      <p>Subtotal</p>
                      <p>Qty</p>
                      <p className="mt-5">Total</p>
                    </Col>
                    <Col sm={8} className="text-end ">
                      <p> {convertRupiah.convert(total)}</p>
                      <p> {qty}</p>
                      <p className="mt-5"> {convertRupiah.convert(total)}</p>
                    </Col>

                    <Button
                      onClick={() => {
                        handleBuy();
                      }}
                      style={{ color: 'white', backgroundColor: '#613D2B' }}
                      size="sm"
                    >
                      Pay
                    </Button>
                  </Row>
                </div>
              </Stack>
              <Stack>
                <Card style={{ margin: 'auto' }} className="mt-5">
                  <Card.Header className="text-center fw-bold" style={{ color: '#613D2B', fontSize: 20 }}>
                    Detail Pengiriman
                  </Card.Header>
                  <Card.Body>
                    <div className=" fw-bold">
                      <Form.Label>Wajib Isi</Form.Label>
                      <Form.Control type="text" required placeholder="Name" name="name" value={name} onChange={handleChange} className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                      <Form.Control type="text" required placeholder="Email" name="email" value={email} onChange={handleChange} className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                      <Form.Control type="number" required placeholder="Phone" name="phone" value={phone} onChange={handleChange} className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                      <Form.Control as="textarea" rows={3} required placeholder="Address" name="address" value={address} onChange={handleChange} className="mt-2" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                    </div>
                  </Card.Body>
                </Card>
              </Stack>
            </Stack>
          </form>
        </div>
      </Container>
    </>
  );
}
