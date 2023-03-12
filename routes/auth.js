const router = require("express").Router();

const jwt = require("jsonwebtoken");

const passport = require("passport");

/* POST login */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "SECRET_KEY");
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
