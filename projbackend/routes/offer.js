const express = require("express");
const router = express.Router();

const {getOfferById, createOffer, getOffer, photo, deleteOffer, updateOffer, getAllUniqueMerchants, getAllOffers} = require("../controllers/offer");
const {isSignedIn, isAuthenticated } = require("../controllers/merchant");
const {getMerchantById} = require("../controllers/merchant");

//All of Params
router.param("merchantId", getMerchantById);
router.param("offerId", getOfferById);

//All of actual routes

//create route
router.post("/offer/create/:merchantId", isSignedIn, isAuthenticated, createOffer);

//read route
router.get("/offer/:offerId/:merchantId", isSignedIn, isAuthenticated, getOffer);
router.get("/offer/:offerId/:merchantId", isSignedIn, isAuthenticated, photo);

//update route
router.put("/offer/:offerId/:merchantId", isSignedIn, isAuthenticated, updateOffer);

//delete route
router.delete("/offer/:offerId/:merchantId", isSignedIn, isAuthenticated, deleteOffer);

//listing route
router.get("/offers/:merchantId",isSignedIn, isAuthenticated, getAllOffers);

//All distinct merchants
router.get("/offers/merchants", getAllUniqueMerchants);


module.exports = router;