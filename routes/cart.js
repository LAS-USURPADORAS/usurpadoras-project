require("dotenv").config();
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const ShoppingCart = require("../models/ShoppingCart");
const User = require("../models/User");
const nodemailer = require("nodemailer");


/*CARRITO*/
router.get("/cart", (req, res, next) => {
  let sum = 0;
  User.findById(req.session.passport.user)
    .then(u => {
      u.cart.forEach((x) => {
        sum += x.price * x.quantity
      })
      res.render("cart", { carrito: u.cart, sum });
    })
    .catch(err => {
      next();
    });
});




/*AÑADIR AL CARRITO*/
router.post("/add/:id/", (req, res, next) => {

  const qnt = req.body.quantity
  console.log(qnt + "HOLAAAAAAAA")
  Product.findById(req.params.id)
    .then(p => {
      p.quantity = qnt
      User.findByIdAndUpdate(req.session.passport.user).then(u => {
        u.cart.push(p);
        u.save();
        res.redirect("/cart");
        // console.log(u);
      });
    })
    .catch(err => console.log(err))
});

/*BORRAR DEL CARRITO*/

router.get("/delete/:id", (req, res, next) => {
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
const cart =req.user.cart
  const update = {
    cart: []
  }

  User.findByIdAndUpdate(req.params.id, update).then(u => {
    res.redirect("/confirmation");
  });
});
/* PÁGINAS DE PAGO*/



router.get("/pay", (req, res, next) => {
  console.log(req.user)
  res.render("pay", { user: req.user });
});

router.get("/confirmation", (req, res, next) => {
const user= 'pepe.ironhack@gmail.com'
const uzuario= req.user.cart
console.log(uzuario)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASS
    }
});

  transporter.sendMail({
    from: user,
    to: req.user.email,
    subject: "YA SE VIENEN SUS REMERITAS WEY",
    html:`Su pedido está en camino parcer@, la mitad de las ganansias serán destinadas al narcotráfico` 
  })
    .then(info => console.log(info))
    .catch(err => console.log(err))
  res.render("confirmation");
});



router.get("/confirmation", (req, res, next) => {
  res.render("confirmation", { user: req.user });
});

module.exports = router;