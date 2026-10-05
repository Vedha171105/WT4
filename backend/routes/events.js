const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching events",
            error: error.message
        });
    }
});

// POST a new event
router.post("/", authMiddleware, async (req, res) => {
    try {
        const event = new Event(req.body);
        const savedEvent = await event.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({
            message: "Error creating event",
            error: error.message
        });
    }
});

// UPDATE an event
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({
            message: "Error updating event",
            error: error.message
        });
    }
});

// DELETE an event
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            event: deletedEvent
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting event",
            error: error.message
        });
    }
});

module.exports = router;