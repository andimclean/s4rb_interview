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
    $scope._ourData = [];

    /* Watch when the MianCtrl's data changes so we can update ourdata */
    $scope.$watch('data', generateOurData);

    $scope.getData = function () {
      return $scope._ourData;
    };

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

    /* Perform the initial generation of our data */
    generateOurData();
  });
