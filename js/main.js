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
    setDisplayTimes(Timer.getTime(), Timer.getTaskTime());
  };

  setDisplayTimes = function(time, taskTime) {
    $('#activeTimer')[0].textContent = time;
    $('#taskTimer')[0].textContent = taskTime;
  };

  $scope.startTime = function() {
    $scope.timerFn = setInterval(processTimers.bind(this), 1000);
    disableButton("#startTimer");
    enableButton("#pauseTimer");
  };

  $scope.pauseTime = function() {
    clearInterval($scope.timerFn);
    disableButton("#pauseTimer");
    enableButton("#startTimer");
  };

  processTimers = function() {
    if(Timer.isBreakTime()) {
      Timer.resetBreakTimers();
      Timer.transitionToBreak();
    }

    if(Timer.isOnRegularBreak() || Timer.isOnExtendedBreak()) {
      if(Timer.breakTime.asSeconds() <= 0 || Timer.breakTimeExtended.asSeconds() <= 0)
        Timer.transitionToPomodoro();
    }

    if(Timer.isNotOnBreak()) {
      Timer.decrementTime();
      Timer.addTaskTime();
      setDisplayTimes(Timer.getTime(), Timer.getTaskTime());
    }
    else if(Timer.isOnRegularBreak()) {
      Timer.decrementBreakTime();
      setDisplayTimes(Timer.getBreakTime(), Timer.getTaskTime());
    }
    else if(Timer.isOnExtendedBreak()) {
      Timer.decrementBreakExtendedTime();
      setDisplayTimes(Timer.getBreakTimeExtended(), Timer.getTaskTime());
    }
  };

}]);