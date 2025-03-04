const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.get('/students/email/:email', studentController.getStudentByEmail);
router.post('/students/register-to-event', studentController.registerStudentToEvent);
router.post('/students/remove-from-event', studentController.removeStudentFromEvent);


module.exports = router;
