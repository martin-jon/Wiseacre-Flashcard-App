/*
this module contains all the code for the quiz functionality...
it's pretty simple as it stands now: when a user clicks on the "Start The Quiz" button, 
a quiz is generated from flashcard questions that the user created and is then saved in the 
mongo database. the score percentage is a work in progress: it is currently determined 
by evaulating correct answers based a score out of a total of 5 flashcard questions.
*/

angular.module('tags', ['wiseacreflashcardapp.services.tags'])
.config(function ($stateProvider) {
  $stateProvider
    .state('wiseacreflashcardapp.tags', {
      url: '/',
      views: {
        'tags@': {
          controller: 'TagsController as tagsController',
          templateUrl: 'app/Tags/tags.html'
        },
        'questions@': {
          controller: 'QuestionsController as questionsController',
          templateUrl: 'app/Tags/Questions/questions.html'
        },
        'quiz@': {
          controller: 'QuizController as quizController',
          templateUrl: 'app/Quiz/quizTemplate.html'
        }
      }
    });
})
.controller('TagsController', function TagsController(TagsService) {
  var tagsController = this;
  TagsService.getAllTags()
    .then(function (result) {
      tagsController.tags = result;
    });
});
