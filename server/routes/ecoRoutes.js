const express = require('express');
const ecoController = require('../controllers/ecoController');

const router = express.Router();

router.get('/eco', ecoController.getColumns);

module.exports = router;