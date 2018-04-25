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
  let sum = 0;
  User.findById(req.session.passport.user)
    .then(u => {
      u.cart.forEach((x)=>{
        sum +=x.price*x.quantity
      })
      res.render("cart", { carrito: u.cart,sum });
    })
    .catch(err => {
      next();
    });
});
/*AÑADIR AL CARRITO*/
router.post("/add/:id/", (req, res, next) => {

  const qnt =req.body.quantity
console.log(qnt + "HOLAAAAAAAA")
  Product.findById(req.params.id)
  .then(p => {
    p.quantity=qnt
    User.findByIdAndUpdate(req.session.passport.user).then(u => {
      u.cart.push(p);
      u.save();
      res.redirect("/cart");
      // console.log(u);
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

/*BORRAR DEL CARRITO*/

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

router.get("/buy/:id", (req, res, next) => {
  
  const update = {
    cart:[]
  }

  User.findByIdAndUpdate(req.params.id,update).then(u => {
    res.redirect("/confirmation");
  });
});
/* PÁGINAS DE PAGO*/



router.get("/pay", (req, res, next) => {
  res.render("pay", { user: req.user });
});

router.get("/confirmation", (req, res, next) => {
  res.render("confirmation", { user: req.user });
});

module.exports = router;