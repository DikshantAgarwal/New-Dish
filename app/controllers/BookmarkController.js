'use Strict'

var Logger=require('../../app/services/loggerService');

var Account = require('../../app/models/account');

exports.setBookmark = function (req, res) {

    var bookmarkownerId = req.body.BookmarkId;

    Account.findOne({
        _id: req.decoded.id,
        BookMarks: {
            $eq: bookmarkownerId
        }
    }, foundStatus);

    function foundStatus(err, result) {
        if (err) {
            Logger.logger(err,req.decoded.id,req.body,'BookMarkController setBookmark','Not able to find bookmark with current bookmarkID');
            return res.status(400).send({success:false,msg:'Not able to find bookmark with current bookmarkID'});
        }

        if (result) {
            pullrequest();
           
        } else {
            addtoBookmarks();
        }
    }



    function pullrequest(err, result) {

        Account.update({
            _id: req.decoded.id
        }, {
            $pull: {
                BookMarks: bookmarkownerId
            }
        }, function(err,result){
        if (err) {
            Logger.logger(err,req.decoded.id,req.body,'BookMarkController setBookmark','Not able to Perform pull request');
            return res.status(400).send({success:false,msg:'Not able to Perform pull request'});
        }
        else if (result.nModified === 0) {
            Logger.logger(err,req.decoded.id,req.body,'BookMarkController setBookmark','nModified is 0 in pull request');
            return res.status(400).send({
                success: false,
                msg: "request not completed successfully"
            });

        if (result.nModified === 1) {
            res.status(200).send({success:true,msg:"nModified is 0 in pull request"});
        }
    }
    });
    }


    function addtoBookmarks() {

        //write logic for (id existence) and (it is of Type:owner).then(run below code); 
        Account.update({
            _id: req.decoded.id
        }, {
            $addToSet: {
                BookMarks: bookmarkownerId
            }
        }, function (err, result) {
            if (err) {
                Logger.logger(err,req.decoded.id,req.body,'BookMarkController setBookmark','Not able to perform add to bookMark')
                return res.status(500).send({
                    success: false,
                    msg: 'Not able to perform add to bookMark'
                });
            } else if (result.nModified === 0) {
                Logger.logger(err,req.decoded.id,req.body,'BookMarkController setBookmark','nModified 0 in add to bookMark')
                return res.status(400).send({
                    success: false,
                    msg: "nModified 0 in add to bookMark"
                });
            } else {
                res.status(200).send({
                    success: true,
                    msg: "added to bookmarks successfully"
                });
            }
        });

    }

}