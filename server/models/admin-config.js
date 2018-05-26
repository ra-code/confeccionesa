var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var dbPath  = "mongodb://root:8721693@ds019058.mlab.com:19058/pierblas";
var dbPath  = "mongodb://localhost:27017/pierblas"
mongoose.connect(dbPath)



var AdminConfig = new Schema({

    webCharges:{type:Number,default: 0},
    
 
});

var AdminConfig=mongoose.model("adminConfig",AdminConfig);
module.exports = AdminConfig;