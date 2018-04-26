const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const ShoppingCart = require("../models/ShoppingCart");
const User = require("../models/User");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { user: req.user });
});




/*ABOUT PAGE*/
router.get("/about", (req, res, next) => {
  res.render("about");
});






module.exports = router;