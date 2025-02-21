const express = require("express");
const multer = require("multer");
const {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    getAllEvents
} = require("../controllers/eventController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Create Event (with CSV parsing)
router.post("/admin/createevent", upload.single("csvFile"), createEvent);

// ✅ Get Event Details
router.get("/admin/event/:id", getEvent);

// ✅ Edit Event
router.put("/admin/event/:id", updateEvent);

// ✅ Delete Event
router.delete("/admin/event/:id", deleteEvent);

// ✅ Get All Events (Categorized)
router.get("/admin/events", getAllEvents);

module.exports = router;
