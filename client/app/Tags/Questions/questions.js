/*
this module and controller talks to the questions view and communicates with the questions service
for requests to the back end and other methods that are available through the questions service
*/

angular.module('tags.questions', ['wiseacreflashcardapp.services.tags', 'wiseacreflashcardapp.services.questions'])
.config(function ($stateProvider) {
  $stateProvider
    .state('wiseacreflashcardapp.tags.questions', {
      url: 'tags/:tag',
      views: {
        'questions@': {
          templateUrl: 'app/Tags/Questions/questions.html',
          controller: 'QuestionsController as questionsController'
        }
      }
    });
})
.controller('QuestionsController', function ($scope, $filter, $stateParams, $state, TagsService, QuestionsService) {
  var questionsController = this;

  TagsService.setCurrentTag($stateParams.tag);

  // this to initialize the app with a local cache of the current questions 
  // that are in the database. it would be empty if it's the user's first time using the app
  // this local client cache is used to render the questions in the view
  QuestionsService.showAllQuestions()
    .then(function (questions) {
      questionsController.questions = questions;
    });

  // this is my inital attempt to begin a way to update a previously entered question
  // it is not working at this moment in time
  function updateQuestions () {
    QuestionsService.showAllQuestions()
      .then(function (questions) {
        questionsController.questions = questions;
      });
  }

  // this adds a new question to the database and local cache once the user submits it
  function addNewQuestion () {
    QuestionsService.addNewQuestion(questionsController.newQuestion)
      .then(function (newQuestion) {
        questionsController.questions.push(newQuestion);
        questionsController.addingQuestion = false;
        returnToQuestions();
        resetForm();
      });
  }

  // once a user submits a new question, they return back to the current tag state
  function returnToQuestions () {
    $state.go('wiseacreflashcardapp.tags.questions', {tag: $stateParams.tag});
  }

  function resetForm () {
    questionsController.newQuestion = {
      text: '',
      answer: '',
      tag: $stateParams.tag
    };
     returnToQuestions();
   }

   function quizMe () {
    questionsController.quizTime = !questionsController.quizTime;
    QuestionsService.quizTime();
   }

   /*
   deleting a question has proven difficult because the questions also need to be deleted from the
   category tag it's associated with in the backend. each category tag has a "questions" property with an 
   array of all it's questions. the removal of a question from a tag is done in the back-end 
   as an interim fix code below finds the index of the question in the local cache and removes that 
   question so that at least the most current view can reflect the deletion of the question
   */

   function deleteQuestion (question) {
    console.log('delete', question);
    var copyOfQuestion = angular.copy(question);
    QuestionsService.deleteQuestion(question);
    var index = _.findIndex(questionsController.questions, function (question) {
        return question.text === copyOfQuestion.text;
      });
        console.log(index, 'index');
        questionsController.questions.splice(index, 1);
   }

   // functions that need to be exported
  questionsController.getCurrentTag = TagsService.getCurrentTag;
  questionsController.getCurrentTagName = TagsService.getCurrentTagName;
  questionsController.addNewQuestion = addNewQuestion;
  questionsController.deleteQuestion = deleteQuestion;
  questionsController.quizMe = quizMe;
  questionsController.updateQuestions = updateQuestions;

  resetForm();
});
