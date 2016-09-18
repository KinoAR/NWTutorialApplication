function Timer() {

}

Timer.time = 0;
Timer.pomodoroDuration = 0;
Timer.totalTaskTime = moment.duration(0);
Timer.breakTimeLength = 0;
Timer.breakTimeExtendedLength = 0;
Timer.breakTime = moment.duration(0);
Timer.breakTimeExtended = moment.duration(0);
Timer.onBreak = false;
Timer.thirdBreak = false;
Timer.breakCount = 0;

Timer.addTime = function() {
  this.time.add(1, "seconds");
};

Timer.addTaskTime = function() {
  this.totalTaskTime.add(1, "seconds");
};

Timer.addBreakCount = function() {
  this.breakCount += 1;
};

Timer.decrementTime = function() {
  if(this.time.asSeconds() > 0)
    this.time.subtract(1, "seconds");
};

Timer.decrementTaskTime = function() {
  this.totalTaskTime.subtract(1, "seconds");
};

Timer.decrementBreakTime = function() {
  this.breakTime.subtract(1, "seconds");
};

Timer.decrementBreakExtendedTime = function() {
  this.breakTimeExtended.subtract(1, "seconds");
};

Timer.calculateTime = function(minutes, pomodori) {
  this.pomodoroDuration = minutes;
  this.setTime(moment.duration( Number(this.pomodoroDuration * pomodori), 'minutes'));
};

Timer.isNotOnBreak = function() {
  if(this.time.asSeconds() > 0 && this.onBreak === false)
    return true;
  else
    return false;
};

Timer.isOnRegularBreak = function() {
  if(this.onBreak === true && this.thirdBreak === false)
    return true;
  else
    return false;
};

Timer.isOnExtendedBreak = function() {
  if(this.onBreak === true && this.thirdBreak === true) 
    return true;
  else 
    return false;
};

Timer.isBreakTime = function() {
  if((this.totalTaskTime.asMinutes() / this.pomodoroDuration) === 1 && this.isNotOnBreak())
    return true;
  else 
    return false;
};

Timer.transitionToBreak = function() {
  this.onBreak = true;
  this.breakCount += 1;
};

Timer.transitionToPomodoro = function() {
  this.onBreak = false;
};

Timer.resetBreakTimers = function() {
  this.breakTime = moment.duration().add(this.breakTimeLength, "minutes");
  this.breakTimeExtended = moment.duration().add(this.breakTimeExtendedLength, "minutes");
};

Timer.resetBreakCount = function() {
  this.breakCount = 0;
};

Timer.initializeTimers = function() {
  Timer.totalTaskTime = moment.duration(0);
  Timer.breakTime = moment.duration(0);
  Timer.breakTimeExtended = moment.duration(0);
};

Timer.setTime = function(time) {
  this.time = time;
};

Timer.setBreakTimeLengths = function(breakTime, breakTimeExtended) {
  this.breakTimeLength = Number(breakTime);
  this.breakTimeExtendedLength = Number(breakTimeExtended);
};

Timer.getTime = function() {
  return this.formatTime(this.time);
};

Timer.getTaskTime = function() {
  return this.formatTime(this.totalTaskTime);
};

Timer.getBreakTime = function() {
  return this.formatTime(this.breakTime);
};

Timer.getBreakTimeExtended = function() {
  return this.formatTime(this.breakTimeExtended);
};

Timer.formatTime = function(time) {
  var seconds = (time.seconds() > 9) ? time.seconds() : "0" + time.seconds();
  var minutes = (time.minutes() > 9) ? time.minutes() : "0" + time.minutes();
  var formattedTime = time.hours() + ":" + minutes + ":" + seconds; 
  return formattedTime;
};