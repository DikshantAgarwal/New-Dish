var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var User = require('./user');
var Restaurant= require('./restaurant');
var Logger=require('./logger');

module.exports = mongoose.model('Account', new Schema({ 
    User: User.schema,
    Restaurant:{type:Restaurant.schema,default:null},
    BookMarks:[{type:Schema.Types.ObjectId}],
    Logger:[{type:Logger.schema,default:null}]
}));