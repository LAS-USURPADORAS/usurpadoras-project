require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");
const productData = require("./product-data.js");

const dbURL = process.env.DBURL;


mongoose.connect(dbURL).then( () => {


  Product.create(productData)
  
    .then( (p) => {
      console.log(p)
      mongoose.disconnect();
    })
})








