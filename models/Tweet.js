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
		type: Number,
		required: true
	},

	comments: [{
		type: String,
		required: true
	}]
});
module.exports = mongoose.model('Tweet', tweetSchema);
