const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const Customer = require("./models/Customer");
const adminRoute = require("./routes/adminRoutes");
const sellerRoute = require("./routes/sellerRoutes");
const customerRoute = require("./routes/customerRoutes");

const corsOptions = {
  origin: ["https://velvet-wbd.vercel.app", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("velvet Homes backend sent this file");
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

// Uncomment the image upload route handlers if necessary

app.use("/velvethomes/customer", customerRoute);
app.use("/velvethomes/admin", adminRoute);
app.use("/velvethomes/seller", sellerRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
