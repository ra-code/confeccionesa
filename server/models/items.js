var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var dbPath  = "mongodb://root:8721693@ds019058.mlab.com:19058/pierblas";
var dbPath  = "mongodb://localhost:27017/pierblas"
mongoose.connect(dbPath)



var post_schema = new Schema({
    id_item:{type:Number,required:true,unique: true},
    title:{type:String,required:true},
    price:{type:Number,required:true},
    cant:{type:Number,required:true},
    code:{type:String,required:true},
    description:{type:String,required:false},
    id_category:{type:String, required:true},
    images:{type:Array(),require:false},
    sells:{type:Number,required:false},
    descount:{type:Number,required:false, default:0},
    date:{type:Date, default: Date.now},
    
});

var Post=mongoose.model("posts",post_schema);
module.exports = Post;