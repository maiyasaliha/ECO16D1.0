const express = require('express');
const colisController = require('../controllers/colisController');

const router = express.Router();

router.get('/colis', colisController.getCellRows);
router.post('/newColis', colisController.postCellRow);
router.post('/colisCell', colisController.updateCell);
router.get('/colisBmids', colisController.getAllBMIDs);

module.exports = router;