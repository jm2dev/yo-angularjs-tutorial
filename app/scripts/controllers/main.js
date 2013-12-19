'use strict';

angular.module('yoAngularjsTutorialApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Sitepoint'
    ];
  })
  .controller('TodoController', function($scope, notesFactory) {
    $scope.notes = notesFactory.get();
    $scope.createNote = function() {
      notesFactory.put($scope.note);
      $scope.note = '';
      $scope.notes = notesFactory.get();
    };
  })
  .factory('notesFactory', function() {
    return {
      put: function(note) {
        localStorage.setItem('todo' + (Object.keys(localStorage).length + 1), note);
      },
      get: function() {
        var notes = [];
        var keys = Object.keys(localStorage);

        for(var i = 0; i < keys.length; i++) {
          notes.push(localStorage.getItem(keys[i]));
        }

        return notes;
      }
    };
  })
  .filter('truncate', function() {
    return function(input,length) {
      return (input.length > length ? input.substring(0, length) : input );
    };
  })
  .directive('customColor', function() {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.css({'background-color': attrs.customColor});
      }
    };
  });
