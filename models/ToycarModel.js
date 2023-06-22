var mongoose = require('mongoose');
var ToycarSchema = mongoose.Schema(
   {
      name : String,
      brand : String,
      image : String,
      price : Number
   }
);

var ToycarModel = mongoose.model("xedochoi", ToycarSchema,"car");
module.exports = ToycarModel;

