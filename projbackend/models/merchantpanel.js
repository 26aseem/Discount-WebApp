//Schema for Merchant Panel
//Mongoose, Crypto and uuid version 1 are used
const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const {OrderId} = mongoose.Schema;

var merchantpanelSchema = new mongoose.Schema({
    merchant: {
        type: ObjectId,
        ref = "Merchant"
    },

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 32,
        minlength: 6,

    },

    encrypt_password: {
        type: String,
        required: true,
        minlength: 6
    },

    salt: {
        type: String
    }
},
{ 
    timestamp: true
});


//Virtual and Methods are defined

merchantpanelSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encrypt_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })


merchantSchema.method = {
//Authenticate for login
    authenticate: function(password){
        return this.securePassword(password)==this.encrypt_password
    },

//securePassword is a function to safeguard the password
    securePassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password).digest('hex');
        }
        catch (err){
            return "";
        }
    }
};


module.exports = mongoose.model("MerchantPanel",merchantpanelSchema);

