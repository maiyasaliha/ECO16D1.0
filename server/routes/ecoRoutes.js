const express = require('express');
const ecoController = require('../controllers/ecoController');

const router = express.Router();

router.get('/1stcol', ecoController.get1stcol);
router.get('/2ndcol', ecoController.get2ndcol);
router.get('/3rdcol', ecoController.get3rdcol);
router.get('/4thcol', ecoController.get4thcol);
router.get('/5thcol', ecoController.get5thcol);
router.get('/6thcol', ecoController.get6thCol);
router.get('/7thcol', ecoController.get7thcol);
router.get('/9thcol', ecoController.get9thcol);
router.get('/10thcol', ecoController.get10thcol);
router.get('/11thcol', ecoController.get11thcol);
router.get('/12thcol', ecoController.get12thcol);

module.exports = router;