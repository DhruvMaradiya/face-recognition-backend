const User = require('../models/User'); // Import User model

const Event = require("../models/Event");
//! without paginations
// // Get all students with full attributes
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await User.find({ role: 'student' }); // Fetch all attributes
//     res.status(200).json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// With pagination

// Get paginated students
//! Working
// exports.getAllStudents = async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1;  // Default page 1
//       const limit = parseInt(req.query.limit) || 10;  // Default limit 10
//       const skip = (page - 1) * limit;
  
//       // Get total students count
//       const totalStudents = await User.countDocuments({ role: "student" });
  
//       // Fetch paginated students
//       const students = await User.find({ role: "student" })
//         .select("fullName email studentId")
//         .skip(skip)
//         .limit(limit);
  
//       res.status(200).json({
//         students,
//         totalStudents,
//         totalPages: Math.ceil(totalStudents / limit),
//         currentPage: page,
//       });
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   };
  

//! New one with search
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Default page 1
    const limit = parseInt(req.query.limit) || 10;  // Default limit 10
    const skip = (page - 1) * limit;
    const search = req.query.search || ''; // Search query

    // Create a search query that matches fullName or email (case-insensitive)
    const searchQuery = search 
      ? { 
          role: "student", 
          $or: [
            { fullName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { studentId: { $regex: search, $options: 'i' } }
          ]
        }
      : { role: "student" };

    // Get total students count based on search
    const totalStudents = await User.countDocuments(searchQuery);

    // Fetch paginated students with search
    const students = await User.find(searchQuery)
      .select("fullName email studentId")
      .skip(skip)
      .limit(limit)
      .sort({ fullName: 1 }); // Optional: sort alphabetically

    res.status(200).json({
      students,
      totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: page,
      searchQuery: search
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  
exports.getStudentByEmail = async (req, res) => {
    const student = await User.findOne({ email: req.params.email, role: 'student' });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
};


exports.registerStudentToEvent = async (req, res) => {
  const { email, eventId } = req.body;
  console.log("Incoming Request: ", { email, eventId });   // <-- Log to confirm payload

  try {
      const student = await User.findOne({ email, role: 'student' });
      if (!student) {
          return res.status(404).json({ error: "Student not found" });
      }

      if (!student.registeredEvents.includes(eventId)) {
          student.registeredEvents.push(eventId);
          await student.save();
      }

      res.json({ message: "Student successfully registered to event." });
  } catch (error) {
      console.error("Error registering student to event:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};




exports.removeStudentFromEvent = async (req, res) => {
    const { email, eventId } = req.body;

    console.log(`Processing removal of ${email} from event ${eventId}`);

    try {
        const student = await User.findOne({ email, role: 'student' });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        console.log(`Student found: ${student.fullName}`);

        // Remove event from student's registeredEvents array
        student.registeredEvents = student.registeredEvents.filter(event => event.toString() !== eventId);
        await student.save();
        console.log(`Event removed from student's registeredEvents`);

        // Remove student from event's registeredStudents array
        await Event.findByIdAndUpdate(eventId, {
            $pull: { registeredStudents: student._id }
        });

        console.log(`Student removed from event's registeredStudents`);
        res.json({ message: "Student removed successfully from event." });
    } catch (error) {
        console.error("Error removing student from event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
