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


//LOGIN

/**
 * @swagger
  * tags:
 *   - name: admin
 *     description: admin operations
 * /velvethomes/admin/login:
 *   post:
 *     summary: Log in as an admin
 *     tags:
 *       - admin
 *     description: Endpoint to log in as an admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
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
 *         description: Bad request or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the login failed
 */



//HOME

/**
 * @swagger
 * /velvethomes/admin/home:
 *   get:
 *     summary: Fetch data to be displayed on the admin home page
  *     tags:
 *       - admin
 *     description: Endpoint to fetch data to be displayed on the admin home page.
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 company:
 *                   type: array
 *                   description: List of all companies
 *                 admin:
 *                   $ref: 'Admin'
 *                   description: Admin details
 *                 customer:
 *                   type: array
 *                   description: List of all customers
 *                 sales:
 *                   type: array
 *                   description: List of all sales with product details
 *                 discountcode:
 *                   type: array
 *                   description: List of all discount codes
 *                 mostSeller:
 *                   type: array
 *                   description: List of most selling companies
 *                 leastSeller:
 *                   type: array
 *                   description: List of least selling companies
 *                 bestSeller:
 *                   $ref: 'Object'
 *                   description: Best selling product
 *                 worstSeller:
 *                   $ref: 'Object'
 *                   description: Worst selling product
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


//All Customers
/**
 * @swagger
 * /velvethomes/admin/allcustomers:
 *   get:
 *     summary: Fetch data of all customers
  *     tags:
 *       - admin
 *     description: Endpoint to fetch data of all customers.
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 customers:
 *                   type: array
 *                   description: List of all customers
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



//All Companies
/**
 * @swagger
 * /velvethomes/admin/allcompanies:
 *   get:
 *     summary: Fetch data of all companies
  *     tags:
 *       - admin
 *     description: Endpoint to fetch data of all companies.
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 company:
 *                   type: array
 *                   description: List of all companies
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




//Deliveries
/**
 * @swagger
 * /velvethomes/admin/deliveries:
 *   get:
 *     summary: Fetch all delivery data
  *     tags:
 *       - admin
 *     description: Endpoint to fetch all delivery data.
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 delivery:
 *                   type: array
 *                   description: List of all deliveries with product details
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



//Discount Code
/**
 * @swagger
 * /velvethomes/admin/discountcode:
 *   post:
 *     summary: Add a new discount code
  *     tags:
 *       - admin
 *     description: Endpoint to add a new discount code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               discountpercent:
 *                 type: number
 *               to:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Discount code added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the addition was successful
 *                 code:
 *                   $ref: 'DiscountCode'
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



//Delete Discount Code
/**
 * @swagger
 * /velvethomes/admin/deletediscountcode:
 *   delete:
 *     summary: Delete a discount code
  *     tags:
 *       - admin
 *     description: Endpoint to delete a discount code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Discount code deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the deletion was successful
 *                 dc:
 *                   type: array
 *                   description: List of remaining discount codes
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



//Delivered
/**
 * @swagger
 * /velvethomes/admin/delivered:
 *   patch:
 *     summary: Mark a product as delivered
  *     tags:
 *       - admin
 *     description: Endpoint to mark a product as delivered.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product marked as delivered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
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





router.post('/login', morgan('combined'), adminController.login);
router.get('/home', adminController.home);
router.get('/allcustomers', adminController.allcustomers);
router.get('/allcompanies',adminController.allcompanies);
router.get('/deliveries',adminController.deliveries);
router.post("/discountcode", adminController.discountcode);
router.delete('/deletediscountcode',adminController.deletediscountcode);
router.patch("/delivered", adminController.delivered);




/** 
* @swagger
 * /velvethomes/admin/deletecustomer:
 *   delete:
 *     summary: Delete a customer
  *     tags:
 *       - admin
 *     description: Endpoint to delete a customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the deletion was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Customer not found
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


// delete company

/**
 * @swagger
 * /velvethomes/admin/deletecompany:
 *   delete:
 *     summary: Delete a company
  *     tags:
 *       - admin
 *     description: Endpoint to delete a company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the deletion was successful
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Company not found
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



router.delete("/deletecustomer", adminController.deleteCustomer);

router.delete("/deletecompany", adminController.deleteCompany);



module.exports = router;
