var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/mongotest', function(error, db){
		db.collection('teams').find().toArray(function(error, result){
			console.log(result)
		})
	});

	//index page should load random picture/item
	//1. Get all pictures from the MongoDB
	//2. Get the current user from MongoDB vai req.ip
	//3. Find which photos the current user has NOT voted on
	//4. Load all those photos into an array.
	//5.Choose a random image from teh array and set it to a var
	//6. res.render the index view and send it the photo

	var serverPhotos = [
		{name: 'http://chadconway.pbworks.com/f/1253765817/news-electriccar1.jpg' },
		{name: 'https://c2.staticflickr.com/2/1307/4700132636_cd67861c4b_b.jpg' }
	];


  res.render('index', { photos: serverPhotos });
});

router.get('/standings', function(req, res, next) {
	//1. get ALL the photos
	//2. Sort them by highest likes
	//3. res.render the standings view and pass it the sorted photo array 
	res.render('index', {title: 'Standings'});
});

router.post('*', function(req,res,next){
	//this will run for all posted pages
});

module.exports = router;




