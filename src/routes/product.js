const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const multiUpload = require('../middleware/productUpload');

const {
  getAllProducts,
  getProducts,
  filteredProducts,
  filteredPaginationProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteproduct,
  updateProductStatus,
  updateProductSoldStatus,
  cloneProduct,
} = require('../controller/product');

router.post('/alls', getAllProducts);
router.get('/all', getProducts);
router.post('/filtered', filteredProducts);
router.post('/filtered-limit', filteredPaginationProducts);
router.get('/:id', getProduct);
router.post('/add', auth, multiUpload, createProduct);
router.patch('/edit', auth, multiUpload, editProduct);
router.delete('/:id', auth, deleteproduct);
router.post('/status', auth, updateProductStatus);
router.post('/is-sold', auth, updateProductSoldStatus);
router.post('/clone', auth, cloneProduct);

module.exports = router;
