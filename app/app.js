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
    'ngTouch',
    'nvd3',
    'toaster', 
    'ngAnimate'
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
      .when('/about', {
        templateUrl: 'about/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/raw'
      });
  });
