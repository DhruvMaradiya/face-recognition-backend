const Event = require("../models/Event");
const User = require("../models/User");
const csvParser = require("csv-parser");
const fs = require("fs");
const moment = require('moment-timezone')

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


exports.createEvent = async (req, res) => {
    try {
        let { name, description, startTime, endTime, location, radius, bufferMinutes, creator, registeredStudents } = req.body;
        startTime = moment.utc(startTime).tz("America/Toronto").format("YYYY-MM-DD HH:mm:ss");
        endTime = moment.utc(endTime).tz("America/Toronto").format("YYYY-MM-DD HH:mm:ss");

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


exports.updateEvent = async (req, res) => {
    try {
        const { registeredStudents, ...otherData } = req.body;

        // Convert emails to ObjectIds
        const students = await User.find({ email: { $in: registeredStudents } }, "_id");
        const studentIds = students.map(student => student._id);

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            ...otherData,
            registeredStudents: studentIds,
        }, { new: true });

        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the event before deleting it
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Remove the event from all users' registeredEvents array
        await User.updateMany(
            { registeredEvents: id },
            { $pull: { registeredEvents: id } }
        );

        // Delete the event
        await Event.findByIdAndDelete(id);

        res.json({ message: "Event deleted successfully and removed from users." });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: "Internal server error" });
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
