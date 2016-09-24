var pomodoroApp = angular.module("PomodoroTimer", []);

pomodoroApp.controller('PomodoroTimerCtrl', ['$scope', function($scope){

  $scope.timerFn = null;
  $scope.setupTimer = function() {
    var info = {
      timer: $('#pomodoroTime')[0].value,
      pomodori: $('#pomodori')[0].value,
      breakTimeLength: $("#breakTime")[0].value,
      breakTimeExtendedLength: $("#breakTimeExtended")[0].value,
    };

    console.log(info);
    Timer.calculateTime(info.timer, info.pomodori);
    Timer.setBreakTimeLengths(info.breakTimeLength, info.breakTimeExtendedLength);
    Timer.initializeTimers();
    Timer.setActiveTimer(Timer.getTime());
    setDisplayTimes();
  };

  setDisplayTimes = function() {
    $('#activeTimer')[0].textContent = Timer.formatTime(Timer.getActiveTime());
    $('#taskTimer')[0].textContent = Timer.formatTime(Timer.getTaskTime());
  };

  $scope.startTime = function() {
    $scope.timerFn = setInterval(processTimers.bind(this), 1000);
    disableButton("#startTimer");
    enableButton("#pauseTimer");
  };

  $scope.resetTime = function() {
    clearInterval($scope.timerFn);
    Timer.resetTimer();
    setDisplayTimes();
    enableButton("#startTimer");
    disableButton("#pauseTimer");
  };

  $scope.pauseTime = function() {
    clearInterval($scope.timerFn);
    pauseSound("#timerSound");
    pauseSound("#alarmSound");
    disableButton("#pauseTimer");
    enableButton("#startTimer");
  };

  processTimers = function() {
    if(Timer.isBreakTime()) {
      Timer.resetBreakTimers();
      Timer.transitionToBreak();
      pauseSound("#timerSound");
      playSound("#alarmSound");
      $scope.pauseTime();
    }

    if(Timer.isOnRegularBreak() || Timer.isOnExtendedBreak()) {
      if(Timer.breakTime.asSeconds() <= 0 || Timer.breakTimeExtended.asSeconds() <= 0) {
        $scope.pauseTime();
        Timer.transitionToPomodoro();
      }
    }

    setDisplayTimes();
    if(Timer.isNotOnBreak()) {
      Timer.addTaskTime();
      Timer.decrementTime();
      playSound("#timerSound");
      pauseSound("#alarmSound");
    }
    else {
      Timer.decrementTime();
    }
  };

}]);