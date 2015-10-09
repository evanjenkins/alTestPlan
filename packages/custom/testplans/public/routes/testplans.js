'use strict';

//Setting up route
angular.module('mean.testplans').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all testplans', {
        url: '/testplans',
        templateUrl: '/testplans/views/list.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('create testplan', {
        url: '/testplans/create',
        templateUrl: '/testplans/views/create.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('edit testplan', {
        url: '/testplans/:testplanId/edit',
        templateUrl: '/testplans/views/edit.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('testplan by id', {
        url: '/testplans/:testplanId',
        templateUrl: '/testplans/views/view.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      });
  }
]);
