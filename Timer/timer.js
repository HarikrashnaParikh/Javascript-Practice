class Timer {
  constructor(durationInput, startTimer, pauseTimer, callBacks) {
    this.durationInput = durationInput;
    this.startTimer = startTimer;
    this.pauseTimer = pauseTimer;

    if (callBacks) {
      this.onStart = callBacks.onStart;
      this.onTick = callBacks.onTick;
      this.onComplete = callBacks.onComplete;
    }

    this.startTimer.addEventListener("click", this.start);
    this.pauseTimer.addEventListener("click", this.pause);
  }
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.timer = setInterval(this.tick, 50);
  };
  pause = () => {
    clearInterval(this.timer);
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // const timeRemaining = this.timeRemaining;
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
      // console.log("tick");
    }
  };
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
