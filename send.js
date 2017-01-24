var twilio = require('twilio');
var client = ('AC665ad6b2451b4e7f6dbdecd1c0382c41', '596a92f51417a69a029313cd48fcc7ba');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//converts the JSON to parts that only parses urlencoded bodies.
app.use(bodyParser.urlencoded({extended: true}));

//req'uest' is the input
//res'ponse' is the output
//'/sms' refers to like the name of the folder
app.post('/sms', function(req, res) {
	//console.log print it on the console (command prompt)
	//req is a JSON file, so we want the body of the body to get the input
	//investigate what req.body does instead of req.body.body.
	console.log(req.body.Body);
	//including a library and renaming it 'twilio'
    var twilio = require('twilio');
	//creating a new twiml which is the response
    var twiml = new twilio.TwimlResponse();
    twiml.message(function() {
		//media tell the twiml(response) that it is a mms and not an sms.
		this.media('https://api.wolframalpha.com/v1/simple?i='+(encodeURIComponent(req.body.Body))+'&appid=L3EWK7-AR323PGRAE');
	});
	console.log('https://api.wolframalpha.com/v1/simple?i='+(encodeURIComponent(req.body.Body))+'&appid=L3EWK7-AR323PGRAE');
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});



http.createServer(app).listen(1337, function (){
	console.log("Listening on 1337");
});