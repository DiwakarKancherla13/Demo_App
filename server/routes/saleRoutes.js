const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/saleController");

router.post("/", ctrl.createSale);
router.get("/", ctrl.getSales);

module.exports = router;
