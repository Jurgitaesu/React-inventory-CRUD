const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');
const validateInputs = require('../middleware/validateInputs');

router.post('/add', validateInputs, controller.addInventory);
router.get('/show', controller.showInventory);
router.get('/reduce/:id', controller.reduceQuantity);
router.get('/add/:id', controller.addQuantity);
router.get('/delete/:id', controller.deleteInventory);

module.exports = router;