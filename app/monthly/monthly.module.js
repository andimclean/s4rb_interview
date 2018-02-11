'use strict';

/**
 * @ngdoc function
 * @name s4rbInterviewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the s4rbInterviewApp
 */
angular.module('s4rbInterviewApp')
  .controller('MonthlyCtrl', function ($scope) {
    /* convert the fetched data into a format that our view requires */
    function generateOurData() {
      $scope._ourData = $scope.makeSequence($scope.data).map((date) => {
        var obj =
          Lazy($scope.data).find((item) => {
            return date.isSame(moment(item.Month));
          }) || {
            Month: date.format("YYYY-MM-DDT00:00:00")
          };
        return obj;
      }).toArray();
    }

    $scope._ourData = [];
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

    /* Watch when the MainCtrl's data changes so we can update ourdata */
    $scope.$watch('data', generateOurData);

    $scope.getData = function () {
      return $scope._ourData;
    };



    /* Perform the initial generation of our data */
    generateOurData();
  });
