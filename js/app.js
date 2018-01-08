var app = angular.module('AddressAggregator', ['ngRoute', 'firebase', 'angular-toArrayFilter']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        })
        .when('/suggestion/:id', {
            controller: 'SuggestionController',
            templateUrl: '/views/suggestion.html'
        })
        .when('/map/:id', {
            controller: 'MapController',
            templateUrl: '/views/map.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
