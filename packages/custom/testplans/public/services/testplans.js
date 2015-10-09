'use strict';

//Testplans service used for testplans REST endpoint
angular.module('mean.testplans').factory('Testplans', ['$resource',
  function($resource) {
    return $resource('api/testplans/:testplanId', {
      testplanId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//Testplans service used for testplans REST endpoint
angular.module('mean.testplans').factory('ProjectTestplans', ['$resource',
  function($resource) {
    return $resource('api/project-testplans/:projectId', {
      projectId: '@_id'
    });
  }
]);
