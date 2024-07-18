const express = require('express');
const principaleController = require('../controllers/principaleController');

const router = express.Router();

router.get('/principale', principaleController.getCellRows);
router.get('/principaleQuarter', principaleController.getCellRowsQuarter);
router.post('/principaleCell', principaleController.updateCell);
router.post('/principaleCellQuarter', principaleController.updateCellQuarterly);
router.get('/principaleBmids', principaleController.getAllBMIDs);
router.get('/principaleBmidsId', principaleController.getAllBMIDsId);
router.post('/1000principaleRows', principaleController.add1000CellRow);


module.exports = router;