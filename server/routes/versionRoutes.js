const express = require('express');
const versionController = require('../controllers/versionController');

const router = express.Router();

router.post('/version', versionController.saveVersion);
router.get('/versions', versionController.getAllVersions);

module.exports = router;