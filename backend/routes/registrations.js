const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { eventId } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existingRegistration = await Registration.findOne({
            user: req.user.id,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "Already registered for this event"
            });
        }

        const registration = new Registration({
            user: req.user.id,
            event: eventId
        });

        const savedRegistration = await registration.save();

        res.status(201).json({
            message: "Event registration successful",
            registration: savedRegistration
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

// View logged-in user's registrations
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const registrations = await Registration.find({
            user: req.user.id
        })
            .populate("event")
            .populate("user", "name email");

        res.status(200).json(registrations);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching registrations",
            error: error.message
        });
    }
});
module.exports = router;