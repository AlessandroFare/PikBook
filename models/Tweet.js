const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
	tweet: {
		type: String,
		required: true,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	avatar: String,

	
	likes: {
		type: Number
	},

	comments: [{
		type: String
	}]
});
module.exports = mongoose.model('Tweet', tweetSchema);
