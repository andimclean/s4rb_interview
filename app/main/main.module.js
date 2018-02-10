'use strict';

/**
 * @ngdoc function
 * @name s4rbInterviewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the s4rbInterviewApp
 */
angular.module('s4rbInterviewApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.data = [];

    // The URL to obtain the data from
    const urlBase = 'http://' + window.location.hostname + ':3000';
    // Uses $http to obtain the data, if the REST API expands it would be better to put in it's own service.
    $scope.getCMPU = function () {
      $http.get(urlBase + '/CPMU').then((response) => {
        $scope.setData(response.data);
      });
    };


    $scope.setData = function (newData) {
      $scope.data = newData;
    };

    /* Convert the complaints and units sold into an CPMU returning "No Value" where apporiate */
    $scope.toCPMU = function (item, dp) {
      if (!item || !($scope.isSet(item.Complaints) && $scope.isSet(item.UnitsSold))) {
        return null;
      } else {
        var cpmu = parseFloat(item.Complaints) / parseFloat(item.UnitsSold) * 1000000;

        if (dp > 0) {
          return cpmu.toFixed(dp);
        } else {
          return cpmu;
        }
      }
    };


    /* some helper functions, these maybe better placed in a untility module */
    $scope.isSet = function (value) {
      return typeof value !== 'undefined' && value !== null;
    };

    $scope.checkValue = function (item) {
      if ($scope.isSet(item)) {
        return item;
      } else {
        return "No Value";
      }
    };

    /* Date formating rountines */
    $scope.formatDateYearAndMonth = function (date) {
      return moment(date).format("MMMM YYYY");
    };

    $scope.formatDateYearQuarter = function (item) {
      var date = moment(item.Month);
      return date.format("YYYY") + '_' + Math.floor(parseInt(date.month() / 3) + 1);
    };

    $scope.formatDateYear = function (item) {
      var date = moment(item.Month);
      return date.format("YYYY");
    };

    $scope.getMinMaxDate = function (items) {
      return Lazy(items).reduce((current, next) => {
        var date = moment(next.Month);

        if (!current.min || date.isBefore(current.min)) {
          current.min = date;
        }
        if (!current.max || date.isAfter(current.min)) {
          current.max = date;
        }
        return current;
      }, {});
    };

    $scope.makeSequence = function (data) {
      var dates = $scope.getMinMaxDate(data);
      if (dates.min && dates.max) {
        var length = dates.max.diff(dates.min, 'months') + 1;

        return Lazy.generate((index) => {
          return moment(dates.min).add(index, 'months');
        }, length);
      } else {
        return Lazy([]);
      }
    };
    
    $scope.getCMPU();
  });
