const express = require('express');
const router = express.Router();
const sustainabilityController = require('../controllers/sustainabilityController');

router.post('/sync', sustainabilityController.syncData);
router.get('/data', sustainabilityController.getAllData);
router.get('/data/latest', sustainabilityController.getLatestData);

module.exports = router;

