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


/**
 * @swagger
 * tags:
 *   - name: company
 *     description:  company operations
 * /velvethomes/seller/login:
 *   post:
 *     summary: Log in as a company
 *     tags:
 *       - company
 *     description: Endpoint to log in as a company.
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
 *         description: Bad request
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

/**
 * @swagger
 * /velvethomes/seller/create:
 *   post:
 *     summary: Create a new company
  *     tags:
 *       - company
 *     description: Endpoint to create a new company.
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
 *               companyname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the company creation was successful
 *       400:
 *         description: Bad request or email already used
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /velvethomes/seller/home:
 *   post:
 *     summary: Get company home page details
  *     tags:
 *       - company
 *     description: Endpoint to get company home page details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the fetching was successful
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *                 sold:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bought'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /velvethomes/seller/addnewprod:
 *   post:
 *     summary: Add a new product
  *     tags:
 *       - company
 *     description: Endpoint to add a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               category:
 *                 type: string
 *               companyusername:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               key_points:
 *                 type: array
 *                 items:
 *                   type: string
 *    
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the product was added successfully
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the added product
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /velvethomes/seller/showallprods:
 *   post:
 *     summary: Get all products registered by the company
  *     tags:
 *       - company
 *     description: Endpoint to get all products registered by the company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
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
 *                     $ref: 'Object'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   description: Error message
 */




router.post('/login', morgan('combined'), sellerController.login);
router.post('/createcomp', morgan('combined'), sellerController.createcomp);
router.post('/home', sellerController.home);
router.post('/addnewprod', sellerController.addnewprod);
router.post('/showallprods', sellerController.showallprods);
router.post('/updateProduct/:id',sellerController.updateProduct);

module.exports = router;
