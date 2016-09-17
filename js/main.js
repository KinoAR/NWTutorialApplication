var pomodoroApp = angular.module("PomodoroTimer", []);

pomodoroApp.controller('PomodoroTimerCtrl', ['$scope', function($scope){

  $scope.timerFn = null;
  $scope.setupTimer = function() {
    var info = {
      timer: $('#pomodoroTime')[0].value,
      pomodori: $('#pomodori')[0].value,
    };

    Timer.calculateTime(info.timer, info.pomodori);
    setDisplayTime(Timer.getTime());
  };

  setDisplayTime = function(time) {
    $('#activeTimer')[0].textContent = time;
  };

  $scope.startTime = function() {
    $scope.timerFn = setInterval(decrementTime.bind(this), 1000);
    disableButton("#startTimer");
    enableButton("#pauseTimer");
  };

  $scope.pauseTime = function() {
    clearInterval($scope.timerFn);
    disableButton("#pauseTimer");
    enableButton("#startTimer");
  };

  decrementTime = function() {
    Timer.decrementTime();
    setDisplayTime(Timer.getTime());
  };

}]);