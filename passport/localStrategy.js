const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const app_name = require("../package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);



passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        next(err);
        return;
      }
      if (!user) {
        next(null, false, { message: "Incorrect username" });
        return;
      }
      if (!bcrypt.compareSync(password, user.password)) {
        next(null, false, { message: "Incorrect password" });
        return;
      }
      debug("User logged in!");
      next(null, user);
    });
  })
);

