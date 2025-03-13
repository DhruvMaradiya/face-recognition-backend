const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const adminController = require('../controllers/adminController');

// Student routes
router.post('/mark-attendance', attendanceController.markAttendance);

// Admin routes
router.get('/report', adminController.generateReport);
router.patch('/modify-attendance', adminController.modifyAttendance);
router.get('/attendance/report', attendanceController.generateAttendanceReport);


module.exports = router;

