const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User')
const bcrypt = require('bcrypt')
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken")

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: false
    },
        async (email, password, done) => {
            try {
                const user = await User.findByEmail(email);
                const isValid = await bcrypt.compare(password, user.password)
                if (!user || !isValid)
                    throw new InvalidArgumentError("password or email invalid")
                done(null, user);
            } catch (error) {
                done(error);
            }
        })
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, `${process.env.SECRET_JWT}`);
      const user = await User.findById(payload.id);
      console.log("estrategy:",user)
      done(null, user, { token: token });
    } catch (err) {
      done(err);
    }
  })
);