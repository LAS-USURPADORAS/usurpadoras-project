const express = require('express');
const router  = express.Router();
const Product = require("../models/Product");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

/*ABOUT PAGE*/
router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/catalog', (req, res, next) => {
  Product.find().then(product => {
    console.log(product)
    res.render('catalog', {product});
  })
  .catch(err => {
    console.log(err)
  })
});

module.exports = router;
