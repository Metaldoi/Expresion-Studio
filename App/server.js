var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('mongoskin').db("localhost/prueba", { w: 0});
    db.bind('events');


var port = Number(process.env.PORT || 3005);   

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));





app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.get('/data', function(req, res){
	db.events.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		
		//output response
		res.send(data);
	});
});


 //MongoDB


//Setting data
   app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;


	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;

		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}

	if (mode == "updated")
		db.events.updateById( sid, data, update_response);
	else if (mode == "inserted")
		db.events.insert(data, update_response);
	else if (mode == "deleted")
		db.events.removeById( sid, update_response);
	else
		res.send("Not supported operation");
});
   

var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    next();
});

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}


// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    next();
});

// // mongoose
// mongoose.connect('mongodb://localhost/cuentas');

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });




app.listen(port);

