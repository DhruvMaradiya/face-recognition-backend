const User = require('../models/User'); // Import User model

// Get all students with full attributes
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }); // Fetch all attributes
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a single student's full details
// Get a single student's full details with event names
exports.getStudentById = async (req, res) => {
    try {
      const student = await User.findById(req.params.id)
        .populate("registeredEvents", "name startTime endTime"); // Only get event name, startTime, and endTime
  
      if (!student) return res.status(404).json({ error: "Student not found" });
  
      res.status(200).json(student);
    } catch (error) {
      console.error("Error fetching student details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  