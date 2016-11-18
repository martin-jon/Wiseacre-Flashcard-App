/*
this module contains all the code for the quiz functionality...
it's pretty simple as it stands now: when a user clicks on the "Start The Quiz" button, 
a quiz is generated from flashcard questions that the user created and is then saved in the 
mongo database. the score percentage is a work in progress: it is currently determined 
by evaulating correct answers based a score out of a total of 5 flashcard questions.
*/

angular.module('quiz', ['tags.questions', 'wiseacreflashcardapp.services.tags', 'wiseacreflashcardapp.services.questions'])
.config(function ($stateProvider) {
  $stateProvider
    .state('quiz', {
      url: 'quiz/',
      views: {
        'quiz@': {
          templateUrl: 'app/Quiz/quiz.html',
          controller: 'QuizController as quizController'
        }
      }
    });
})
.controller('QuizController', function ($stateParams, $state, TagsService, QuestionsService) {
  var quizController = this;

  // this sets the state variables for quiz and accmulates questions for quiz
  function startQuiz () {
    QuestionsService.showAllQuestions()
      .then(function (questions) {
        quizController.questions = questions;
        quizController.getQuestions();
        quizController.id = 0;
        quizController.quizOver = false;
        quizController.inProgress = true;
        quizController.getNextQuestion();
      });
  }

  // generates five random questions from the questions database in order to determine percentage of correct answers
  function getQuestions () {
    quizController.quizQuestions = []; // the questions are cached locally on the client side to allow for 2-way data binding
    for (var i = 0; i < 5; i++) {
      var rand = Math.floor(Math.random() * quizController.questions.length);
      quizController.quizQuestions[i] = quizController.questions[rand];
    }
  }


  function getNextQuestion () {
    var q = quizController.quizQuestions[quizController.id];
    if (q) {
      quizController.question = q.text;
      quizController.answer = q.answer;
      quizController.answerMode = true;
    } else {
      quizController.quizOver = true;
    }
  }

  function checkAnswer () {
    var answer = $("input[name='answer']").val();
    $("input[name='answer']").val('');
    console.log(answer);
    if (answer === quizController.answer) {
      quizController.score++;
      quizController.scorePercentage = (quizController.score / 5) * 100;
      quizController.correctAns = true;
    } else {
      quizController.correctAns = false;
    }

    quizController.answerMode = false;
  }

  function nextQuestion () {
    quizController.id++;
    quizController.getNextQuestion();
  }


  function reset () {
    quizController.inProgress = false;
    quizController.score = 0;
  }

  // define functions that we want to export 
  quizController.startQuiz = startQuiz;
  quizController.getQuestions = getQuestions;
  quizController.getNextQuestion = getNextQuestion;
  quizController.checkAnswer = checkAnswer;
  quizController.nextQuestion = nextQuestion;
  quizController.reset = reset;

  // quizController.quizTime = QuestionsService.quizTime;
  quizController.reset();

});
