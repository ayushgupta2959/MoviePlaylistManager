const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path"),
  methodOverride = require("method-override");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("mongoose connected");
    },
    err => {
      console.log("mongoose connection failed => " + err);
    }
  );

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

//Routes
const indexRoutes = require("./routes/index"),
  movieRoutes = require("./routes/movies");

app.use("/", indexRoutes);
app.use("/", movieRoutes);

app.listen(PORT, function() {
  console.log("server connected");
});
