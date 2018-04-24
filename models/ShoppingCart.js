const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema(
  {
    userId: String,
    content: Array,
    productId: String,
    productQ: Number,
    productPrice: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const ShoppingCart = mongoose.model("shoppingCart", shoppingCartSchema);
module.exports = ShoppingCart;
