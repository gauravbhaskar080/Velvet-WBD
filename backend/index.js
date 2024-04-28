const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const Customer = require("./models/Customer");
const multer = require("multer");
const adminRoute = require("./routes/adminRoutes");
const sellerRoute = require("./routes/sellerRoutes");
const customerRoute = require("./routes/customerRoutes");

// app.use(helmet());

const corsOptions = {
  origin: ["https://velvet-wbd.vercel.app", "http://localhost:3000"], // Add your frontend URL(s) here
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-control-Allow-Headers",
    "origin, x-Requested-with, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("velvet Homes backend sent this file");
});

//morgan

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

//route to upload the Image

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const uplaod = multer({ storage: storage });
// app.post(
//   "/customerProfile/upload/:username",
//   uplaod.single("file"),
//   async (req, res) => {
//     console.log(req.file);
//     try {
//       const username = req.params.username;
//       const imageName = req.file.originalname;
//       const user = await Customer.findOne({ username: username });
//       if (username) {
//         try {
//           const response = await Customer.findByIdAndUpdate(user._id, {
//             $set: { photo: imageName },
//           });
//           console.log(response);
//           res.status(200).json("image uploaded");
//         } catch (error) {
//           res.status(401).send("Error in updating the profile picture");
//         }
//       } else {
//         res.status(404).json("User does not exist");
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// // Access the image
// app.use(
//   "/customerProfile/images",
//   express.static(path.join(__dirname, "/public/images"))
// );

app.use("/velvethomes/customer", customerRoute);
app.use("/velvethomes/admin", adminRoute);
app.use("/velvethomes/seller", sellerRoute);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
