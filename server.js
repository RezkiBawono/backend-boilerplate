// Importing required modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const { middlewareLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

// Configuring environment variables
dotenv.config();

// Middleware for logger
app.use(middlewareLogger);

// Middleware for CORS
app.use(cors(corsOptions));

// Middleware for parsing incoming requests with JSON payloads
app.use(express.json());

// Middleware for cookie-parser
app.use(cookieParser());

// Middleware for parsing incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! This is boilerplate backend website");
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
