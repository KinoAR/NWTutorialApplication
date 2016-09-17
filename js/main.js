var pomodoroApp = angular.module("PomodoroTimer", []);

pomodoroApp.controller('PomodoroTimerCtrl', ['$scope', function($scope){

  $scope.timerFn = null;
  $scope.setupTimer = function() {
    var info = {
      timer: $('#pomodoroTime')[0].value,
      pomodori: $('#pomodori')[0].value,
    };

    Timer.calculateTime(info.timer, info.pomodori);
    setDisplayTimes(Timer.getTime(), Timer.getTaskTime());
  };

  setDisplayTimes = function(time, taskTime) {
    $('#activeTimer')[0].textContent = time;
    $('#taskTimer')[0].textContent = taskTime;
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
    Timer.addTaskTime();
    setDisplayTimes(Timer.getTime(), Timer.getTaskTime());

  };

}]);