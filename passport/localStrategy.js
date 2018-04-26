const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const app_name = require("../package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);
const FbStrategy = require('passport-facebook').Strategy;


// passport.use(new LocalStrategy((username, password, next) => {
//   User.findOne({ username }, (err, foundUser) => {
//     if (err) {
//       next(err);
//       return;
//     }

//     if (!foundUser) {
//       next(null, false, { message: 'Incorrect username' });
//       return;
//     }

//     if (!bcrypt.compareSync(password, foundUser.password)) {
//       next(null, false, { message: 'Incorrect password' });
//       return;
//     }

//     next(null, foundUser);
//   });
// }));

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

passport.use(new FbStrategy({
  clientID: "your Facebook client id here",
  clientSecret: "your Facebook client secret here",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
