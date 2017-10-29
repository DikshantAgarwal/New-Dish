'use strict'

var Logger = require('../services/loggerService');

module.exports=function(err,req,res,next)
{
    var _id;
    if(req&&req.decoded&&req.decoded.id)
    {
       _id=req.decoded.id; 
    }
    else
    {
        _id=null
    }
Logger.logger(err,_id,req.body,'Exception MiddleWare',err.stack);
res.status(520).send({success:false,message:err.stack});
}

////520 Unknown Error////
//The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.