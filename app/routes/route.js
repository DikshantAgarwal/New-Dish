'use strict';



module.exports = function(app,apiRoutes) {

   

var restaurant=require("../controllers/RestaurantController");
apiRoutes.post('/addRestaurant',restaurant.addRestaurant);
apiRoutes.post('/editRestaurant',restaurant.editRestaurant);
apiRoutes.get('/getRestaurant',restaurant.getRestaurant);
//general
apiRoutes.get('/getRestaurants',restaurant.getRestaurants);


var multer  = require('multer');
var upload = multer();
var restaurant=require("../controllers/RestaurantController");
apiRoutes.post('/uploadSnapShot',upload.single('photo'),restaurant.uploadSnapShot);

var bookmark=require("../controllers/BookmarkController");
apiRoutes.post('/setBookmark',bookmark.setBookmark);

var review=require('../controllers/ReviewsController');
apiRoutes.post('/addReview',review.addReview)
}
