const express = require('express');
const principaleController = require('../controllers/principaleController');

const router = express.Router();

router.get('/principale', principaleController.getCellRows);
router.get('/principaleQuarter', principaleController.getCellRowsQuarter);
router.post('/principaleCell', principaleController.updateCell);
router.get('/principaleBmids', principaleController.getAllBMIDs);



module.exports = router;