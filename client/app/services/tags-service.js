/*
this is where flashcard category tags service is built: using angular ui-router
common functionality related to category tags that are used.
this service is reponsible for communicating with the back-end upon 
requests from the controller. 
*/

angular.module('wiseacreflashcardapp.services.tags', [])
.service('TagsService', function ($http, $q) {
  var service = this;
  var currentTag;
  var tags;
  service.addNewTag = function (tag) {
    return $http({
      method: 'POST',
      url: '/api/tags',
      data: tag
    });
  };

  service.getAllTags = function () {
    return $http({
      method: 'GET',
      url: '/api/tags'
    })
    .then(function (result) {
      return result.data;
    });
  };

  service.getCurrentTag = function () {
    return currentTag;
  };

  service.setCurrentTag = function (tag) {
    currentTag = tag;
  };

  service.getCurrentTagName = function () {
    return currentTag ? currentTag : '';

  };


  // need to somehow build out a service function to look through the database to find a category tag that matches the tagname from database (i.e. need to build this out in the database too)

});
