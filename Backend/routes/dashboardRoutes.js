const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/report', dashboardController.generateReport);

module.exports = router;