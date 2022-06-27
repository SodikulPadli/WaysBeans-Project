const express = require('express');

const router = express.Router();

// Controller User
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controller/user');

// Controller Auth
const { register, login, checkAuth } = require('../controller/auth');

// Controller Product
const { addProduct, getProduct, getProductAdmin, getProducts, updateProduct, deleteProduct } = require('../controller/product');

// Controller Cart
const { addCart, getCart, updateCart, deleteCart } = require('../controller/cart');

//  Contoller Ttansaction
const { getTransactions, getTransaction, addTransaction, deleteTransaction, updateTransaction, updateTransactionAdmin, getDetailTransaction } = require('../controller/transaction');

// Middlewares
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Route User
router.post('/user', addUsers);
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

// Controller Auth
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

// Controller Product
router.get('/products', auth, getProducts);
router.get('/product/:id', auth, getProduct);
router.get('/product-admin/:id', auth, getProductAdmin);
router.post('/product', auth, uploadFile('image'), addProduct);
router.patch('/product/:id', auth, uploadFile('image'), updateProduct);
router.delete('/product/:id', auth, deleteProduct);

// Controller Cart
router.get('/carts', auth, getCart);
router.post('/cart', auth, addCart);
router.patch('/cart/:id', auth, updateCart);
router.delete('/cart/:id', auth, deleteCart);

// Controller Cart
router.get('/transactions', auth, getTransactions);
router.get('/transaction', auth, getTransaction);
router.get('/transaction/:id', auth, getDetailTransaction);

router.post('/transaction', auth, addTransaction);
router.patch('/transaction/:id', auth, uploadFile('attechment'), updateTransaction);
router.patch('/transaction-admin/:id', auth, updateTransactionAdmin);
router.delete('/transaction/:id', auth, deleteTransaction);

module.exports = router;
