const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      return UserModel.findOne({ email, password })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }
          return done(null, user, { message: "Logged in Successfully" });
        })
        .catch((err) => done(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "SECRET_KEY",
    },
    (jwtPayload, done) => {
      return UserModel.findOneById(jwtPayload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
    }
  )
);
