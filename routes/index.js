var express = require("express");
var router = express.Router();

const cookieMap = ["food", "color", "faction", "insanity"];

/* GET home page. */
router.get("/", function(req, res, next) {
  var data = {};
  cookieMap.forEach(el => {
    data[el] = req.cookies[el];
  });
  console.log(data);
  res.render("index", {
    title: "The Kingdom of Good & Evil",
    data: data
  });
});

router.post("/", function(req, res, next) {
  for (k in req.body) {
    res.cookie(k, req.body[k]);
  }
  res.redirect("/");
});

module.exports = router;
