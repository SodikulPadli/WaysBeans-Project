import './App.css';
import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';
// Route Customer
import Landing from './pages/landingPage';
import Products from './pages/product';
import DetailProduct from './pages/detailProduct';
import MyCart from './pages/cart';
import Profile from './pages/profile';
import Complain from './pages/complian';
import Konfirmasi from './pages/konfirmasi';
import MyTransaction from './pages/deatailTransaction';
// Route Admin
import ProductAdmin from './pages/productAdmin';
import AddProductAdmin from './pages/addProduct';
import UpdateProductAdmin from './pages/updateProduct';
import Transaction from './pages/transaction';
import ComplainAdmin from './pages/complainAdmin';
import Approval from './pages/approval';

import { API, setAuthToken } from './config/api';
// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/product');
      }
      console.log(state);
    }
  }, [state]);

  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Call function check user with useEffect didMount here ...
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product" element={<Products />} />
        <Route path="/detail-product/:id" element={<DetailProduct />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/konfirmasi" element={<Konfirmasi />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/my-transaction/:id" element={<MyTransaction />} />
        <Route path="/product-admin" element={<ProductAdmin />} />
        <Route path="/add-product" element={<AddProductAdmin />} />
        <Route path="/update-product/:id" element={<UpdateProductAdmin />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/complain-admin" element={<ComplainAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
