console.log('app.js loaded!');
var app = angular.module('iceCreamApp', ['ui.router']);

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log('config');
    //this allows us to use routes without hash params!
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    // for any unmatched URL redirect to /
    $urlRouterProvider.otherwise("/");

     $stateProvider
      .state('home', {
        url: "/",
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: "templates/home.html"
        // template: 'Home!'
      });
  }

  app.controller('HomeController', HomeController);

function HomeController() {
  var vm = this;
  vm.homeTest = "Welcome to the homepage!";
}
