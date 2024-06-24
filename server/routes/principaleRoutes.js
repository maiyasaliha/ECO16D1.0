const express = require('express');
const principaleController = require('../controllers/principaleController');

const router = express.Router();

router.get('/principale', principaleController.getCellRows);
router.post('/principaleCell', principaleController.updateCell);


module.exports = router;