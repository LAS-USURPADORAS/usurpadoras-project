const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const ShoppingCart = require("../models/ShoppingCart");
const User = require("../models/User");

/*CATALOGO*/
router.get("/catalog", (req, res, next) => {
    Product.find()
      .then(product => {
        console.log(product);
        res.render("catalog", { product });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  /* PAGINA DE PRODUCTO */
  router.get("/product/:id", (req, res, next) => {
    Product.findById(req.params.id)
      .then(product => {
        res.render("product", product);
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports = router;