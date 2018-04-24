const express = require('express');
const router  = express.Router();
const Product = require("../models/Product");
const ensureLoggedIn = require('../middlewares/ensureLoggedIn')



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index' , {user: req.user});
});

/*ABOUT PAGE*/
router.get('/about', (req, res, next) => {
  res.render('about');
});
/*CATALOGO*/
router.get('/catalog', (req, res, next) => {
  Product.find().then(product => {
    console.log(product)
    res.render('catalog', {product});
  })
  .catch(err => {
    console.log(err)
  })
});

/* PAGINA DE PRODUCTO */
router.get("/product/:id",  (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    res.render("product", product );
  })
  .catch(err => {
    console.log(err)
  })

});
/*CARRITO*/
router.get('/cart', (req, res, next) => {
  res.render('cart');
});

module.exports = router;
