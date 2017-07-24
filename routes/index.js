var express = require("express");
var router = express.Router();

const cookieMap = ["food", "color", "faction", "insanity"];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "The Kingdom of Good & Evil"
  });
});

router.post("/", function(req, res, next) {
  for (k in req.body) {
    res.cookie(k, req.body[k]);
  }
  res.redirect("/");
});

module.exports = router;
