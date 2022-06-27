import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import NavbarAdmin from '../components/navbarAdmin';
import Product from '../assets/poduk1.png';

import { API } from '../config/api';

export default function UpdateProductAdmin() {
  // console.clear();
  const title = 'Update Product';
  document.title = 'WaysBeans | ' + title;
  let navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const getProduct = async () => {
    try {
      const response = await API.get('/product' + id);
      setProduct(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
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

  // Create function for handle submit data ...
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
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('description', form.description);
      formData.set('price', form.price);
      formData.set('stock', form.stock);

      // Insert product data
      const response = await API.patch('/product/' + product.id, formData, config);
      console.log(response.data.data);
      navigate('/product-admin');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row className="mx-5">
          <div className="text-start mb-4 fw-bold" style={{ color: '#613D2B', fontSize: 20 }}>
            Update Product
          </div>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Col className="d-grid ">
              <div className="text-start mb-4 fw-bold">
                <Form.Control type="text" placeholder="Product Name" name="name" onChange={handleChange} value={product.name} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Product description"
                  onChange={handleChange}
                  value={product.description}
                  name="description"
                  className="mt-4"
                  style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }}
                ></Form.Control>
                <Form.Control type="number" placeholder="Price (Rp.)" name="price" onChange={handleChange} value={product.price} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
                <Form.Control type="number" placeholder="Stock" name="stock" onChange={handleChange} value={product.stock} className="mt-4" style={{ backgroundColor: '#BCBCBC40', border: '2px solid #BCBCBC' }} />
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
                    Update Product
                  </Button>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-start">
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
              </div>
            </Col>
          </Form>
        </Row>
      </Container>
    </>
  );
}
