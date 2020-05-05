const Tweet = require('../models/Tweet');
const moment = require('moment');
// The default controller for this app
// The home page
exports.indexPage = async (req, res) => {
	try {
		
		const tweets = await Tweet.find({ })
		.populate('author')
		.limit(50)
		.sort({ created: 'desc' });
		res.render('index', { tweets, moment });

	} catch (e) {
		console.log(e);
		res.redirect('/error')
	}

}

// Getting the account page
