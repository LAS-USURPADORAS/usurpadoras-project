require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");
const productData = require("./product-data.js");

const dbURL = process.env.DBURL;


mongoose.connect(dbURL).then( () => {
//  Product.collection.drop();

  Product.create(productData)
  
    .then( (p) => {
      console.log(p)
      mongoose.disconnect();
    })
})

// Product.remove({}, function(err) { 
//   console.log('collection removed') 
// });








