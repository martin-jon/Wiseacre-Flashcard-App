var Question = require('./questionModel.js');
var Tag = require('../tags/tagModel.js');
var Q = require('q');


module.exports = {
  fetchAllQuestions: function (req, res, next) {
    // this creates a promise returning function
    var findAll = Q.nbind(Question.find, Question);

    // find all the questions in our questions model and return as a json object
    findAll({})
      .then(function (questions) {
        res.json(questions);
      })
      .fail(function (error) {
        next(error);
      });
  },

  // the questions are associated with tags as a one to many relationship in the mongo database
  // (a category tag can have many questions, and a question can only have one category tag)
  // these questions are listed as an array of ObjectIds in the associated Tags.
  // mongo does not handle the deletion of this association for us automatically. this is
  // why we find the id of the question we are deleting using the "ques._creator" property we 
  // set up when defining the relationship. and this id will be used to delete it from the questions 
  // array in the associated tag.
    
  deleteQuestion: function (req, res, next) {
    funct
    var findQuestion = Q.nbind(Question.find, Tag);
    var text = req.body.text;
    var tag = req.body._tag;
    var id;
    console.log(text);
    findQuestion({'text': text})
      .then(function (err, ques) {
        id = ques._creator;
        // ques.remove().exec();
      });

    Question.find({text: text}).remove().exec();
    findTag({name: tag})
      .then(function (foundTag) {
        console.log(foundTag);
        var index = foundTag.questions.indexOf(id);
        foundTag.questions.splice(index, 1);
        if (foundTag.questions.length <= 0) {
          foundTag.remove().exec();
        }
        foundTag.save();
        });
  },

  // when a new question is posted, it's associated category tag must also be created. 
  // so we declare the Question _creator property as a Number, the same type
  // as the _id used in the TagSchema. then we populate the new question's _creator 
  // property to create the association (line 122). this is how it's done in Mongo. 
  // See the docs for reference: http://mongoosejs.com/docs/populate.html
   
  postNewQuestion: function (req, res, next) {
    var text = req.body.text;
    var answer = req.body.answer;
    var tag = req.body.tag;
    var createQuestion = Q.nbind(Question.create, Question);
    var findTag = Q.nbind(Tag.findOne, Tag);
    var createTag = Q.nbind(Tag.create, Tag);

    findTag({name: tag})
    .then(function (foundTag) {
      if (foundTag) {

          var newQuestion = new Question({
            text: text,
            answer: answer,
            _tag: foundTag.name,
            _creator: foundTag._id
          });

          newQuestion.save(function (err) {
            if (err) {
              return console.error(err);
            }
            foundTag.questions.push(newQuestion);
            foundTag.save(function (err) {
              if (err) {
                return console.error(err);
              }
            });
            console.log('new question', newQuestion);
            res.json(newQuestion);
          });

      } else {

        var newTag = new Tag({
          name: tag
        });

        var newQuestion = new Question({
          text: text,
          answer: answer,
          _tag: newTag.name,
          _creator: newTag._id
        });

        newQuestion.save(function (err) {
          if (err) {
            console.error(err);
          } else {
            newTag.save(function (err) {
              if (err) {
                return console.error(err);
              }
              newTag.questions.push(newQuestion);
              res.json(newQuestion);
            });
          }
        });
    }
      Question.findOne({text: text}).populate('_creator').exec(function (err, story) {
        if (err) {
          return console.error(err);
        }
        console.log('successfully populated!'); // this will set up the relationship between question and tag
      });
    });
  }
};
