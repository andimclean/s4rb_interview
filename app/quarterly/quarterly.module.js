'use strict';

/**
 * @ngdoc function
 * @name s4rbInterviewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the s4rbInterviewApp
 */
angular.module('s4rbInterviewApp')
  .controller('QuarterlyCtrl', function ($scope) {
    $scope._ourData = [];

    /* Watch when the MianCtrl's data changes so we can update ourdata */
    $scope.$watch('data', (data) => {
      generateOurData(data);
    });

    $scope.getData = function () {
      return $scope._ourData;
    };

    /* convert the fetched data into a format that our view requires */
    function generateOurData() {
      $scope._ourData = Lazy(
        // Generate a sequence of dates so every month is in the new sequence.
        $scope.makeSequence($scope.data).map((date) => {
          var obj =
            Lazy($scope.data).find((item) => {
              return date.isSame(moment(item.Month));
            }) || {
              Month: date.format("YYYY-MM-DDT00:00:00")
            };
          return obj;
        })
        .reduce((current, next) => {
          var key = $scope.formatDateYearQuarter(next);
          var item = current[key] || {
            "Quarter": next.Quarter,
            "Month": next.Month,
            "Complaints": 0,
            "UnitsSold": 0
          }
          if (!item.Quarter) {
            item.Quarter = parseInt(next.Quarter);
          }
          if (next.Complaints) {
            item.Complaints += parseInt(next.Complaints);
          }
          if (next.UnitsSold) {
            item.UnitsSold += parseInt(next.UnitsSold);
          }

          current[key] = item;
          return current;
        }, {})
        // Convert sequence to an Array
      ).values().toArray();
    }

    /* Perform the initial generation of our data */
    generateOurData();
  });