// routes/customerRoutes.js
const express = require('express');
const app = express();
const cors = require('cors'); 
const router = express.Router();
const customerController = require('../controllers/customerController');
const morgan = require("morgan");
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
app.use(cors()); 

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/"); // Set your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
router.use(morgan('combined', { stream: accessLogStream }));

router.post('/login', morgan('combined'), customerController.login);

router.post('/signup', morgan('combined'), customerController.signup);


router.post('/home', customerController.home);
router.post('/showallcat', customerController.showallcat);
router.post('/showallsubcat', customerController.showallsubcat);
router.post('/productdetails', customerController.productdetails);
router.post('/placeorder', customerController.placeorder);
router.post('/addtocart', customerController.addtocart);
router.post('/cartdetails', customerController.cartdetails);
router.post('/deleteElementFromCart', customerController.deleteElementFromCart);
router.post('/validcode', customerController.validcode);
router.post('/pinfo', customerController.pinfo);
router.post(
  "/customerProfile/upload/:username",
  upload.single("file"),
  customerController.updateProfilePicture
);


module.exports = router;
