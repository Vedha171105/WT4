const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const registrationRoutes = require("./routes/registrations");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Event routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);

// 404 middleware
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong",
        error: err.message
    });
});

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "TechFest 2026 API is running"
    });
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
