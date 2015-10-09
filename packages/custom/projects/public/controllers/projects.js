'use strict';

angular.module('mean.projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Global', 'Projects', 'MeanUser', 'Circles', 'ProjectTestplans',
  function($scope, $stateParams, $location, Global, Projects, MeanUser, Circles, ProjectTestplans) {
    $scope.global = Global;

    $scope.hasAuthorization = function(project) {
      if (!project || !project.user) return false;
      return MeanUser.isAdmin || project.user._id === MeanUser.user._id;
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
        // $scope.project.permissions.push('test test');
        var project = new Projects($scope.project);

        project.$save(function(response) {
          $location.path('projects/' + response._id + '/edit');
        });

        $scope.project = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(project) {
      if (project) {
        project.$remove(function(response) {
          for (var i in $scope.projects) {
            if ($scope.projects[i] === project) {
              $scope.projects.splice(i, 1);
            }
          }
          $location.path('projects');
        });
      } else {
        $scope.project.$remove(function(response) {
          $location.path('projects');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var $alertFloat = $('.alert--float');
        $alertFloat.addClass('popin', {duration: 500});
        setTimeout(function() {
          $alertFloat.removeClass('popin').addClass('popout');
        }, 2000);
        var project = $scope.project;
        if (!project.updated) {
          project.updated = [];
        }
        project.updated.push(new Date().getTime());

        project.$update(function() {
          // $location.path('projects/' + project._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Projects.query(function(projects) {
        $scope.projects = projects;
      });
    };

    $scope.findOne = function() {
      Projects.get({
        projectId: $stateParams.projectId
      }, function(project) {
        $scope.project = project;
        $scope.getTestplans();

        // For the edit screen.
        if (typeof $scope.project.sections === 'undefined') {
          $scope.project.sections = [
            {
              "name" : "Section (edit)",
              "rows" : [
                {
                  "page" : "Enter Page",
                  "path" : "http://example.com",
                  "steps" : "Go here"
                }
              ]
            }
          ]
        }
      });
    };

    $scope.getTestplans = function() {
      ProjectTestplans.query({
        projectId: $stateParams.projectId
      }, function(testplans) {
        $scope.project.testplans = testplans;
      });
    };

    $scope.saveRow = function(data, row) {
      $scope.update(true);
    };

    $scope.addRow = function(index) {
      $scope.project.sections[index].rows.push({
        "page" : "Enter Page",
        "path" : "http://example.com",
        "steps" : "Go here"
      });
    };

    $scope.removeRow = function(sectionIndex, index) {
      $scope.project.sections[sectionIndex].rows.splice(index, 1);
      $scope.update(true);
    };

    $scope.removeSection = function(sectionIndex) {
      $scope.project.sections.splice(sectionIndex, 1);
      $scope.update(true);
    };

    $scope.addSection = function() {
      $scope.project.sections.push({
        "name" : "Section (edit)",
        "rows" : [
          {
            "page" : "Enter Page",
            "path" : "http://example.com",
            "steps" : "Go here"
          }
        ]
      });
    };

    $scope.addTestPlan = function() {
      $location.path('testplans/create').search({'id' : $scope.project._id});
    };
  }
]);
