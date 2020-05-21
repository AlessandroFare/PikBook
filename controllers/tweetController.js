const Tweet = require('../models/Tweet');
const moment = require('moment');
const User = require('../models/User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const cloudinary = require('cloudinary').v2;
const path = require('path');


//config cloudinary env variables
require('dotenv').config({ path: 'C:/Users/Ale14/OneDrive/Documenti/HTML-CSS-JS/pikbook/.env' });

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
  });
  
// Home page to list all tweets
exports.postTweet = async (req, res) => {
	try {
		req.body.author = req.user._id;
		const tweet = new Tweet(req.body);
		tweet.avatar = req.body.avatar;
		await tweet.save();
		res.redirect('back');
		// res.json(req.body)

	} catch (e) {
		console.log(e);
		res.redirect('/?msg=Failed to tweet')
	}
}




// Delete a tweet controller
// Tweet deleting function
const confirmedOwner = (tweet, user) => {
	if(!tweet.author.equals(user._id)) {
		// You don't have permission to delete this.
		throw Error('You don\'t have permission to delete this')
	}
}


exports.deleteTweet = async (req, res) => {
	try {
		const tweet = await Tweet.findOne({ _id: req.params.id });
		if(!req.user.username === 'ale14798') {			
			confirmedOwner(tweet, req.user);
		}

		const deleteTweet = await Tweet.deleteOne(tweet);
		res.redirect('back')
	} catch (e) {
		console.log(e);
		res.redirect('/?msg=Failed to delete')
	}


}

// Getting a single Tweet 
exports.singleTweetPage = async (req, res) => {
	try {
		const user = req.user;
		const tweet = await Tweet.findOne({ _id: req.params.id }).populate('author');
		res.render('single', { tweet, moment, user });
		
	} catch (err) {
		console.log(err);
		res.redirect('/?msg=No tweets found')
	}

}

//Upload images
const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isImage = file.mimetype.startsWith('image/');

		if(isImage) {
			next(null, true);
		} else {
			next({message: 'You must supply a valid image file.'}, false)
		}
	}
}

exports.upload = multer(multerOptions).single('avatar');

exports.resize = async (req, res, next) => {
	if(!req.file) {
		next();
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.avatar = `${uuid.v4()}.${extension}`;
	const image = await jimp.read(req.file.buffer);
	await image.resize(600, jimp.AUTO).quality(100);
	await image.writeAsync(`./public/uploads/${req.body.avatar}`);
	cloudinary.uploader.upload(`./public/uploads/${req.body.avatar}`, {public_id: `${req.body.avatar}`.split('.')[0], format: `${req.body.avatar}`.split('.')[1]}, function(result) { 
		console.log(result);});
	next();
}


exports.heartTweet = async (req, res) => {
	try {
	const tweet = await Tweet.findByIdAndUpdate(
		req.params.id,
		{ $inc: {likes: 1} },
		{ new: true }
	);
	
	res.send({message: tweet.likes.toString()});
	}
	catch (err) {
		console.log(err);
		res.redirect('/?msg=No tweets found')
	}
}

exports.commentTweet = async (req, res) => {
	try {
	const comment = req.body.myData;
	const tweet = await Tweet.findByIdAndUpdate(
		req.params.id,
		{ $push: {comments: comment} },
		{ new: true }
	);
	
	res.send({message: comment});
	}
	catch (err) {
		console.log(err);
		res.redirect('/?msg=No tweets found')
	}
}
