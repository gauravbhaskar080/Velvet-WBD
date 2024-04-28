const express = require('express');
const app = express();
const cors = require('cors'); 
const router = express.Router();
const adminController = require('../controllers/adminController');
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
app.use(cors()); 

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
router.use(morgan('combined', { stream: accessLogStream }));

router.post('/login', morgan('combined'), adminController.login);
router.post('/home', adminController.home);
router.post('/allcustomers', adminController.allcustomers);
router.post('/allcompanies',adminController.allcompanies);
router.post('/deliveries',adminController.deliveries);
router.post('/discountcode',adminController.discountcode);
router.post('/deletediscountcode',adminController.deletediscountcode);
router.post('/delivered',adminController.delivered);

module.exports = router;
