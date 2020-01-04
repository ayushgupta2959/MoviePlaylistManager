const request = require("request"),
  express = require("express"),
  router = express.Router({ mergeParams: true });

router.get("/search", (req, res) => {
  res.render("searchMovie");
});

router.post("/result", (req, res) => {
  let query = req.body.query;
  let api_key = process.env.SEARCH_MOVIES_API_KEY;
  const url = "http://www.omdbapi.com/?s=" + query + "&apikey=" + api_key;
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      res.render("searchResults", { data: parsedData });
    } else {
      console.log(error);
      console.log(response.statusCode);
      req.flash("error", "Error occured please search again");
      res.redirect("/search");
    }
  });
});

module.exports = router;
