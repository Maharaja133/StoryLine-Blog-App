const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: { type: String, required: true },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema], // Embed comments here
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);