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
  bulkUpdateStatus,
  bulkUpdateSoldStatus,
  cloneProduct,
  getEndpointsByCategory, 
  getMappingProducts,
  updateInputtedStatus,
  updateCekatStatus,
  generateAllMissingCodes,
  getProductsByCategory,
  getCategoryEndpoints,
} = require('../controller/product');

router.post('/alls', getAllProducts);
router.get('/all', getProducts);
router.post('/filtered', filteredProducts);
router.post('/filtered-limit', filteredPaginationProducts);
router.get('/export-endpoints', getEndpointsByCategory);
router.get('/category-endpoints', getCategoryEndpoints);
router.get('/category/:id', getProductsByCategory);
router.get('/:id', getProduct);
router.post('/add', auth, multiUpload, createProduct);
router.patch('/edit', auth, multiUpload, editProduct);
router.delete('/:id', auth, deleteproduct);
router.post('/status', auth, updateProductStatus);
router.post('/is-sold', auth, updateProductSoldStatus);
router.post('/bulk-status', auth, bulkUpdateStatus);
router.post('/bulk-sold', auth, bulkUpdateSoldStatus);
router.post('/clone', auth, cloneProduct);
router.post('/mapping', auth, getMappingProducts);
router.patch('/inputted', auth, updateInputtedStatus);
router.patch('/cekat', auth, updateCekatStatus);
router.post('/generate-all-codes', auth, generateAllMissingCodes);
router.get('/category-endpoints', getCategoryEndpoints);
router.get('/category/:id', getProductsByCategory);
module.exports = router;
