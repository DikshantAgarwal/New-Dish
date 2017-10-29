'use strict'

var azure = require('azure-storage');
var blobService = azure.createBlobService('DefaultEndpointsProtocol=https;AccountName=joint;AccountKey=6uISttNpITdA7D6Pdkk2KN5ESuuZNPuPSV07/MSFTF3Zxr5VlzEuzLX1+K+/cw6G1HhCdjrUxWr67C83foHA7Q==;EndpointSuffix=core.windows.net');
var jimp=require('jimp');
var streamifier = require('streamifier');
//add size and name in function 
exports.uploadToAzure=function(file,callback)
{
  var imagename = file.originalname;
  var exist=true;

  var res = imagename.split(".");
    imagename=res[0]+'.jpg';
  // while(exist==true)
  // {
  //  blobService.doesBlobExist('jointcontainer',imagename,function(err,result,response){
  //  if(err)
  //  {
  //   console.log(err);
  //  }
  //  console.log(result);
  //  if(result.exists===true)
  //  {
  //   var random=Math.floor((Math.random()*(9-1)+1));
  //   var res = imagename.split(".");
  //   imagename=res[0]+random+'.'+res[1];
  //   console.log(imagename);
  //   exist=true;
  //  }
  //  else if(result.exists===false)
  //  {
  //    exist=false;
  //    console.log('false');
  //  }
  //  });
  // }
  
  // jimp.read(file.buffer,function(err,image)
  // {
  //   if(err)
  //     {
  //       console.log(err);
  //       console.log('Hi');
  //     }

  //     image.resize(600,600).
  //     getBuffer( jimp.MIME_JPEG, uploadToAzure);
  //   });

  uploadToAzure(file.buffer);

      function uploadToAzure(buffer)
      {
 var stream = streamifier.createReadStream(buffer);   




 blobService.createBlockBlobFromStream('jointcontainer',imagename,stream, file.size, function(error, result,response) {
   console.log(file.size);
  if (error) {
     console.log(error);
   }
   if(response.isSuccessful==true)
     {
       
       callback(error,imagename);
       
     }
     else
     {
      callback(error,null);
     }
     
 });

}
}