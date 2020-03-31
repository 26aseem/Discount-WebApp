const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const offerSchema = new mongoose.Schema({
    offerName: {
        type: String,
        required: true,
        maxlength: 200
    },

    offerDesc: {
        type: String,
        maxlength: 2000,
    },

    offerStartDate: {
        type: Date,
    },
    
    offerEndDate: {
        type: Date,
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    merch: {
        type: ObjectId,
        ref: "Merchant"
    }
},

{
    timestamp: true

});

module.exports = mongoose.model("Offer",offerSchema);
/*
const Offer = mongoose.model("Offer",offerSchema);


//allOfferSchema contains all offers for a particular Merchant
const allOfferSchema = new mongoose.Schema({
    merchant: {
        type: ObjectId,
        ref: "Merchant"
    },
    offers: [offerSchema]

});

const AllOffers = mongoose.model("AllOffers",allOfferSchema);

module.exports = {AllOffers,Offer};
*/