function Timer() {

}

Timer.time = 0;
Timer.totalTaskTime = moment.duration(0);

Timer.addTime = function() {
  this.time.add(1, "seconds");
};

Timer.addTaskTime = function() {
  this.totalTaskTime.add(1, "seconds");
};

Timer.decrementTime = function() {
  if(this.time.asSeconds() > 0)
    this.time.subtract(1, "seconds");
};

Timer.decrementTaskTime = function() {
  this.totalTaskTime.subtract(1, "seconds");
};

Timer.calculateTime = function(minutes, pomodori) {
  this.setTime(moment.duration(minutes * pomodori, 'minutes'));
};

Timer.setTime = function(time) {
  this.time = time;
};

Timer.getTime = function() {
  var seconds = (this.time.seconds() > 9) ? this.time.seconds() : "0" + this.time.seconds();
  var minutes = (this.time.minutes() > 9) ? this.time.minutes() : "0" + this.time.minutes();
  timeFormat = this.time.hours() + ":" + minutes + ":" + seconds; 
  return timeFormat;
};

Timer.getTaskTime = function() {
  var seconds = (this.totalTaskTime.seconds() > 9) ? this.totalTaskTime.seconds() : "0" + this.totalTaskTime.seconds();
  var minutes = (this.totalTaskTime.minutes() > 9) ? this.totalTaskTime.minutes() : "0" + this.totalTaskTime.minutes();
  timeFormat = this.totalTaskTime.hours() + ":" + minutes + ":" + seconds; 
  return timeFormat;
};