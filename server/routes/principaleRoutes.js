const express = require('express');
const principaleController = require('../controllers/principaleController');

const router = express.Router();

router.get('/principale', principaleController.getCellRows);
router.get('/principaleQuarter', principaleController.getCellRowsQuarter);
router.post('/principaleCell', principaleController.updateCell);
router.post('/principaleCellQuarter', principaleController.updateCellQuarterly);
router.get('/principaleBmids', principaleController.getAllBMIDs);
router.get('/principaleBmidsId', principaleController.getAllBMIDsId);
router.get('/principaleEmpty', principaleController.getEmptyRows);
router.post('/100principaleRows', principaleController.add100CellRow);
router.post('/principaleEmpty', principaleController.updateCellEmptyRow);
router.get('/search', principaleController.searchKeyword);


module.exports = router;