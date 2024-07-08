const express = require('express');
const editHistoryController = require('../controllers/editHistoryController');

const router = express.Router();

router.get('/editHistory', editHistoryController.getEditHistory);
router.post('/editHistory', editHistoryController.createEditHistory);

module.exports = router;