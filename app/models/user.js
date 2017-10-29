// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    Name: String, 
    Password: String,
    Email:{type:String},
    Mob:{type:Number,unique:true},
    IsAuthenticatedEmail:{type:Boolean,default:false},
    TempEmailLink:{type:String,default:null},
    IsAuthenticatedMob:{type:Boolean,default:false},
    TempMobLink:{type:String,default:false},
    Type:{type:String,enum:['owner','customer','admin'],default:'customer'},
    Created:{type:Date,default:Date.now}
    
},{_id:false}));

