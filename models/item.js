const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  movie: {
    title: String,
    year: String
  },
  watchType: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model("Item", itemSchema);
