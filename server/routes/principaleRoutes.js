const express = require('express');
const principaleController = require('../controllers/principaleController');

const router = express.Router();

router.get('/principale', principaleController.getCellRows);
router.get('/principaleQuarter', principaleController.getCellRowsQuarter);
router.post('/principaleCell', principaleController.updateCell);
router.post('/principaleCellQuarter', principaleController.updateCellQuarterly);
router.get('/principaleBmids', principaleController.getAllBMIDs);
router.get('/principaleBmidsQuarter', principaleController.getBMIDEntries);



module.exports = router;