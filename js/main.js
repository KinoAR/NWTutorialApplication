var pomodoroApp = angular.module("PomodoroTimer", []);

pomodoroApp.controller('PomodoroTimerCtrl', ['$scope', function($scope){

  $scope.time = null;
  $scope.timerFn = null;
  $scope.collectTimerInformation = function() {
    var info = {
      timer: $('#pomodoroTime')[0].value,
      pomodori: $('#pomodori')[0].value,
    };

    $scope.timerInfo = info;
    $scope.time = calculateTime(info.timer, info.pomodori);
    setTime($scope.time);
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
    $scope.timerFn = setInterval(decrementTime.bind(this), 1000);
  };

  $scope.pauseTime = function() {
    clearInterval($scope.timerFn);
  };

  decrementTime = function() {
    $scope.time.subtract(1, "seconds");
    if($scope.time.asSeconds() > 0)
      setTime($scope.time);
  };

}]);