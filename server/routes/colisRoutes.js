const express = require('express');
const colisController = require('../controllers/colisController');

const router = express.Router();

router.get('/colis', colisController.getCellRows);
router.get('/colisQuarter', colisController.getCellRowsQuarter);
router.post('/newColis', colisController.postCellRow);
router.post('/colisCell', colisController.updateCell);
router.post('/colisCellQuarter', colisController.updateCellQuarterly);
router.get('/colisBmids', colisController.getAllBMIDs);
router.get('/colisBmidsId', colisController.getAllBMIDsId);
router.get('/colisEmpty', colisController.getEmptyRows);
router.post('/100colisRows', colisController.add100CellRow);
router.get('/searchcolis', colisController.searchKeyword);

module.exports = router;