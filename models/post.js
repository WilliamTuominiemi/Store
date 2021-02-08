const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const PostSchema = new Schema(
	{
		posterId: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String
		},
		username: {
			type: String,
		},
		privacy: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

// Model
module.exports = mongoose.model('Post', PostSchema)
