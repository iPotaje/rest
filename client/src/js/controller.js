angular.module('theApp')

.controller('listController', function($scope, $http) 
{
  $scope.printing = function() {
    console.log("printnnnnt");
  };

  $scope.getAll = function (){
    $http({
      method: 'GET',
      url: 'http://localhost:8080/index.php/puzzles'
    }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.data = response
      }, function errorCallback(response) {
        $scope.data = response;
      });
    
    console.log("getAll");
  };

  $scope.getAll();
 
  $scope.get = function (){
    $http({
      method: 'GET',
      url: '/tmp/index.php/users/1'
    }).then(function successCallback(response) {
        $scope.data = response;
      }, function errorCallback(response) {
        $scope.data = response;
      });
    console.log("get");
  };

  $scope.update = function (){
    $http({
      method: 'PUT',
      url: '/tmp/index.php/users/1'
    }).then(function successCallback(response) {
        $scope.data = response;
      }, function errorCallback(response) {
        $scope.data = response;
      });
    console.log("update");
  };

  $scope.add = function (data){
    $http({
      method: 'POST',
      url: 'http://localhost:8080/index.php/add_puzzle',
      data: '{"value":"'+data+'"}'
    }).then(function successCallback(response) {
        $scope.data = response;
      }, function errorCallback(response) {
        $scope.data = response;
      });
    console.log("add");
  };

  $scope.del = function (){
    $http({
      method: 'DELETE',
      url: '/tmp/index.php/users/2'
    }).then(function successCallback(response) {
        $scope.data = response;
      }, function errorCallback(response) {
        $scope.data = response;
      });
    console.log("del");
  };
})