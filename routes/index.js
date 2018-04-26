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





//er nodemailer broder


/*
    const user = process.env.GMAILUSER;
    const pass = process.env.GMAILPASS;

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user,
        pass
      }
    });

    transporter.sendMail({
      from: user,
      to: email,
      subject: "Activate account",
      html: `<a href='${activationURL}'>Activate account</a>`
    })
      .then(info => console.log(info))
      .catch(err => console.log(err))
    res.redirect("/");
  }
});
});
}); */


module.exports = router;