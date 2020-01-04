const mongoose = require("mongoose");

const itemListSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }
  ],
  username: String
});

module.exports = mongoose.model('ItemList', itemListSchema);
