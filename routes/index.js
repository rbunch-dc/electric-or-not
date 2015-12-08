var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/electric', function(error, db){
		//1. Get all pictures from the MongoDB
		db.collection('photos').find().toArray(function(error, result){
			console.log(result);
			//5. Choose a random image from teh array and set it to a var
			var rand = Math.floor(Math.random()*result.length);
			//6. res.render the index view and send it the photo
			res.render('index', { photo: result[rand] });
		})
	});	

	//2. Get the current user from MongoDB vai req.ip
	//3. Find which photos the current user has NOT voted on
	//4. Load all those photos into an array.

});

router.get('/standings', function(req, res, next) {
	//1. get ALL the photos
	//2. Sort them by highest likes
	//3. res.render the standings view and pass it the sorted photo array 
	res.render('index', {title: 'Standings'});
});

router.post('/electric', function(req,res,next){
	MongoClient.connect('mongodb://localhost:27017/electric', function(error, db){
		db.collection('users').insertOne( {
	      ip: req.ip,
	      vote: "electric",
	      image: " "
		});
		res.redirect('../');
	});	
});
function vote(req, res){
}

module.exports = router;
