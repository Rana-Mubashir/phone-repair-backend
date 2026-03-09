const express = require('express');
const addressRouter = express.Router();

const {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  toggleAddressStatus,
  getActiveAddresses,
} = require('../controllers/shopAddresses');

// Get all active addresses
addressRouter.get('/active', getActiveAddresses);

// Routes for root "/"
addressRouter
  .route('/')
  .get(getAddresses)
  .post(createAddress);

// Routes for "/:id"
addressRouter
  .route('/:id')
  .get(getAddressById)
  .put(updateAddress)
  .delete(deleteAddress);

// Toggle address status
addressRouter.patch('/:id/toggle', toggleAddressStatus);

module.exports = addressRouter;
