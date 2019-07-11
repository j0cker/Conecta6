'use strict';
var app = angular.module('myApp',['ngSanitize']);

app.config(function($controllerProvider, $interpolateProvider){      
    app.controller = $controllerProvider.register;
    //$interpolateProvider.startSymbol('<%');
    //$interpolateProvider.endSymbol('%>');
});