// Import required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

// Import routes
const adminRoute = require("./routes/adminRoutes");
const sellerRoute = require("./routes/sellerRoutes");
const customerRoute = require("./routes/customerRoutes");
const stripeRouter = require("./routes/stripe");

// Configure CORS
const corsOptions = {
  origin: ["https://velvet-wbd.vercel.app", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Load environment variables
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for the root endpoint
app.get("/", (req, res) => {
  res.send("velvet Homes backend sent this file");
});

// Middleware for logging requests
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

// Route handlers
app.use("/velvethomes/customer", customerRoute);
app.use("/velvethomes/admin", adminRoute);
app.use("/velvethomes/seller", sellerRoute);

// Use the Stripe router
app.use("/stripe", stripeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
