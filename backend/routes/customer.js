const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const jwtSecret = "#$ThisIsAWebDevelopmentProjectCreatedUsingMernStack$#"



const Object = require('../models/Object');
const Company = require('../models/Company');
const Customer = require('../models/Customer');
const Cart = require('../models/Cart');
const Bought = require('../models/Bought');
const Admin = require('../models/Admin');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const DiscountCode = require('../models/DiscountCode');
const HomeObjects = require('../models/HomeObjects');
require('dotenv').config();



const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
router.use(morgan('combined', { stream: accessLogStream }));

// Route used for Customer Login
router.post('/login',
    morgan('combined'),
    body('username').isEmail(),
    body('password', "Password Too Short").isLength({ min: 7 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const cust = await Customer.findOne({ username: username });
        if (!cust) {
            return res.json({ success: false, message: "User Not Found" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password, cust.password);
        if (!pwdCompare) {
            return res.json({ success: false, message: "Password Not Matched" })
        }
        const data = {
            user: {
                id: cust._id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    })

// Route Used for Customer SignUp 
router.post('/signup',
    morgan('combined'),
    body('username').isEmail(),
    body('password', "Password Too Short").isLength({ min: 7 }),
    body('fullname').isLength({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
        const v = await Customer.findOne({ 'username': req.body.email });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (v) {
            return res.json({ errors: "Email already used" });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            const cust = new Customer(req.body);
            cust.password = secPassword;
            await cust.save();
            res.json({ success: true })
        } catch (err) {
            console.log(err);
            console.log(req.body);
            res.json({ success: false });
        }
    }
)

// Route for fetching all the products to displayed on the home page
router.post('/home',
    async (req, res) => {
        const home = await HomeObjects.find().populate('products');
        return res.json({ success: true, objects: home })
    })

// Route For Fetching The Details To Be Shown On Category Page 
router.post('/showallcat',
    async (req, res) => {
        const id = req.body.id;
        const cat = await Category.findById(id);
        const subcats = await SubCategory.find({ "category": cat.title })
        return res.json({ success: true, category: cat, subcategory: subcats })
    })

// Route For Fetching All Products Of A Particular Type 
router.post('/showallsubcat',
    async (req, res) => {
        const id = req.body.id;
        const subcat = await SubCategory.findById(id);
        const allprod = await Object.find({ "category": subcat.title })
        return res.json({ success: true, subcategory: subcat, allitems: allprod });
    })

// Used To Display the products Details And Also For Generating Bills
router.post('/productdetails',
    async (req, res) => {
        const obj = await Object.findById(req.body.oid);
        return res.json({ success: true, object: obj });
    })

// Used For Placing Order 
router.post('/placeorder',
    async (req, res) => {
        const obj = await Object.findById(req.body.id);
        const discount = parseInt(req.body.discount)
        const cust = await Customer.findOne({ username: req.body.username })
        if (obj.quantity < req.body.quantity) {
            return res.json({ status: false, message: "Quantity Available is less than the requested amount!!" })
        }
        const comp = await Company.findOne({ username: obj.companyusername })
        const admin = await Admin.findOne()
        const qty = parseInt(req.body.quantity)
        const placeorder = new Bought();
        placeorder.username = req.body.username
        placeorder.product = obj
        placeorder.quantity = qty
        placeorder.orderDate = new Date()
        placeorder.status = "Pending"
        placeorder.deliveryDate = new Date(placeorder.orderDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        placeorder.companyName = comp.username
        placeorder.discount = discount
        obj.quantity -= req.body.quantity
        placeorder.couponcode = req.body.couponcode
        comp.totalbusiness += Math.floor(qty * obj.price * (100 - obj.margin) / 100);
        admin.totalBusiness += Math.floor(qty * obj.price * (100 - discount) / 100);
        admin.totalProfit += (Math.floor(qty * obj.price * (100 - discount) / 100) - Math.floor(qty * obj.price * (100 - obj.margin) / 100));
        if (obj.quantity < 15) {
            comp.productsquantityEnding.push(obj);
        }
        cust.totalBusiness += Math.floor(qty * obj.price * (100 - discount) / 100)
        // console.log(comp)
        await cust.save();
        await admin.save();
        await comp.save();
        await obj.save();
        await placeorder.save()
        return res.json({ status: true, orderId: placeorder._id })
    })

// Used For Adding Element To Cart 
router.post('/addtocart',
    async (req, res) => {
        const v = await Cart.findOne({ username: req.body.username });
        const obj = await Object.findById(req.body.id);
        if (!v) {
            const c = new Cart();
            c.username = req.body.username;
            c.product = new Array();
            c.product.push(obj);
            await c.save();
            return res.json({ success: true, cartId: c._id });
        } else {
            if (v.product.includes(obj._id)) {
                return res.json({ success: false, message: "Already Product in Cart" })
            } else {
                v.product.push(obj);
                await v.save();
                return res.json({ success: true, cartId: v._id })
            }
        }
    })

// Used For Fetching Data To be shown on the My Cart Page 
router.post('/cartdetails',
    async (req, res) => {
        const ca = await Cart.findOne({ username: req.body.username }).populate('product');
        if (!ca) {
            return res.json({ success: false, message: "The Cart Is Empty" })
        } else {
            return res.json({ success: true, ca: ca })
        }
    })

// Used for Deleting a specific product from a particular item from cart 
router.post('/deleteElementFromCart',
    async (req, res) => {
        const ca = await Cart.findOne({ username: req.body.username });
        const arr = ca.product;
        const ind = arr.indexOf(req.body.idToRemove);
        if (ind !== -1) {
            arr.splice(ind, 1);
        }
        ca.product = arr;
        await ca.save();
        return res.json({ success: true })
    })

// Used for Fetching valid code or not 
router.post('/validcode',
    async (req, res) => {
        const dc = await DiscountCode.findOne({ code: req.body.code });
        if (!dc) {
            return res.json({ success: false, message: "The Code Entered Is Invalid" })
        }
        if (dc.to.length > 0 && dc.to[0] === 'ALL') {
            return res.json({ success: true, discountpercent: dc.discountpercent, message: `Congratulations You Claimed a discount of ${dc.discountpercent}%` })
        }
        if (dc.to.length > 0) {
            if (dc.to.includes(req.body.username)) {
                return res.json({ success: true, discountpercent: dc.discountpercent, message: `Congratulations You Claimed a discount of ${dc.discountpercent}%` })
            } else {
                return res.json({ success: false, message: "The Code Entered Is Not Available For You" })
            }
        }
        return res.json({ success: false, message: "Invalid Expired, Try Other Code" })
    })

// Used For Fetching Personal Information Of The Users 
router.post('/pinfo',
    async (req, res) => {
        const cust = await Customer.findOne({ username: req.body.username })
        const b = await Bought.find({ username: req.body.username }).populate('product')
        return res.json({ success: true, customer: cust, bought: b })
    })

    
module.exports = router;