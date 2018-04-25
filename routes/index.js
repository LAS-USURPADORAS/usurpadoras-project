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
/*CARRITO*/
router.get("/cart", (req, res, next) => {
  User.findById(req.session.passport.user)
    .then(u => {
      res.render("cart", { carrito: u.cart });
    })
    .catch(err => {
      next();
    });
});

router.get("/add/:id", (req, res, next) => {
  Product.findById(req.params.id)
  .then(p => {
    User.findByIdAndUpdate(req.session.passport.user).then(u => {
      u.cart.push(p);
      u.save();
      res.redirect("/cart");
      console.log(u);
    });
  })
  .catch(err=>console.log(err))
});

//ESTO FUNCIONA A MEDIAS, BORRA EL ULTIMO ITEM AÑADIDO

// router.get("/delete/:id", (req, res, next) => {
//   console.log(req.params.id)
//   User.findById(req.user.id)
//   .then(u => {
//     u.cart.splice(u.cart.indexOf(req.params.id), 1)
//       u.save()
//       res.redirect('/cart')
//     console.log(u)
//   })

//   })

// PROPUESTA DE JUAN GANADOR

router.get("/delete/:id", (req, res, next) => {
  //console.log(req.params.id);
  User.findById(req.user.id).then(u => {
    u.cart.forEach((e, i) => {
      console.log(i, e);
      if (e._id == req.params.id) {
        u.cart.splice(i, 1);
      }
    });
    u.save();
    res.redirect("/cart");
  });
});

module.exports = router;
