var express = require('express');
var merchantrouter = express.Router();
//For Data Validation
const { check, validationResult } = require('express-validator');

//Imported from controllers/adminauth.js
const { merchantsignup, merchantsignin, merchantsignout } = require('../controllers/merchantauth.js');

//merchantsignup Route
merchantrouter.post("/merchantsignup",[
    check("password", "Password should be atleast 6 characters").isLength({ min: 6}),
    check("username", "Username should be atleast 6 characters").isLength({min: 6}),
    check("merchantName", "Merchant Name should be atleast 2 characters").isLength({min: 2}),
    check("ownername", "Owner Name should be atleast 3 characters").isLength({min: 3}),
    check("city", "City should be atleast 3 characters").isLength({min: 3}),
    check("state", "State should be atleast 3 characters").isLength({min: 3}),
    check("country", "Country should be atleast 3 characters").isLength({min: 3}),
    check("streetAddress", "Street Address should be atleast 5 characters").isLength({min: 5}),
    check("pincode", "Pincode should be 6 characters").isLength({min: 6}),
    check("email", "Email is required").isEmail(),
    check("contact", "Contact Number should be atleast 10 characters").isLength({min: 10}),
    check("category", "Category is required").isLength({min: 3})
],merchantsignup);

//merchantsignin Route
merchantrouter.post("/merchantsignin",[
    check("password", "Password is required").isLength({ min: 6}),
    check("username", "Username is required").isLength({ min: 6})
],merchantsignin);

//merchantsignout Route
merchantrouter.get("/merchantsignout", merchantsignout);


module.exports = merchantrouter;