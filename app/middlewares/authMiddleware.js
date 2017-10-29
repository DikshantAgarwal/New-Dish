'use strict'
var config = require('../../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Logger=require('../services/loggerService');
//middleware for authentication
module.exports=function(req, res, next) {
    
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
      // decode token
      if (token) {
    
        // verifies secret and checks exp
        jwt.verify(token,config.secret, function(failed,decoded) {      
          if (failed) {
            Logger.logger(failed,null,req.body,'authMiddleware','Failed to authenticate token.');  
            return res.status(498).send({ success: false, message: 'Failed to authenticate token.' });    
        //498-Invalid Token (Esri)
        //Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token  
        } else {
            
            req.decoded = decoded; 
           // console.log(req.decoded);   
            next();
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        Logger.logger(null,null,req.body,'authMiddleware','Unauthorised');
        return res.status(401).send({ 
            success: false, 
            message: 'Unauthorized' 
        });
    
      }
    }

    //401 Unauthorized (RFC 7235)
//Similar to 403 Forbidden, but specifically for use when 
//authentication is required and has failed or has not yet been provided. 
//The response must include a WWW-Authenticate header field//
// containing a challenge applicable to the requested resource. 
//See Basic access authentication and Digest access
// authentication.[33] 401 semantically means "unauthenticated",
//[34] i.e. the user does not have the necessary credentials.