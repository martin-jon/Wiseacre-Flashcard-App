var questionsController = require('./questionController.js');

// app is equal to the questionRouter injected from middleware.js

module.exports = function (app) {

// middleware is setup so that this route path is /api/questions
  app.get('/', questionsController.fetchAllQuestions);
  app.post('/', questionsController.postNewQuestion);
  app.put('/delete', questionsController.deleteQuestion);

};
