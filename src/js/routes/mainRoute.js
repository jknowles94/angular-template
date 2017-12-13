"use strict";
angular
  .module("angularTemplate")
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state(
        "main", {
          url: "/test",
          templateUrl: "js/views/dashboard.html"
        }
      );

      $urlRouterProvider.when("/", "/test");
      $urlRouterProvider.otherwise("/test");
  });
