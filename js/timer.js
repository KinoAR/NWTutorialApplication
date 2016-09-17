function Timer() {

}

Timer.time = 0;

Timer.addTime = function() {
  this.time.add(1, "seconds");
};

Timer.decrementTime = function() {
  if(this.time.asSeconds() > 0)
    this.time.subtract(1, "seconds");
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