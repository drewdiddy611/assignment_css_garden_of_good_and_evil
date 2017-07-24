var express = require("express");
var router = express.Router();

const cookieMap = ["food", "color", "faction", "insanity"];

/* GET home page. */
router.get("/", function(req, res, next) {
  data = {};
  cookieMap.forEach(el => {
    data[el] = req.cookies[el];
  });
  res.render("index", {
    title: "The Kingdom of Good & Evil",
    data: data
  });
});

router.post("/", function(req, res, next) {
  let cookieJar = req.cookies;
  for (k in req.body) {
    if (req.body[k].length) {
      res.cookie(k, req.body[k]);
    }
  }
  res.redirect("/");
});

module.exports = router;
