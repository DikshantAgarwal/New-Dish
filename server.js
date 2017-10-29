// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file



//modals
var Account   = require('./app/models/account'); // get our mongoose model
var Restaurant   = require('./app/models/restaurant'); // get our mongoose model
var User   = require('./app/models/user'); // get our mongoose model
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));



//[test method-Mic testing 123]
app.get('/', function(req,res) {
  return res.status(200).send({message:"all route are good in PORT=>"+port});
});


     
// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router();
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);  

 

//Register[no authentication middleware interfere]
var user=require('./app/controllers/userController');
apiRoutes.post('/addAccount',user.addAccount);

//Authentication[no authentication middleware interfere]
apiRoutes.post('/authenticate',user.authentication);

//OTPVerification[no authentication middleware interfere]
apiRoutes.post('/validateSMS',user.validateSMS);

//[Mic Testing 123]
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
}); 


//TODO: route middleware to verify a token
var authMiddleware=require('./app/middlewares/authMiddleware');
apiRoutes.use(authMiddleware);




//authenticated api controllers
var routes=require('./app/routes/route');
routes(app,apiRoutes);


//error handling middleware
var exceptionMiddleware = require('./app/middlewares/exceptionMiddleware');
apiRoutes.use(exceptionMiddleware);



// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);