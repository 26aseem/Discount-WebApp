const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

var merchantSchema = mongoose.Schema({
    merchantID: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minlength: 10,
        maxlength:10
    },
    
    merchantName: {
        type: String,
        required: true,
        maxlength: 200
    },

    ownerName: {
        type: String,
        required: true,
        maxlength: 32,
    },

    city: {
        type: String,
        required: true,
        maxlength: 32
    },

    state: {
        type: String,
        required: true,
        maxlength: 32
    },

    country: {
        type: String,
        required: true,
        maxlength: 32
    },

    streetAddress: {
        type: String,
        required: true,
        maxlength: 200
    },

    pincode: {
        type: Number,
        minlength: 6,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },

    contact: {
        type: Number,
        maxlength: 12,
        required: true,
        trim: true
    },

    altcontact: {
        type: Number,
        maxlength: 12,
        trim: true
    },

    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },

    description: {
        type: String,
        trim: true,
        maxlength: 2000
    },

    merchantPhoto: {
        data: Buffer,
        contentType: String
    }

    },
    
    { timestamp: true }

);

merchantSchema.virtual()
    .set(function(){
        this._address = this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.country + " - " + this.pincode;
    })
    .get(function(){
        return this._address;
    })


module.exports = mongoose.model("Merchant",merchantSchema);