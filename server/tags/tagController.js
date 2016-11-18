var Tag = require('./tagModel.js');
var Question = require('../questions/questionModel.js');
var Q = require('q');


module.exports = {
  fetchAllTags: function (request, response, next) {
    // creates a promise returning function
    var findAll = Q.nbind(Tag.find, Tag);
    // finds all tags in the mongo database and return as a json response
    findAll({})
      .then(function (tags) {
        response.json(tags);
      })
      .fail(function (error) {
        next(error);
      });
  },

  addNewTag: function (req, res, next) {
    var name = req.body.tagName;
    // creates a promise returning function
    var createTag = Q.nbind(Tag.create, Tag);

    // adds new category tag to the database
    var newTag = {
      name: name
    };
    createTag(newTag)
    .then(function (createdTag) {
      if (createdTag) {
        res.json(createdTag);
      }
    })
    .fail(function (error) {
      next(error);
    });
  }
};
