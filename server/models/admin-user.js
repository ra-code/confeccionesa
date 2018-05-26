var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var dbPath  = "mongodb://root:8721693@ds019058.mlab.com:19058/pierblas";
var dbPath = "mongodb://localhost:27017/pierblas"
mongoose.connect(dbPath)

var adminUser = new Schema({

    userName: { type: String, default: 'admin', unique: true },
    password: { type: String, default: 'admin', require:true },
    role:{type:String, default:'admin'},
    date: { type: Date, default: Date.now }

});

var AdminUser = mongoose.model("adminUser", adminUser);
module.exports = AdminUser;