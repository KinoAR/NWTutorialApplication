var pomodoroApp = angular.module("PomodoroTimer", []);

pomodoroApp.controller('PomodoroTimerCtrl', ['$scope', function($scope){
  $scope.name = "RegularCtrl";
}]);