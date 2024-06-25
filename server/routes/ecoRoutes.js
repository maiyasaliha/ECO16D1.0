const express = require('express');
const ecoController = require('../controllers/ecoController');

const router = express.Router();

router.get('/eco', ecoController.getCellRows);


module.exports = router;