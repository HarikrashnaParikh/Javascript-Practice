const durationInput = document.querySelector("#duration");
const startTimer = document.querySelector("#start");
const pauseTimer = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let currentOffset = 0;
let duration;
const timer = new Timer(durationInput, startTimer, pauseTimer, {
  onStart(totalDuration) {
    // console.log("started");
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    // console.log("Ticked");
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );

    //   perimeter -
    //   ((perimeter * timeRemaining) / duration - this.durationInput.value);
    // console.log(currentOffset);
  },
  onComplete() {
    console.log("Completed");
  },
});

// const timer = new Timer(durationInput, startTimer, pauseTimer);
