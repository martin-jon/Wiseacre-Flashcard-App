var mongoose = require('mongoose');
var crypto = require('crypto');
Schema = mongoose.Schema;
var Tag = require('../tags/tagModel.js');


var QuestionSchema = new Schema({
  _tag: {
   type: String,
   required: true
 },

  text: {
    type: String,
    required: true
  },

  answer: {
    type: String,
    required: true
  },

  _creator: {
    type: String,
    ref: 'Tag'
  }
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
