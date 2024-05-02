// routes/customerRoutes.js
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const customerController = require("../controllers/customerController");
const morgan = require("morgan");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
// const { HomeObjects } = require("../models/HomeObjects.js");
// const { SubCategory } = require("../models/SubCategory.js")
// const { Category } = require("../models/Category.js")
app.use(cors());

/**
 * @swagger
 * tags:
 *   - name: customer
 *     description: Customer operations
 * /velvethomes/customer/login:
 *   post:
 *     summary: Log in a customer
 *     tags:
 *       - customer
 *     description: Endpoint to log in a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the login was successful
 *                 authToken:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the login failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /velvethomes/customer/signup:
 *   post:
 *     summary: Sign up a customer
 *     tags:
 *       - customer
 *     description: Endpoint to sign up a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the signup was successful
 *       400:
 *         description: Bad request or email already used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message
 */

// Fetch all products to be displayed on the home page
/**
 * @swagger
 * /velvethomes/customer/home:
 *   get:
 *     summary: Fetch all products for the home page
  *     tags:
 *       - customer
 *     description: Endpoint to fetch all products to be displayed on the home page.
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 objects:
 *                   type: array
 *                   items:
 *                     $ref: 'HomeObject'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /velvethomes/customer/showallcat:
 *   post:
 *     summary: Fetch details for the category page
  *     tags:
 *       - customer
 *     description: Endpoint to fetch details to be shown on the category page.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the category
 *     responses:
 *       200:
 *         description: Details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 category:
 *                   $ref: 'Category'
 *                 subcategory:
 *                   type: array
 *                   items:
 *                     $ref: 'SubCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /velvethomes/customer/showallsubcat:
 *   post:
 *     summary: Fetch all products of a particular subcategory
 *     description: Endpoint to fetch all products of a particular subcategory.
  *     tags:
 *       - customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the subcategory
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 subcategory:
 *                   $ref: 'SubCategory'
 *                 allitems:
 *                   type: array
 *                   items:
 *                     $ref: 'Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /velvethomes/customer/productdetails:
 *   post:
 *     summary: Fetch product details
  *     tags:
 *       - customer
 *     description: Endpoint to fetch details of a specific product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oid:
 *                 type: string
 *                 description: The ID of the product
 *     responses:
 *       200:
 *         description: Product details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 object:
 *                   $ref: 'Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /velvethomes/customer/placeorder:
 *   post:
 *     summary: Place an order
  *     tags:
 *       - customer
 *     description: Endpoint to place an order for a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the product to order
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to order
 *               discount:
 *                 type: integer
 *                 description: The discount percentage applied to the order
 *               username:
 *                 type: string
 *                 description: The username of the customer placing the order
 *               couponcode:
 *                 type: string
 *                 description: The coupon code used for the order
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the order was successfully placed
 *                 orderId:
 *                   type: string
 *                   description: The ID of the placed order
 *       400:
 *         description: Bad request or insufficient quantity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the order failed
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /velvethomes/customer/addtocart:
 *   post:
 *     summary: Add a product to the cart
  *     tags:
 *       - customer
 *     description: Endpoint to add a product to the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the customer
 *               id:
 *                 type: string
 *                 description: The ID of the product to add to the cart
 *     responses:
 *       200:
 *         description: Product added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the product was successfully added to the cart
 *                 cartId:
 *                   type: string
 *                   description: The ID of the cart
 *       400:
 *         description: Bad request or product already in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */



/**
 * @swagger
 * /velvethomes/customer/cartdetails:
 *   post:
 *     summary: Fetch cart details
  *     tags:
 *       - customer
 *     description: Endpoint to fetch data to be shown on the My Cart page.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the customer
 *     responses:
 *       200:
 *         description: Cart details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the cart details were fetched successfully
 *                 ca:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the cart
 *                     username:
 *                       type: string
 *                       description: The username of the customer
 *                     product:
 *                       type: array
 *                       items:
 *                         $ref: 'Object'
 *       400:
 *         description: Bad request or empty cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */



/**
 * @swagger
 * /velvethomes/customer/deleteElementFromCart:
 *   post:
 *     summary: Delete a specific product from the cart
  *     tags:
 *       - customer
 *     description: Endpoint to delete a specific product from a particular item from the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the customer
 *               idToRemove:
 *                 type: string
 *                 description: The unique identifier of the product to remove from the cart
 *     responses:
 *       200:
 *         description: Product deleted successfully from the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the product was deleted successfully from the cart
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */



/**
 * @swagger
 * /velvethomes/customer/validcode:
 *   post:
 *     summary: Check if a discount code is valid
  *     tags:
 *       - customer
 *     description: Endpoint to check if a discount code is valid and applicable.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the customer
 *               code:
 *                 type: string
 *                 description: The discount code to validate
 *     responses:
 *       200:
 *         description: Discount code validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the discount code is valid
 *                 discountpercent:
 *                   type: number
 *                   description: The percentage of discount applied
 *                 message:
 *                   type: string
 *                   description: Result message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */



/**
 * @swagger
 * /velvethomes/customer/pinfo:
 *   post:
 *     summary: Fetch personal information of a user
  *     tags:
 *       - customer
 *     description: Endpoint to fetch personal information of a user along with their purchase history.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the customer
 *     responses:
 *       200:
 *         description: Personal information and purchase history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 customer:
 *                   $ref: 'Customer'
 *                   description: Personal information of the customer
 *                 bought:
 *                   type: array
 *                   items:
 *                     $ref: 'Bought'
 *                   description: Purchase history of the customer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request failed
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /velvethomes/customerProfile/upload/{username}:
 *   post:
 *     summary: Update profile picture of a user
  *     tags:
 *       - customer
 *     description: Endpoint to update the profile picture of a user.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the customer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be uploaded
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                 user:
 *                   $ref: 'Customer'
 *                   description: Updated user object with the new profile picture URL
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that username and file are required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the user was not found
 *       500:
 *         description: Internal server error or failed to upload image to Cloudinary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating internal server error or failure to upload image
 */


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

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
router.use(morgan("combined", { stream: accessLogStream }));

router.post("/login", morgan("combined"), customerController.login);

router.post("/signup", morgan("combined"), customerController.signup);

router.get("/home", customerController.home);
router.post("/showallcat", customerController.showallcat);
router.post("/showallsubcat", customerController.showallsubcat);
router.post("/productdetails", customerController.productdetails);
router.post("/placeorder", customerController.placeorder);
router.post("/addtocart", customerController.addtocart);
router.post("/cartdetails", customerController.cartdetails);
router.post("/deleteElementFromCart", customerController.deleteElementFromCart);
router.post("/validcode", customerController.validcode);
router.post("/pinfo", customerController.pinfo);
router.post(
  "/customerProfile/upload/:username",
  upload.single("file"),
  customerController.updateProfilePicture
);

router.post("/placeorderfromcart", customerController.PlaceOrderForCart);
router.post('/update/:username', customerController.update);

module.exports = router;
