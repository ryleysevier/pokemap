//route provider is defined in the controller.js
//handles all url interactions by assinging routes to partial pages as well as the controller they are supposed to respond to

var app = angular.module('Pokemap', ['SAP.controllers', 'SAP.services',
                                    'ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngCookies', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider.
        when("/login",  {templateUrl:'componentPages/loginPage/loginPartial.html',  controller:'LoginCntl'}).
        when("/home", {templateUrl:'componentPages/homePage/homePartial.html', controller:'HomeCntl'}).
        otherwise({redirectTo: '/home'});
    });
