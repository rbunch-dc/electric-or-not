var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// var mongoUrl = 'mongodb://localhost:27017/electric';
 var mongoUrl =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost:27017/electric';

var db;

	// MongoClient.connect(mongoUrl, function(error, database){db = database;});

	var db = mongo.db(process.env.MONGOLAB_URI, {native_parser:true});

/* GET home page. */
router.get('/', function(req, res, next) {
		//1. Get all pictures from the MongoDB

		var currIP = req.ip;
		db.collection('users').find({ip: currIP}).toArray(function(error, userResult){
			//2. Get the current user from MongoDB vai req.ip

			var photosVoted = [];
			for(i=0;i<userResult.length;i++){
				photosVoted.push(userResult[i]);
			}

			db.collection('photos').find({photo: {$nin: photosVoted}}).toArray(function(error, result){
				var rand = Math.floor(Math.random() * result.length);
				if(result.length == 0){
					res.render('standings', {awesomeProperty: "you've voted"});
				}else{
					res.render('index', {photo: result[rand]});
				}

			});
		});	

});

router.get('/standings', function(req, res, next) {
	//1. get ALL the photos
	//2. Sort them by highest likes
	//3. res.render the standings view and pass it the sorted photo array 

	MongoClient.connect(mongoUrl, function(error, db){
		//1. Get all pictures from the MongoDB
		db.collection('photos').find().toArray(function(error, result){
			//Pass all votes

			result.sort(function(p1, p2){
				return (p2.totalVotes - p1.totalVotes);
			});

			res.render('standings', {photosStandings: result});

		});	
	});
});

router.post('*', function(req,res,next){
	if(req.url == '/electric'){
		var page = 'electric';
	}else if(req.url == '/poser'){
		var page = 'poser';
	}else{
		res.redirect('/');
	}
	MongoClient.connect(mongoUrl, function(error, db){
		db.collection('photos').find({image: req.body.photo}).toArray(function(error, result){
			var updateVotes = function(db, votes, callback) {
				if(page=='electric'){var newVotes = votes+1;}
				else{var newVotes = votes-1;}
				
			   db.collection('photos').updateOne(
			      { "image" : req.body.photo },
			      {
			        $set: { "totalVotes": newVotes },
			        $currentDate: { "lastModified": true }
			      }, function(err, results) {
			      console.log(results);
			      callback();
			   });
			};

			MongoClient.connect(mongoUrl, function(error, db) {
				updateVotes(db,result[0].totalVotes, function() {});
			});
		});
	});	

	MongoClient.connect(mongoUrl, function(error, db){

		db.collection('users').insertOne( {
	    	ip: req.ip,
	    	vote: page,
	    	image: req.body.photo
		});
		res.redirect('/');
	});	
});


module.exports = router;


