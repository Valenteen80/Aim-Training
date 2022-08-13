const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let time = 0;
let score = 0;
let circleColors = [
  "#eb400c",
  "#eb830c",
  "#ebc50c",
  "#95eb0c",
  "#0ceb56",
  "#0cebd1",
  "#0c56eb",
  "#950ceb",
];

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = +event.target.getAttribute("data-time");
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.remove();
  board.innerHTML = `<h1>Ваш лік: <span class="primary">${score}</span></h1>`;
}
console.log(time);

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomeNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();

  const x = getRandomeNumber(0, width - size);
  const y = getRandomeNumber(0, height - size);
  circle.style.backgroundColor = getRandomeColor();


  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);

}

function getRandomeNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomeColor() {
  const indexColorRandom = Math.floor(Math.random() * circleColors.length);
  return circleColors[indexColorRandom];
}
