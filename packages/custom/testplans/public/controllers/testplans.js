'use strict';

angular.module('mean.testplans').controller('TestplansController', ['$scope', '$filter', '$stateParams', '$location', 'Global', 'Testplans', 'MeanUser', 'Circles', 'Projects',
  function($scope, $filter, $stateParams, $location, Global, Testplans, MeanUser, Circles, Projects) {
    $scope.global = Global;
    $scope.userVals = [
      {value: 1, text: 'Anonymous'},
      {value: 2, text: 'Admin'},
      {value: 3, text: 'Authenticated'},
      {value: 4, text: 'Public'},
      {value: 5, text: 'Other'}
    ];

    $scope.rowStatus = [
      {value: 1, text: "Pass", color: "#dff0d8"},
      {value: 2, text: "Fail", color: "#f2dede"},
      {value: 3, text: "In Progress", color: "#fcf8e3"},
      {value: 4, text: "Inconclusive", color: "#d9edf7"},
      {value: 5, text: "Unavailable", color: "#f5f5f5"},
    ];

    $scope.deviceList = [
      {value: 1, text: "All" },
      {value: 2, text: "Desktop" },
      {value: 3, text: "Phone" },
      {value: 4, text: "Tablet" },
      {value: 5, text: "Watch" },
    ];

    $scope.hasAuthorization = function(testplan) {
      if (!testplan || !testplan.user) return false;
      return MeanUser.isAdmin || testplan.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.testplan.permissions.push('test test');
        $scope.testplan.title = $filter('date')(new Date().getTime(), 'mediumDate');
        var testplan = new Testplans($scope.testplan);

        testplan.$save(function(response) {
          // $location.path('testplans/' + response._id);
        });

        $scope.testplan = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.saveTable = function() {
      if ($scope.testplan.new) {
        $scope.create(true);
      }
      else {
        $scope.update(true);
      }
    };

    $scope.remove = function(testplan) {
      if (testplan) {
        testplan.$remove(function(response) {
          for (var i in $scope.testplans) {
            if ($scope.testplans[i] === testplan) {
              $scope.testplans.splice(i, 1);
            }
          }
          $location.path('testplans');
        });
      } else {
        $scope.testplan.$remove(function(response) {
          $location.path('testplans');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var testplan = $scope.testplan;
        if (!testplan.updated) {
          testplan.updated = [];
        }
        testplan.updated.push(new Date().getTime());

        testplan.$update(function() {
          // $location.path('testplans/' + testplan._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Testplans.query(function(testplans) {
        $scope.testplans = testplans;
      });
    };

    $scope.findOne = function() {
      Testplans.get({
        testplanId: $stateParams.testplanId
      }, function(testplan) {
        $scope.testplan = testplan;
        console.log(testplan);
      });
    };

    $scope.getProject = function() {
      $scope.testplan = {};
      $scope.testplan.new = true;
      var query = $location.search();
      Projects.get({
        projectId: query.id
      }, function(project) {
        angular.forEach(project.sections, function(section, skey) {
          angular.forEach(section.rows, function(row, rkey) {
              row.ref = null;
              row.status = 0;
              row.user = null;
              row.device = null;
              row.browsers = {'chrome': null, 'ie': null, 'firefox': null, 'safari': null, 'edge': null};
          });
        });
        $scope.testplan.project = project;
      });
    };

    $scope.addRow = function(index) {
      $scope.testplan.project.sections[index].rows.push({
        "page" : "Enter Page",
        "path" : "http://example.com",
        "steps" : "Go here"
      });
    };

    $scope.showUserStatus = function(row) {
      if (row.user && $scope.userVals.length) {
        var selected = $filter('filter')($scope.userVals, {value: row.user});
        return selected.length ? selected[0].text : "Not set";
      } else {
        return null;
      }
    };

    $scope.showBrowserStatus = function(row, browser) {
      console.log(browser);
      if (row.browsers[browser] && $scope.rowStatus.length) {
        var selected = $filter('filter')($scope.rowStatus, {value: row.browsers[browser]});
        return selected.length ? selected[0].text : "Not set";
      } else {
        return null;
      }
    };

    $scope.showRowStatus = function(row) {
      if (row.status && $scope.rowStatus.length) {
        var selected = $filter('filter')($scope.rowStatus, {value: row.status});
        return selected.length ? selected[0].text : "Not set";
      } else {
        return null;
      }
    };

    $scope.showDeviceStatus = function(row) {
      if (row.device && $scope.deviceList.length) {
        var selected = $filter('filter')($scope.deviceList, {value: row.device});
        return selected.length ? selected[0].text : "Not set";
      } else {
        return null;
      }
    };

  }
]);
