/*
this is the main angular app module and configuration. angular ui-router is used for managing state.
*/
angular.module('wiseacreflashcardapp', [
  'ui.router',
  'xeditable',
  'tags',
  'tags.questions',
  'wiseacreflashcardapp.services.questions',
  'wiseacreflashcardapp.services.tags',
  'quiz'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('wiseacreflashcardapp', {
      url: '',
      abstract: true
    });

    $urlRouterProvider.otherwise('/');
})
.run(function (editableOptions) {
  editableOptions.theme = 'bs3';
});

