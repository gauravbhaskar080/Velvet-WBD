const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = "#$ThisIsAWebDevelopmentProjectCreatedUsingMernStack$#"



const Object = require('../models/Object');
const Company = require('../models/Company');
const Customer = require('../models/Customer');
const Bought = require('../models/Bought');
const Admin = require('../models/Admin');
const DiscountCode = require('../models/DiscountCode');
require('dotenv').config();



// Used for Logining In of Admin
router.post('/login',
    body('email').isEmail(),
    body('password', "Password Too Short").isLength({ min: 7 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const comp = await Admin.findOne({ 'username': req.body.email })
        if (!comp) {
            return res.json({ success: false })
        }
        const pwdCompare = await bcrypt.compare(req.body.password, comp.password);
        if (!pwdCompare) {
            return res.json({ success: false })
        }
        const data = {
            user: {
                id: comp._id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    })

// Used for fetching Data To Be Displayed On Admin Home Page 
router.post('/home',
    async (req, res) => {
        const comp = await Company.find();
        const ad = await Admin.findOne();
        const cust = await Customer.find();
        const s = await Bought.find().populate('product');
        const dc = await DiscountCode.find();
        const obj = await Object.find();
        const b = comp;
        const sortByTotalBusinessDesc = (a, b) => b.totalbusiness - a.totalbusiness;
        const sortByTotalBusinessMin = (a, b) => a.totalbusiness - b.totalbusiness;
        const sortByQuantitySoldDesc = (a, b) => {
            if (b.quantitySold - a.quantitySold) return b.quantitySold - a.quantitySold
            const r1 = new Date(a.registered);
            const r2 = new Date(b.registered);
            return r2 > r1
        }
        b.sort(sortByTotalBusinessDesc)
        const arr = [b[0]];
        let i = 1;
        while (b[i].totalbusiness === b[i - 1].totalbusiness) {
            arr.push(b[i]);
            i++;
        }
        const c = comp;
        c.sort(sortByTotalBusinessMin);
        const brr = [c[0]];
        i = 1;
        while (b[i].totalbusiness === c[i - 1].totalbusiness) {
            brr.push(c[i]);
            i++;
        }
        const d = obj;
        d.sort(sortByQuantitySoldDesc);
        return res.json({ success: true, company: comp, admin: ad, customer: cust, sales: s, discountcode: dc, mostSeller: arr, leastSeller: brr, bestSeller: d[0], worstSeller: d[d.length - 1] });
    })

// Used For Fetching Data Of All Customers From Admin Page
router.post('/allcustomers',
    async (req, res) => {
        const cust = await Customer.find();
        return res.json({ success: true, customers: cust })
    })

// Used For Fetching All The Data Of All Companies On The Admin Dashboard 
router.post('/allcompanies',
    async (req, res) => {
        const comp = await Company.find();
        return res.json({ success: true, company: comp });
    })

// Used for Displaying All The Data Of Deliveries On The Admin 
router.post('/deliveries',
    async (req, res) => {
        const del = await Bought.find().populate('product');
        return res.json({ success: true, delivery: del })
    })

// Used for adding a new discount code
router.post('/discountcode', async (req, res) => {
    if (req.body.code === "" || req.body.discountpercent <= 2) return res.json({ success: false, message: "Create a valid code" })
    const code = new DiscountCode();
    code.code = req.body.code
    code.discountpercent = req.body.discountpercent
    code.to = req.body.to;
    await code.save();
    return res.json({ success: true, code: code })
})

// Used for deleting a discount code
router.post('/deletediscountcode', async (req, res) => {
    await DiscountCode.findOneAndDelete(req.body.id)
    const dc = await DiscountCode.find();
    return res.json({ success: true, dc: dc });
})

// Used for marking the product to be delivered 
router.post('/delivered', async (req, res) => {
    const b = await Bought.findOne({ _id: req.body.id });
    b.status = "Delivered"
    b.deliveryDate = new Date();
    await b.save();
    // console.log(b)
    return res.json({ success: true })
})


module.exports = router;