var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Snapshot=require('./snapshot');
var Review=require('./review');

module.exports = mongoose.model('Restaurant', new Schema({  
    Name:{type:String,required:[true,"title is required"]},
    Branch:{type:String,required:[true,"branch is required"]},  //locality in particular city.
    Mobile:{type:Number,required:[true,"Mobile is required"]},
    Time:{type:String},//06:30AM to 11:00PM
    Cuisines:{type:String},//Multicusine,Punjabi
    Type:{type:String},//casual dining,Pub
    AverageCost:{type:Number},//for 2 people
    Address:{type:String},
    BestDishes:[{type:String}],
    MyBestDishes:[{type:String}],//add by us
    More:[{type:String}], //currently disable      //features in your restaurant--wifi,buffet,smokingArea
    Deals:String,
    Snapshots:[Snapshot.schema],
    Reviews:[Review.schema],
    Created:{type:Date,default:Date.now}
},{_id:false}));
