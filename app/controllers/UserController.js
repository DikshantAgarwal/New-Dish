'use strict'

var bcrypt = require('bcryptjs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var Account   = require('../../app/models/account'); // get our mongoose model
var User      = require('../../app/models/user')

var service=require('../services/commonService');//email,sms Service 








//added in server.js for no authentication
exports.addAccount=function(req,res)
 {

//random otp generator
  var otpPin=Math.floor((Math.random()*(99999-10000)+10000));

    var user=new User({
       Name:req.body.Name,
       Password:req.body.Password,
       Email:req.body.Email,
       Mob:req.body.Mob,
       TempMobLink:otpPin
    });
   
     var invalid = user.validateSync();
     if(invalid)
     {
      return res.status(400).send(Invalid);
     }
    
    bcrypt.genSalt(10,getSalt); 
    
    function getSalt(err,salt)
    { 
    if(err)
    {
     return res.status(500).send({success:false,msg:"error in bycrypt.gensalt"});
    }
    else
    {
    bcrypt.hash(user.Password,salt,getHash); 
    }
    }
    
      function getHash(err,hash)
        {
        if(err)
        {
        return res.status(500).send({success:false,msg:"error in bycrypt.hash"});  
        }
        else
        {
        createAccount(hash);
        }
        }

        function createAccount(hash)
        {
         user.Password=hash;

         var account=new Account({
         User:user
         });
    
   
         invalid = account.validateSync();
         if(invalid)
         {
         return res.status(400).send(Invalid);
         }
   
       account.save(function(err,result)
          {
         if(err)
          {
          return  res.status(500).send({success:false,msg:"something went worng"})
          }
        
           if(result)
           {
             //add request sms otp here 
            res.status(200).send({success:true,msg:"request completed successfully"});
           }
          
        
          });
    }

    }
    
    
    
exports.authentication = function(req,res)
{

    var _name = req.body.Name;
    var query = {"User.Name":_name};

    Account.findOne(query, function(err, acc) {

    if (err) 
    {
    return res.status(500).send({success:false,msg:"error in query"});
    }

    if (!acc) 
        {
     return res.status(400).send({ success: false, message: 'Authentication failed. User not found.' });
        } 
     else{
     
    bcrypt.compare(req.body.Password, acc.User.Password, function(err, result) {
  
    if(err)
    {
      return res.status(500).send({success:false,msg:"error"});  
    }

    if(result===true)
      {
     var token = jwt.sign({"id":acc.id},"ilovescotchyscotch", {
          expiresIn : 60*60*24
        });

      return   res.status(200).send({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
      else
        {
     res.status(400).send({ success: false, message: 'Authentication failed. Wrong password.' });
      }
});
    }

  });
}

exports.validateSMS=function(req,res)
{
var mob=req.body.mob;
var otp=req.body.otp;

Account.findOne({'User.Mob':mob},function(err,acc){
if(err)
{
return  res.status(500).send('some error occured in finding account for otp'); 
}

if(!acc)
{
  return res.status(400).send('no element found');
}
else
{
  
 if(acc.User.TempMobLink===otp)
  {
    Account.update({_id:acc._id},{$set:{'User.IsAuthenticatedMob':true}},function(err,result){
  if(err)
{
  return res.status(500).send('some error occured while upadting IsAuthenticatedMob true');
}

if(result.nModified===0)
{
  return res.status(400).send('failed');
  
}
else
  {
     res.status(200).send('Authenticated');
    // res.writeHead(302,
    //      {Location: 'https://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection'}

    //     );
    //     res.end();
 
  }

    });
  }
  }
});

}
     





exports.validateEmail=function(req,res)
{
   var emailId = req.query.emailId;  
   var secretCode =req.query.code;

Account.findOne({'User.Email':emailId},function(err,acc){
if(err)
  {
    return res.status(500).send('some error occured');
  }

if(!acc)
  {
    return res.status(400).send('no element found');
  } 
else
  {
    
   if(acc.User.TempEmailLink===secretCode)
    {
      Account.update({_id:acc._id},{$set:{'User.IsAuthenticatedEmail':true}},function(err,result){
    if(err)
  {
    return res.status(500).send('some error occured');
  }

  if(result.nModified===0){
    return res.status(400).send('failed');
    
  }
  else
    {
      res.writeHead(302,
           {Location: 'https://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection'}

          );
          res.end();
   // res.status(200).send('Authenticated');
    }

      });
    }

  } 

});


}
    


