angular.module('theApp')

.directive('ipMenu', function () 
{
 return {
   restrict 	: 'E',
   templateUrl 	: 'menu.htm',
   transclude	: true,
   controller 	: "listController"
 }
})

.directive('ipDebugButton', function () 
{
 return {
   restrict 	: 'E',
   templateUrl 	: 'debugButton.htm'
 }
})

.directive('ipInputGroup', function () 
{
 return {
   restrict 	: 'E',
   templateUrl 	: 'inputGroup.htm'
 }
})

.directive('ipListContainer', function () 
{
 return {
   restrict 	: 'E',
   templateUrl 	: 'listContainer.htm'
 }
})
;