'use strict'

var Review = require('../../app/models/review');
var Account=require('../../app/models/account')

var Logger=require('../../app/services/loggerService');

exports.addReview=function(req,res)
{
 var restaurantId=req.body.RestaurantId;//restaurant is userId of particular restaurant
 var comment=req.body.Comment;
 var rating=req.body.Rating;
 var bestDish=req.body.BestDish;

 var review=new Review({
    UserId:req.decoded.id, 
    Rating:rating,
    Comment:comment,
    BestDish:bestDish
 });

 Account.update({_id:restaurantId,'Restaurant.Reviews.UserId':{$ne:req.decoded.id}},{$push:{'Restaurant.Reviews':review}},function(err,result){
     if(err)
     {
        Logger.logger(err,req.decoded.id,req.body,'ReviewsController addReview','not able to push result in query');
        return res.status(500).send({success:false,msg:'not able to push result in query'});
         
    }
     if(result.nModified===0)
     {
        Logger.logger(result,req.decoded.id,req.body,'ReviewsController addReview','not modified');
        return res.status(400).send({success:false,msg:'not modified'})
         
     }
     else if(result.nModified===1)
     {
         res.status(200).send({success:true,msg:"request completed sucessfully"});
     }


 });

}

