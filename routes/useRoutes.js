const express = require('express');
const { working, getItem, getPricing, getOrganizations, calculateTotalPrice } = require('../controller/useController');
const router = express.Router();

//Get All Items
router.get('/items', getItem);

//Get All Pricing List
router.get('/pricing', getPricing);

//Get All Organizations
router.get('/organization', getOrganizations);


//Calculate Total Price
router.post('/calculate', calculateTotalPrice)


module.exports = router;