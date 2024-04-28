const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = "#$ThisIsAWebDevelopmentProjectCreatedUsingMernStack$#"



const Object = require('../models/Object');
const Company = require('../models/Company');
const Bought = require('../models/Bought');
const SubCategory = require('../models/SubCategory');
require('dotenv').config();


// Company Login Route 
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const comp = await Company.findOne({ 'email': req.body.email })
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

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Used for creating A new Company 
const createcomp = async (req, res) => {
    try {
        const errors = validationResult(req);
    const v = await Company.findOne({ 'email': req.body.email });
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (v) {
        return res.json({ errors: "Email already used" });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const comp = new Company();
        comp.email = req.body.email
        comp.username = req.body.email
        comp.companyname = req.body.companyname
        comp.password = secPassword
        comp.totalbusiness = 0
        await comp.save();
        res.json({ success: true })
    } catch (err) {
        console.log(err);
        console.log(req.body);
        res.json({ success: false });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Company Home Page Details Display 
const home = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Logout And Login Again To Continue" });
        }
        const comp = await Company.findOne({ 'email': req.body.email }).populate('productsquantityEnding');
        const sold = await Bought.find({ companyName: req.body.email }).populate('product');
        return res.json({ success: true, company: comp, sold: sold });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Route For Adding A New Product 
const addnewprod = async (req, res) => {
    try {
        const obj = new Object();
        obj.title = req.body.title,
            obj.description = req.body.description,
            obj.price = req.body.price,
            obj.quantity = req.body.quantity,
            obj.category = req.body.subcategory,
            obj.companyusername = req.body.companyusername,
            obj.margin = 20
        obj.registered = new Date();
        obj.features = new Map();
        obj.quantitySold = 0;
        const n = req.body.images.length;
        for (let i = 0; i < n; i++) {
            obj.images.push(req.body.images[i]);
        }
        const p = req.body.key_points.length;
        for (let i = 0; i < p; i++) {
            obj.key_points.push(req.body.key_points[i]);
        }
        const k = req.body.features_keys.length;
        var keys = req.body.features_keys;
        var values = req.body.features_values;
        const subcat = await SubCategory.findOne({ title: req.body.subcategory });
        // console.log(req.body.subcategory)
        if (subcat.filters.has("No Filter")) {
            subcat.filters.set("No Filter", undefined);
        }
        for (let i = 0; i < k; i++) {
            if (subcat.filters.has(keys[i])) {
                const arr = subcat.filters.get(keys[i]);
                if (!arr.includes(values[i])) {
                    arr.push(values[i]);
                    subcat.filters.set(keys[i], arr);
                }
            } else {
                subcat.filters.set(keys[i], [values[i]]);
            }
            obj.features.set(keys[i], values[i])
        }
        await subcat.save();
        await obj.save();
        return res.json({ success: true, _id: obj._id });
    } catch (err) {
        console.log(err)
        return res.json({ success: false, error: err });
    }
};

// Used for displaying all products registered by any company 
const showallprods = async (req, res) => {
    try {
        const obj = await Object.find({ companyusername: req.body.email });
        return res.json({ success: true, objects: obj })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    login,
    createcomp,
    home,
    addnewprod,
    showallprods,
};