angular.module('theApp')

.directive('ipMenu', function ($templateCache) 
{
 return {
   restrict 	: 'E',
   template 	: $templateCache.get('menu.htm'),
   transclude	: true
 }
})

.directive('ipDebugButton', function ($templateCache) 
{
 return {
   restrict 	: 'E',
   template 	: $templateCache.get('debugButton.htm')
 }
})

.directive('ipInputGroup', function ($templateCache) 
{
 return {
   restrict 	: 'E',
   template 	: $templateCache.get('inputGroup.htm')
 }
})

.directive('ipListContainer', function ($templateCache) 
{
 return {
   restrict 	: 'E',
   template 	: $templateCache.get('listContainer.htm')
 }
})