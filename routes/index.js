const express = require("express"),
  router = express.Router({ mergeParams: true });

router.get("/", function(req, res) {
  res.redirect("/movies");
});

module.exports = router;
