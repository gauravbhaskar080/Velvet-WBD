// controllers/customerController.js
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "#$ThisIsAWebDevelopmentProjectCreatedUsingMernStack$#";

const { uploadOnCloudinary } = require("../middleware/cloudinary.js");

const Object = require("../models/Object");
const Company = require("../models/Company");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const Bought = require("../models/Bought");
const Admin = require("../models/Admin");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const DiscountCode = require("../models/DiscountCode");
const HomeObjects = require("../models/HomeObjects");
const redis = require("redis");
require("dotenv").config();

// const client = redis.createClient();
const client = redis.createClient({
  password: "INYTF7WKBS1GDqmSGQbZeymZMObzm79n",
  socket: {
    host: "redis-19426.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 19426,
  },
});

(async () => {
  await client.connect();
})();

console.log("Attempting to connect to redis");
client.on("connect", () => {
  console.log("Redis Connected");
});

// Route used for Customer Login
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const cust = await Customer.findOne({ username: username });
    if (!cust) {
      return res.json({ success: false, message: "User Not Found" });
    }
    const pwdCompare = await bcrypt.compare(password, cust.password);
    if (!pwdCompare) {
      return res.json({ success: false, message: "Password Not Matched" });
    }
    const data = {
      user: {
        id: cust._id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route Used for Customer SignUp
const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    const v = await Customer.findOne({ username: req.body.email });
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
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      console.log(req.body);
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route for fetching all the products to displayed on the home page
const home = async (req, res) => {
  try {
    const value = await client.get("products");
    if (value != null) {
      const home = JSON.parse(value);
      return res.json({ success: true, objects: home });
    } else {
      const home = await HomeObjects.find().populate("products");
      client.SETEX("products", 3600,JSON.stringify(home))
      return res.json({ success: true, objects: home });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route For Fetching The Details To Be Shown On Category Page
const showallcat = async (req, res) => {
  try {
    const id = req.body.id;
    const cat = await Category.findById(id);
    const subcats = await SubCategory.find({ category: cat.title });
    return res.json({ success: true, category: cat, subcategory: subcats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route For Fetching All Products Of A Particular Type
const showallsubcat = async (req, res) => {
  try {
    const id = req.body.id;
    const subcat = await SubCategory.findById(id);
    const allprod = await Object.find({ category: subcat.title });
    return res.json({ success: true, subcategory: subcat, allitems: allprod });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used To Display the products Details And Also For Generating Bills
const productdetails = async (req, res) => {
  try {
    const obj = await Object.findById(req.body.oid);
    return res.json({ success: true, object: obj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used For Placing Order
const placeorder = async (req, res) => {
  try {
    const obj = await Object.findById(req.body.id);
    const discount = parseInt(req.body.discount);
    const cust = await Customer.findOne({ username: req.body.username });
    if (obj.quantity < req.body.quantity) {
      return res.json({
        status: false,
        message: "Quantity Available is less than the requested amount!!",
      });
    }
    const comp = await Company.findOne({ username: obj.companyusername });
    const admin = await Admin.findOne();
    const qty = parseInt(req.body.quantity);
    const placeorder = new Bought();
    placeorder.username = req.body.username;
    placeorder.product = obj;
    placeorder.quantity = qty;
    placeorder.orderDate = new Date();
    placeorder.status = "Pending";
    placeorder.deliveryDate = new Date(
      placeorder.orderDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    placeorder.companyName = comp.username;
    placeorder.discount = discount;
    obj.quantity -= req.body.quantity;
    placeorder.couponcode = req.body.couponcode;
    comp.totalbusiness += Math.floor(
      (qty * obj.price * (100 - obj.margin)) / 100
    );
    admin.totalBusiness += Math.floor(
      (qty * obj.price * (100 - discount)) / 100
    );
    admin.totalProfit +=
      Math.floor((qty * obj.price * (100 - discount)) / 100) -
      Math.floor((qty * obj.price * (100 - obj.margin)) / 100);
    if (obj.quantity < 15) {
      comp.productsquantityEnding.push(obj);
    }
    cust.totalBusiness += Math.floor(
      (qty * obj.price * (100 - discount)) / 100
    );
    // console.log(comp)
    await cust.save();
    await admin.save();
    await comp.save();
    await obj.save();
    await placeorder.save();
    return res.json({ status: true, orderId: placeorder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used For Adding Element To Cart
const addtocart = async (req, res) => {
  try {
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
        return res.json({ success: false, message: "Already Product in Cart" });
      } else {
        v.product.push(obj);
        await v.save();
        return res.json({ success: true, cartId: v._id });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used For Fetching Data To be shown on the My Cart Page
const cartdetails = async (req, res) => {
  try {
    const ca = await Cart.findOne({ username: req.body.username }).populate(
      "product"
    );
    if (!ca) {
      return res.json({ success: false, message: "The Cart Is Empty" });
    } else {
      return res.json({ success: true, ca: ca });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used for Deleting a specific product from a particular item from cart
const deleteElementFromCart = async (req, res) => {
  try {
    const ca = await Cart.findOne({ username: req.body.username });
    const arr = ca.product;
    const ind = arr.indexOf(req.body.idToRemove);
    if (ind !== -1) {
      arr.splice(ind, 1);
    }
    ca.product = arr;
    await ca.save();
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used for Fetching valid code or not
const validcode = async (req, res) => {
  try {
    const dc = await DiscountCode.findOne({ code: req.body.code });
    if (!dc) {
      return res.json({
        success: false,
        message: "The Code Entered Is Invalid",
      });
    }
    if (dc.to.length > 0 && dc.to[0] === "ALL") {
      return res.json({
        success: true,
        discountpercent: dc.discountpercent,
        message: `Congratulations You Claimed a discount of ${dc.discountpercent}%`,
      });
    }
    if (dc.to.length > 0) {
      if (dc.to.includes(req.body.username)) {
        return res.json({
          success: true,
          discountpercent: dc.discountpercent,
          message: `Congratulations You Claimed a discount of ${dc.discountpercent}%`,
        });
      } else {
        return res.json({
          success: false,
          message: "The Code Entered Is Not Available For You",
        });
      }
    }
    return res.json({
      success: false,
      message: "Invalid Expired, Try Other Code",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Used For Fetching Personal Information Of The Users
const pinfo = async (req, res) => {
  try {
    const cust = await Customer.findOne({ username: req.body.username });
    const b = await Bought.find({ username: req.body.username }).populate(
      "product"
    );
    return res.json({ success: true, customer: cust, bought: b });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const username = req.params.username;
    const file = req.file;
    if (!username || !file) {
      return res.status(400).json({ error: "Username and file are required" });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      return res
        .status(500)
        .json({ error: "Failed to upload image to Cloudinary" });
    }

    // Update user's profile picture URL in MongoDB
    const updatedUser = await Customer.findOneAndUpdate(
      { username: username },
      { photo: cloudinaryResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//update cumstomer details

const update = async (req, res) => {
  try {
    const username = req.params.username;
    const customer = await Customer.findOne({ username: username });
    if (customer) {
      const { fullname, phone, address, pincode } = req.body;
      if (fullname !== null) customer.fullname = fullname;
      if (phone !== null) customer.phone = phone;
      if (address !== null) customer.address = address;
      if (pincode !== null) customer.pincode = pincode;
      await customer.save();
      res.status(201).json("Company updated");
    } else {
      res.status(404).json("user not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// place order from the Cart
 const PlaceOrderForCart = async(req,res)=>{
        console.log(req.body);
        const cust = await Customer.findOne({ username: req.body.username })
        const discount = parseInt(req.body.discount)
        const ca = await Cart.findOne({ username: req.body.username }).populate('product');
        const qty = req.body.qty;
        const admin = await Admin.findOne()
        for (let i = 0; i < qty.length; i++) {
            const obj = await Object.findById(ca.product[i]);
            const comp = await Company.findOne({ username: obj.companyusername })
            const qty1 = parseInt(qty[i])
            const placeorder = new Bought();
            placeorder.username = req.body.username
            placeorder.product = obj
            placeorder.quantity = qty1
            placeorder.orderDate = new Date()
            placeorder.status = "Pending"
            placeorder.deliveryDate = new Date(placeorder.orderDate.getTime() + (7 * 24 * 60 * 60 * 1000));
            placeorder.companyName = comp.username
            placeorder.discount = discount
            obj.quantity -= qty1;
            placeorder.couponcode = req.body.couponcode
            comp.totalbusiness += Math.floor(qty1 * obj.price * (100 - obj.margin) / 100);
            admin.totalBusiness += Math.floor(qty1 * obj.price * (100 - discount) / 100);
            admin.totalProfit += (Math.floor(qty1 * obj.price * (100 - discount) / 100) - Math.floor(qty1 * obj.price * (100 - obj.margin) / 100));
            cust.totalBusiness += Math.floor(qty1 * obj.price * (100 - discount) / 100)
            console.log(placeorder);
            await comp.save();
            await obj.save();
            await placeorder.save()
        }
        ca.product = [];
        await ca.save();
        await admin.save();
        await cust.save();
        return res.status(201).json({success: true});
 }

module.exports = {
  login,
  signup,
  home,
  showallcat,
  showallsubcat,
  productdetails,
  placeorder,
  addtocart,
  cartdetails,
  deleteElementFromCart,
  validcode,
  pinfo,
  updateProfilePicture,
  update,
  PlaceOrderForCart
};
