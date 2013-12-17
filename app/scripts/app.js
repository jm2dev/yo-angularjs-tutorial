'use strict';

angular.module('yoAngularjsTutorialApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/#/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
