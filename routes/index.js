// Calling the modules
const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');
const multer = require('multer');

// Index page
router.get('/', appController.indexPage);

// Single tweet page 
router.get('/tweet/:id', tweetController.singleTweetPage);

// API
////////////////////////////////
//router.post('/', tweetController.heartTweet)

// Registration page
router.get('/register', userController.registerPage);

// Registration POST request
router.post('/register',
	userController.verifyRegister,
	userController.checkUserExists,
	userController.registerUser,
	authController.login
)

// Login POST action
router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);


// Account page
router.get('/account',
 	authController.isLoggedIn,
	userController.accountPage);

router.post('/account',
	userController.upload,
	userController.resize,
	userController.accountUpdate);

// Uploading a profile image
router.post('/upload',
	userController.upload,
	userController.resize,
	userController.accountUpdate);

// Tweet Specific routes
///////////////////////////////
router.post('/tweet', tweetController.upload,
tweetController.resize,tweetController.postTweet);

router.get('/delete/:id',
	authController.isLoggedIn,
	tweetController.deleteTweet);

router.get('/deleteaccount/:username', userController.deleteAccount);

// Profile Page at the end because :username
router.get('/:username', userController.profilePage);

// Exporting the module
module.exports = router;
