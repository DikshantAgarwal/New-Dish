// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Logger', new Schema({ 
    Created: {type:Date,default:Date.now},
    UserId:{type:String},
    Params: {type:String},
    Location:{type:String},
    Msg:{type:String},
    Error:{type:String}  
}));