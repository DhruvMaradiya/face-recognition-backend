const Event = require("../models/Event");
const User = require("../models/User");
const csvParser = require("csv-parser");
const fs = require("fs");

// ✅ Helper Function: Parse CSV File
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        let emails = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                if (row.email) emails.push(row.email.trim());
            })
            .on("end", () => resolve(emails))
            .on("error", (error) => reject(error));
    });
};

// ✅ Create Event
// exports.createEvent = async (req, res) => {
//     try {
//         const { name, description, startTime, endTime, latitude, longitude, radius, bufferMinutes, creator } = req.body;
//         const location = { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] };

//         let registeredStudents = [];

//         if (req.file) {
//             const filePath = req.file.path;
//             const emails = await parseCSV(filePath);
//             const students = await User.find({ email: { $in: emails } }).select("_id");
//             registeredStudents = students.map(student => student._id);
//             fs.unlinkSync(filePath); // Delete temporary file
//         }

//         const newEvent = new Event({ name, description, startTime, endTime, location, radius, bufferMinutes, creator, registeredStudents });
//         await newEvent.save();

//         res.status(201).json({ message: "Event created successfully", event: newEvent });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// exports.createEvent = async (req, res) => {
//     try {
//         let { name, description, startTime, endTime, location, radius, bufferMinutes, creator, registeredStudents } = req.body;

//         // Convert creator email to ObjectId
//         const creatorUser = await User.findOne({ email: creator });
//         if (!creatorUser) {
//             return res.status(400).json({ error: "Creator email not found" });
//         }

//         // Convert student emails to ObjectIds
//         const students = await User.find({ email: { $in: registeredStudents } }, "_id");
//         if (students.length !== registeredStudents.length) {
//             return res.status(400).json({ error: "One or more student emails not found" });
//         }

//         // Extract ObjectIds
//         const studentIds = students.map(student => student._id);

//         // Ensure location coordinates are numbers
//         if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
//             return res.status(400).json({ error: "Invalid location coordinates format" });
//         }

//         const newEvent = new Event({
//             name,
//             description,
//             startTime,
//             endTime,
//             location,
//             radius,
//             bufferMinutes,
//             creator: creatorUser._id, // Store as ObjectId
//             registeredStudents: studentIds
//         });

//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


exports.createEvent = async (req, res) => {
    try {
        let { name, description, startTime, endTime, location, radius, bufferMinutes, creator, registeredStudents } = req.body;

        // Convert creator email to ObjectId
        const creatorUser = await User.findOne({ email: creator });
        if (!creatorUser) {
            return res.status(400).json({ error: "Creator email not found" });
        }

        // Convert student emails to ObjectIds
        const students = await User.find({ email: { $in: registeredStudents } }, "_id");
        if (students.length !== registeredStudents.length) {
            return res.status(400).json({ error: "One or more student emails not found" });
        }

        // Extract ObjectIds
        const studentIds = students.map(student => student._id);

        // Ensure location coordinates are numbers
        if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
            return res.status(400).json({ error: "Invalid location coordinates format" });
        }

        // Create the event
        const newEvent = new Event({
            name,
            description,
            startTime,
            endTime,
            location,
            radius,
            bufferMinutes,
            creator: creatorUser._id, // Store as ObjectId
            registeredStudents: studentIds
        });

        await newEvent.save();

        // ✅ Update `registeredEvents` for each student
        await User.updateMany(
            { _id: { $in: studentIds } }, 
            { $push: { registeredEvents: newEvent._id } } // Push event ID to registeredEvents array
        );

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// ✅ Get Event Details
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("creator", "fullName email")
            .populate("registeredStudents", "email");

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Edit Event
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) return res.status(404).json({ message: "Event not found" });

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Events (Categorized)
exports.getAllEvents = async (req, res) => {
    try {
        const currentTime = new Date();
        const events = await Event.find();

        const ongoing = events.filter(event => currentTime >= new Date(event.startTime) && currentTime <= new Date(event.endTime));
        const upcoming = events.filter(event => currentTime < new Date(event.startTime));
        const past = events.filter(event => currentTime > new Date(event.endTime));

        res.json({ ongoing, upcoming, past });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
