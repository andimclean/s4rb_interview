'use strict';

/**
 * @ngdoc function
 * @name s4rbInterviewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the s4rbInterviewApp
 */
angular.module('s4rbInterviewApp')
  .controller('RawCtrl', function ($scope) {
    $scope.getData = function() {
      return $scope.data;
    }
    $scope.graphOptions = {
      "chart": {
        "height": 50,
        "type": "historicalBarChart",
        "margin": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "showValues": false,
        "x": function (d) {
          return (new Date(d.Month)).getTime();
        },
        "y": function (d) {
          return d.Cpmu;
        },
        "duration": 100,
        showXAxis: false,
        showYAxis: false,
        xAxis: {
          tickFormat: function (d) {
            return d3.time.format('%x')(new Date(d))
          }
        },
        tooltip: {
          keyFormatter: function (d) {
            return d3.time.format('%x')(new Date(d));
          }
        }
      }
    };
  });
