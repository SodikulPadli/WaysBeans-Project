import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../components/navbarAdmin';
import Product from '../assets/poduk1.png';

//API config
import { API } from '../config/api';
export default function AddProductAdmin() {
  const title = ' Add Product';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: '',
    stock: '',
    price: '',
    description: '',
    image: '',
  });

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('name', form.name);
      formData.set('description', form.description);
      formData.set('price', form.price);
      formData.set('stock', form.stock);
      const response = await API.post('/product', formData, config);
      console.log(response);
      navigate('/product-admin');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);
  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row className="mx-5">
          <div className="text-start mb-4 fw-bold" style={{ color: '#613D2B', fontSize: 20 }}>
            Add Product
          </div>

          <Col>
            <Form onSubmit={handleSubmit}>
              <div className="text-start mb-4 fw-bold">
                <Form.Control type="text" placeholder="Product Name" name="name" onChange={handleChange} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                <Form.Control as="textarea" rows={3} placeholder="Product description" name="description" onChange={handleChange} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }}></Form.Control>
                <Form.Control type="number" placeholder="Price (Rp.)" name="price" onChange={handleChange} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                <Form.Control type="number" placeholder="Stock" name="stock" onChange={handleChange} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                <Form.Label for="upload" className="label-file-add-product text-start">
                  <div style={{ backgroundColor: '#BCBCBC40', marginTop: 10, color: '#613D2B' }} className="border border-secondary p-1 rounded">
                    <Form.Control type="file" id="upload" name="image" onChange={handleChange} hidden />
                    Photo Product <FontAwesomeIcon icon={faPaperclip} className="ms-2" />
                  </div>
                </Form.Label>
                <div className=" mt-3">
                  <Button
                    className="px-5"
                    style={{ backgroundColor: '#613D2B' }}
                    onClick={() => {
                      handleSubmit();
                    }}
                    type="submit"
                  >
                    Add Product
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
          <Col>
            <div className="d-flex flex-start">
              {preview && (
                <div>
                  <img src={preview} style={{ width: 250 }} alt="preview" />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
