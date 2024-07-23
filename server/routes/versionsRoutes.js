const express = require('express');
const versionsController = require('../controllers/versionsController');

const router = express.Router();

router.post('/versions', versionsController.createVersion);
router.get('/versions', versionsController.getVersions);

module.exports = router;