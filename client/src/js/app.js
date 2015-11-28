var $  			    = require('jquery');
var angular 	  = require('angular');
var foundation 	= require('foundation');


$(function() {
	$(document).foundation();
  	console.log("initializedd");
});

angular.module('theApp', ['templates']);