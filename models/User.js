const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    cart: Array, 
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
