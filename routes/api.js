var express = require('express');
var router = express.Router();
var mongoUrl = 'mongodb://localhost:27017/electric';
var db;
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);
var Photo = require('../models/photos');
var Users = require('../models/users')

/* GET home page. */
router.get('/photos/get', function (req, res, next) {
	Photo.find(function(err,photosResult){
		if (err){
			console.log(err);
		}else{
			res.json(photosResult);
		}
	})
});

router.post('/photos/post', function (req,res,next){
	var photo = new Photo();
	photo.image = req.body.image;
	console.log(photo.image);
	photo.totalVotes = 0;

	photo.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.json({message: 'Photo added!'});
		}
	})

});

router.delete('/photos/delete', function (req, res, next){
	Photo.remove({
		_id: req.params.photo_id
	}, function(err, photo){
		if(err){
			console.log(err);
		}else{
			res.json({message: "Successfully deleted!"});
		}
	})
});

router.get('/users/get', function (req, res, next) {
	Users.find(function(err,usersResult){
		if (err){
			console.log(err);
		}else{
			res.json(usersResult);
		}
	})
});

module.exports = router;