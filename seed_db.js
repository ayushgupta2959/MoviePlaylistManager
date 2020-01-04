const mongoose = require("mongoose"),
  Item = require("./models/item");

const deleteAllData = () => {
  Item.deleteMany({}, err => {
    if (err) console.log(err);
  });
};

module.exports = {deleteAllData: deleteAllData}
