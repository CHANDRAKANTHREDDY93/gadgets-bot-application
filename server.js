
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./app/config');

var app = express();
var PORT = process.env.PORT || 3000;

mongoose.connect(config.database, function(err) {
	if(err) {
		console.log(err);
	}
	else
	{
		console.log('Connected to the database');
	}
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
/*app.use(app.router);*/

var phoneApi = require("./app/routes/phoneRoute")(app, express);

app.use('/api', phoneApi);

app.use(express.static(__dirname + '/'));

app.listen(PORT, function(){
	console.log("Express listening on PORT " + PORT);
})