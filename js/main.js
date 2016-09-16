var pomodoroApp = angular.module("PomodoroTimer", []);

pomodoroApp.controller('PomodoroTimerCtrl', ['$scope', function($scope){

  $scope.collectTimerInformation = function() {
    var info = {
      timer: $('#pomodoroTime')[0].value,
      pomodori: $('#pomodori')[0].value,
    };
    var time = null;

    console.log(info);
    $scope.timerInfo = info;
    time = calculateTime(info.timer, info.pomodori);
    setTime(time);
  };

  calculateTime = function(minutes, pomodori) {
    var time = moment.duration(minutes * pomodori, 'minutes');
    return time;
  };

  setTime = function(time) {
    var seconds = (time.seconds() > 9) ? time.seconds() : "0" + time.seconds();
    var minutes = (time.minutes() > 9) ? time.minutes() : "0" + time.minutes();
    timeFormat = time.hours() + ":" + minutes + ":" + seconds; 
    $('#activeTimer')[0].textContent = timeFormat;
  };

  $scope.startTime = function() {
    console.log("Time Started");
    time = 600;
    while(time > 0) {
      time--;
    }
  };

}]);