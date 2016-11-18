var mongoose = require('mongoose');
var crypto = require('crypto');
Schema = mongoose.Schema;
var Question = require('../questions/questionModel.js');

// tags are associated with flashcard questions through the flashcard question field. it's ref is therefore 
// set to be the question model. important here to match the type of _id to the type of ref.
// this was adapted from http://mongoosejs.com/docs/populate.html

var TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]

});

var Tag = mongoose.model('Tag', TagSchema, 'tags');

module.exports = Tag;
