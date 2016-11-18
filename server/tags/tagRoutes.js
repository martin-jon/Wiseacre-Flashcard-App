var TagsController = require('./tagController.js');

// app is equal to the variable tagRouter that is injected from config/middleware.js

module.exports = function (app) {

// sets up the middleware so that this route path is /api/questions 
  app.get('/', TagsController.fetchAllTags);
  app.post('/', TagsController.addNewTag);

};
