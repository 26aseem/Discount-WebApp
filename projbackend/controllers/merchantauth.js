const MerchantPanel = require("../models/merchantpanel");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//merchantsignup is created
exports.merchantsignup = (req, res) => {
    /*res.json({
        message:"Signup works!"
    })*/

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        })
    }

    const merchant = new MerchantPanel(req.body);
    
    //Database updated
    merchant.save((err, merchant) => {
        if (err) {
            return res.status(400).json({
                err : "Not able to save merchant in the Database"
            });
        }

        res.json({
            username: merchant.username,
            merchantName: merchant.marchantName
        })
    });
};

//merchant signin is created
exports.merchantsignin = (req, res) => {
    const {username, password} = req.body;   //This destructuring
    
    //Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            errorParam: errors.array()[0].param
        });
    }
    MerchantPanel.findOne({username}, (err,merchant) => {
        if(err) {
            return res.status(400).json({
                error: "Merchant Not Found. Trying Sign Up!"
            });
        }

        if(!merchant.authenticate(password)){
            return res.status(401).json({
                error: "Username and Password do not match"
            });
        }

        //Create Token
        const token = jwt.sign({_id: merchant._id}, process.env.SECRET)
        //Put Token in cookie
        res.cookie("token, token", {expire: new Date() + 9999});

        //send response to front end
        const {_id, username} = merchant;
        return res.json({token, merchant: { _id, username}});

    });

};

exports.merchantsignout = (req,res) => {
    res.json({
        message: "Merchant Signout"
    });
};