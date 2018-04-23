const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
 name: String,
 description: String,
 colection: {type: String, enum:["Stranger Things","Narcos"]},
 price: Number,
 material: {type: String, enum:["Silicone","Hard plastic"]},
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
