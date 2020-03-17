const express = require("express");
const router = express.Router();

const { getMerchantById, getMerchant, getAllMerchants, updateMerchant, merchantPhoto, deleteMerchant } = require("../controllers/merchant");
const { isAuthenticated, isSignedIn } = require("../controllers/merchantauth");

router.param("merchantId", getMerchantById);

router.get("/merchant/:merchantId", isSignedIn, isAuthenticated, getMerchant);
router.get("/merchants", getAllMerchants);
router.put("/merchant/:merchantId", isSignedIn, isAuthenticated, updateMerchant);


module.exports = router;