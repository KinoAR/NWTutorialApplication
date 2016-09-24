function Timer() {

}

Timer.time = 0;
Timer.decrementedTime = 0;
Timer.pomodoroDuration = 0;
Timer.activeTimer = null;
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

Timer.addToDecrementedTime = function() {
  this.decrementedTime += 1;
};

Timer.addBreakCount = function() {
  this.breakCount += 1;
};

Timer.decrementTime = function() {
  if(this.activeTimer.asSeconds() > 0) {
    this.activeTimer.subtract(1, "seconds");
    this.addToDecrementedTime();
  }
};

Timer.decrementTaskTime = function() {
  this.totalTaskTime.subtract(1, "seconds");
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

Timer.transitionToPomodoro = function() {
  this.onBreak = false;
  this.setActiveTimer(this.time);
  if(this.breakCount === 3)
    this.resetBreakCount();
};


Timer.transitionToBreak = function() {
  this.onBreak = true;
  this.breakCount += 1;
  this.processThirdBreak();
  this.resetDecrementedTime();
  if(this.thirdBreak === true )
    this.setActiveTimer(this.breakTimeExtended);
  else
    this.setActiveTimer(this.breakTime);
};

Timer.processThirdBreak = function() {
  if(this.breakCount > 2)
    this.thirdBreak = true;
  else
    this.thirdBreak = false;
};

Timer.resetTimer = function() {
  if(this.isNotOnBreak()) {
    this.resetPomodoroTime();
    this.setActiveTimer(this.time);
  }
  if(this.isOnRegularBreak() || this.isOnExtendedBreak()) {
    this.resetBreakTimers();
    if(this.isOnRegularBreak())
      this.setActiveTimer(this.breakTime);
    else
      this.setActiveTimer(this.breakTimeExtended);
  }
};


Timer.resetPomodoroTime = function() {
  this.time.add(this.decrementedTime, "seconds");
  this.resetDecrementedTime();
};

Timer.resetBreakTimers = function() {
  this.breakTime = moment.duration().add(this.breakTimeLength, "minutes");
  this.breakTimeExtended = moment.duration().add(this.breakTimeExtendedLength, "minutes");
};

Timer.resetDecrementedTime = function() {
  this.decrementedTime = 0;
};

Timer.resetBreakCount = function() {
  this.breakCount = 0;
};

Timer.initializeTimers = function() {
  this.totalTaskTime = moment.duration(0);
  this.breakTime = moment.duration(0);
  this.breakTimeExtended = moment.duration(0);
};

Timer.setTime = function(time) {
  this.time = time;
};

Timer.setActiveTimer = function(time) {
  this.activeTimer = time;
};

Timer.setBreakTimeLengths = function(breakTime, breakTimeExtended) {
  this.breakTimeLength = Number(breakTime);
  this.breakTimeExtendedLength = Number(breakTimeExtended);
};

Timer.getTime = function() {
  return this.time;
};

Timer.getTaskTime = function() {
  return this.totalTaskTime;
};

Timer.getBreakTime = function() {
  return this.breakTime;
};

Timer.getBreakTimeExtended = function() {
  return this.breakTimeExtended;
};

Timer.getActiveTime = function() {
  return this.activeTimer;
};

Timer.formatTime = function(time) {
  var seconds = (time.seconds() > 9) ? time.seconds() : "0" + time.seconds();
  var minutes = (time.minutes() > 9) ? time.minutes() : "0" + time.minutes();
  var formattedTime = time.hours() + ":" + minutes + ":" + seconds; 
  return formattedTime;
};