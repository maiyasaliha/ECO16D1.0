const express = require('express');
const ecoController = require('../controllers/ecoController');

const router = express.Router();

router.get('/nonCompliant', ecoController.get1strow);
router.get('/locked', ecoController.get2ndrow);

module.exports = router;