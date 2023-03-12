const router = require("express").Router();

/* GET user list */
router.get("/", (req, res, next) => {
  res.send("respond with a response");
});

/* GET user profile */
router.get("/profile", (req, res, next) => {
  res.send(req.user);
});

module.exports = router;
