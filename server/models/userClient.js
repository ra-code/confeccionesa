var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var dbPath  = "mongodb://root:8721693@ds019058.mlab.com:19058/pierblas";
var dbPath  = "mongodb://localhost:27017/pierblas"
mongoose.connect(dbPath)


var userClient_schema = new Schema({

    name:{type:String,required:true},
    lastName:{type:String,required:true},
    docType:{type:String,required:true},
    docNac:{type:String,required:true},
    docNumber:{type:Number,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    signUpDate:{type:Date, default: Date.now},
    
});

var userClient=mongoose.model("userClient",userClient_schema);
module.exports = userClient;