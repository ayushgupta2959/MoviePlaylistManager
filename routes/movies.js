const Item = require("../models/item"),
  express = require("express"),
  router = express.Router({ mergeParams: true });

router.get("/movies", (req, res) => {
  Item.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { items: items });
    }
  });
});

//new route
router.get("/movies/new", (req, res) => {
  res.render("new");
});

//create route
router.post("/movies", (req, res) => {
  let newItem = {
    movie: req.body.movie
  };

  Item.create(newItem, (req, res) => {
    if (err) {
      console.log(err);
      req.flash("error", "Error Occured please add the movie again");
    } else {
      req.flash("success", "Movie Added in To Watch List");
      res.redirect("/movies");
    }
  });
});

//show route
router.get("/movies/:id", (req, res) => {
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { item: item });
    }
  });
});

// edit route
router.get("/movies/:id/edit", (req, res) => {
  Item.findById(req.params.id, function(err, item) {
    if (err) console.log(err);
    else res.render("edit", { item: item });
  });
});

//update route
router.put("/movies/:id", (req, res) => {
  let item = {
    movie: req.body.movie,
    watchType: req.body.watchType
  };

  Item.findByIdAndUpdate(req.params.id, item, function(err, item) {
    if (err) {
      req.flash("error", "Error Occured plase update again");
      console.log(err);
    } else {
      req.flash("success", "Movie Updated");
      res.redirect("/movies/" + req.params.id);
    }
  });
});

//delete route
router.delete("/movies/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      req.flash("error", "Error Occured please delete the movie again");
      console.log(err);
    } else {
      req.flash("success", "Movie Deleted");
      res.redirect("/movies");
    }
  });
});

module.exports = router;
