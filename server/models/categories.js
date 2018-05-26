var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var dbPath  = "mongodb://root:8721693@ds019058.mlab.com:19058/pierblas";
var dbPath  = "mongodb://localhost:27017/pierblas"
mongoose.connect(dbPath)



var categories_schema = new Schema({

    name:{type:String,required:true},
    date:{type:Date, default: Date.now},
 
});

var Categories=mongoose.model("categories",categories_schema);
module.exports = Categories;