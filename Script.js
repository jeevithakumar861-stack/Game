let startTime, updatedTime, difference, timerInterval;
let running = false;
let display = document.getElementById("display");

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 100);

  display.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}

function pad(unit) {
  return unit < 10 ? "0" + unit : unit;
}

document.getElementById("startBtn").addEventListener("click", () => {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 100);
    running = true;
  }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  running = false;
  startTime = null;
  difference = 0;
  display.textContent = "00:00:00.0";
  document.getElementById("laps").innerHTML = "";
});

document.getElementById("lapBtn").addEventListener("click", () => {
  if (!running) return;
  const lapItem = document.createElement("li");
  lapItem.textContent = display.textContent;
  document.getElementById("laps").appendChild(lapItem);
});
