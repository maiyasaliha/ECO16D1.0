const express = require('express');
const ecoController = require('../controllers/ecoController');

const router = express.Router();

router.get('/1stcol', ecoController.get1stcol);
router.get('/2ndcol', ecoController.get2ndcol);
router.get('/3rdcol', ecoController.get3rdcol);
router.get('/4thcol', ecoController.get4thcol);
router.get('/5thcol', ecoController.get5thcol);
router.get('/6thcol', ecoController.get6thCol);

module.exports = router;