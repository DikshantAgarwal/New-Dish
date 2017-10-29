'use strict'
var Account = require('../models/account');
var Logger = require('../models/logger');
//custom error handler
exports.logger = function (err, userid, params, location, msg) {

    var _logger = new Logger({
        UserId: userid,
        Params: JSON.stringify(params),
        Location: location,
        Msg: msg,
        Error: err
    });


    _logger.save(function (er, result) {
        if (er) {
            console.log(er);
        }
        if (result) {
            console.log('error saved to DB');
        }
    });

}