const express = require("express");
const router = express.Router();

const { getAdminById, getAdmin, getAllAdmins, updateAdmin } = require("../controllers/admin");
const { isAuthenticated, isSignedIn } = require("../controllers/adminauth");

router.param("adminId", getAdminById);

router.get("/admin/:adminId", isSignedIn, isAuthenticated, getAdmin);
router.get("/admins", getAllAdmins);
router.put("/admin/:adminId", isSignedIn, isAuthenticated, updateAdmin);


module.exports = router;