const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

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
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      debug('User logged in!');
      return next(null, user);
    });
  })
);
