// routes/customerRoutes.js
const express = require('express');
const app = express();
const cors = require('cors'); 
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const morgan = require("morgan");
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
app.use(cors()); 

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
router.use(morgan('combined', { stream: accessLogStream }));

router.post('/login', morgan('combined'), sellerController.login);
router.post('/createcomp', morgan('combined'), sellerController.createcomp);
router.post('/home', sellerController.home);
router.post('/addnewprod', sellerController.addnewprod);
router.post('/showallprods', sellerController.showallprods);

module.exports = router;
