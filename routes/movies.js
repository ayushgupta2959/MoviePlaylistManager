const Item = require("../models/item"),
  express = require("express"),
  router = express.Router({ mergeParams: true });

router.get("/movies", function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { items: items });
    }
  });
});

//new route
router.get("/movies/new", function(req, res) {
  res.render("new");
});

//create route
router.post("/movies", function(req, res) {
  let newItem = {
    movie: req.body.movie,
    listType: 1
  };

  Item.create(newItem, function(err, item) {
    if (err) {
      console.log(err);
      req.flash("error", "Error Occured please add the movie again");
    } else {
      req.flash("success", "Movie Added in To Watch List");
      console.log("Item created");
      res.redirect("/movies");
    }
  });
});

//show route
router.get("/movies/:id", function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { item: item });
    }
  });
});

// edit route
router.get("/movies/:id/edit", function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err) console.log(err);
    else res.render("edit", { item: item });
  });
});

//update route
router.put("/movies/:id", function(req, res) {
  let item = {
    movie: req.body.movie,
    listType: req.body.listType
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
router.delete("/movies/:id", function(req, res) {
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
