import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import convertRupiah from 'rupiah-format';
import { Container, Button, Image, Stack } from 'react-bootstrap';
import NavbarCustomer from '../components/navbar';
import Produk from '../assets/poduk1.png';
// API config
import { API } from '../config/api';

export default function DetailProduct() {
  const title = 'Detail Product';
  document.title = 'WaysBeans | ' + title;
  const [product, setProduct] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();
  // fetch data produk by id
  const getProduct = async () => {
    try {
      const response = await API.get('/product/' + id);
      setProduct(response.data.data);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddCart = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // let idProduct = id;
      const body = JSON.stringify({ idProduct: id });

      const response = await API.post('/cart', body, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    console.log(product);
  }, []);
  return (
    <>
      <NavbarCustomer title={title} />
      <Container style={{ width: '80%' }}>
        <div>
          <Stack direction="horizontal" gap={5} style={{ justifyContent: 'center', marginTop: '100px' }}>
            <div>
              <Image src={product.image} />
            </div>
            <div className="text-start d-grid ">
              <h3 style={{ color: '#613D2B' }}>{product.name}</h3>
              <p style={{ color: '#974A4A' }}>Stock : {product.stock}</p>
              <p>{product.description}</p>
              <p className="text-end" style={{ color: '#974A4A' }}>
                {convertRupiah.convert(product.price)}
              </p>
              <Button onClick={handleAddCart} style={{ color: 'white', backgroundColor: '#613D2B' }} size="lg">
                Add Cart
              </Button>
            </div>
          </Stack>
        </div>
      </Container>
    </>
  );
}
