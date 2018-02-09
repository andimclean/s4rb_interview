'use strict';

/**
 * @ngdoc overview
 * @name s4rbInterviewApp
 * @description
 * # s4rbInterviewApp
 *
 * Main module of the application.
 */
angular
  .module('s4rbInterviewApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/raw', {
        templateUrl: 'raw/raw.html',
        controller: 'RawCtrl'
      })
      .when('/monthly', {
        templateUrl: 'monthly/monthly.html',
        controller: 'MonthlyCtrl'
      })
      .when('/quarterly', {
        templateUrl: 'quarterly/quarterly.html',
        controller: 'QuarterlyCtrl'
      })

      .otherwise({
        redirectTo: '/raw'
      });
  });
