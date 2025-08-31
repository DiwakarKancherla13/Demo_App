const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/customerController");

router.post("/", ctrl.createCustomer);
router.get("/", ctrl.getCustomers);

module.exports = router;
