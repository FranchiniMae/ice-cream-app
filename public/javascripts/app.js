console.log('app.js loaded!');
var app = angular.module('iceCreamApp', ['ui.router', 'ngResource']);

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
      });
  }

app.controller('HomeController', HomeController);


function HomeController(Icecream) {
  var vm = this;
  vm.newIcecream = {};
  vm.icecreams = Icecream.query();
  vm.createIcecream = createIcecream;
  vm.updateIcecream = updateIcecream;
  vm.deleteIcecream = deleteIcecream;

  function createIcecream() {
  	Icecream.save(vm.newIcecream);
  	vm.icecreams.push(vm.newIcecream);
  	console.log('new flavor', vm.newIcecream);
  	vm.newIcecream = {};
  }

  function updateIcecream(icecream) {
  	Icecream.update({id: icecream._id}, icecream);
  }

  function deleteIcecream (icecream) {
    Icecream.remove({id: icecream._id});
    var index = vm.icecreams.indexOf(icecream);
    vm.icecreams.splice(index, 1);
    console.log('deleted');
	}
}

app.service('Icecream', function($resource) {
  return $resource('http://localhost:3000/api/icecreams/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});

