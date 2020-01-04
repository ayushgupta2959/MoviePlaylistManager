const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  path = require("path"),
  flash = require("connect-flash"),
  expressSession = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local");
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

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(flash());

app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.messages = req.flash();
  next();
});

//Routes
const indexRoutes = require("./routes/index"),
  searchRoutes = require("./routes/search"),
  movieRoutes = require("./routes/movies");

app.use("/", indexRoutes);
app.use("/", searchRoutes);
app.use("/", movieRoutes);

app.listen(PORT, function() {
  console.log(`server connected ${PORT}`);
});
