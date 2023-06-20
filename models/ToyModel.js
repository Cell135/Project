var mongoose = require('mongoose');
var ToySchema = mongoose.Schema(
   {
      name : String,
      price : Number,
      picUrl : String,
      description : String,
      amount : Number
   }
);

var ToyModel = mongoose.model("dochoi", ToySchema,"toy");
module.exports = ToyModel;

