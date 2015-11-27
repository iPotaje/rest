// Todo: order of the list
angular.module('theApp')

.controller('listController', function($scope, $http) 
{
  $scope.getAll = function (){
    $http({
      method: 'GET',
      url: 'http://localhost:8080/index.php/puzzles'
    }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.data = response;
        $scope.searchText = "";
        $scope.inputText = "";
      }, function errorCallback(response) {
        $scope.data = response;
      });
  };

  $scope.getAll();

  $scope.reset = function (){
    $http({
      method: 'GET',
      url: 'http://localhost:8080/index.php/puzzles_reset'
    }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.data = response;
        $scope.searchText = "";
        $scope.inputText = "";
      }, function errorCallback(response) {
        $scope.data = response;
      });
  };

  $scope.updateThis = function (index, data){
    console.log("update:" + index + ":" + data);
    $http({
      method: 'PUT',
      url: 'http://localhost:8080/puzzles/' + index,
      data: '{"value":"'+data+'"}'
    }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.data = response;
        $scope.cancel();
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
        $scope.list = response.data;
        $scope.data = response;
        $scope.cancel();
      }, function errorCallback(response) {
        $scope.data = response;
      });
    console.log("add");
  };

  $scope.del = function (index){
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/puzzles/' + index
    }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.data = response;
        $scope.searchText = "";
        $scope.inputText = "";
      }, function errorCallback(response) {
        $scope.data = response;
      });
    console.log("del");
  };
  $scope.update = function (index){
    console.log("update entry");
    $scope.inputText = $scope.list[index];
    $scope.isUpdating = true;
    $scope.toUpdate = index;
  };
  $scope.isUpdating = false;

  $scope.cancel = function (){
    $scope.isUpdating = false;
    $scope.searchText = "";
    $scope.inputText = "";
  }
})