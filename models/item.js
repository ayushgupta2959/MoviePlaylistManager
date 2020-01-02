const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  movie: {
    title: String,
    year: String
  },
  listType: Number
});

module.exports = mongoose.model("Item", itemSchema);
