const mongoose = require("mongoose"),
  passsportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passsword: String,
  itemLists: [
    {
      name: {
        type: String,
        default: "Default"
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItemList"
      }
    }
  ]
});

userSchema.plugin(passsportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
