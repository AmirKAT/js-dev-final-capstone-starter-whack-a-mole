const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const whackSound = new Audio("/assets/hit.mp3");
const gameMusic = new Audio("/assets/mariosong.mp3")

let time = 0;
let timer;
let lastHole = null; // Changed from 0 to null
let points = 0;
let difficulty = "hard";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  switch (difficulty) {
    case "easy":
      return 1500;
    case "normal":
      return 1000;
    case "hard":
      return randomInteger(600, 1200);
    default:
      return 1000;
  }
}

function chooseHole(holes) {
  let index;
  let hole;
  do {
    index = randomInteger(0, holes.length - 1);
    hole = holes[index];
  } while (hole === lastHole);
  lastHole = hole;
  return hole;
}

function gameOver() {
  if (time === 0) {
    return stopGame();
  }
  
  if (time > 0) {
    let timeoutId = showUp();
    return timeoutId;
  }
}

function stopGame() {
  clearInterval(timer);
  return "game stopped";
}

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

function toggleVisibility(hole) {
  if (hole && hole.classList) {
    hole.classList.toggle("show");
  }
}

function updateScore() {
  points += 1;
  score.textContent = points.toString();
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time -= 1;
  }
  timerDisplay.textContent = time;
  return time;
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function setDuration(duration) {
  time = duration;
}

function whack(event) {
  if (event && event.target && event.target.classList.contains("mole")) {
    updateScore();
    whackSound.volume = 0.1;
    whackSound.play();
  }
}

function setEventListeners() {
  moles.forEach((mole) => {
    mole.addEventListener("click", whack);
  });
  return moles;
}

function startGame() {
  gameMusic.volume = 0.2;
  gameMusic.play();
  clearScore();
  setDuration(30);
  startTimer();
  showUp();
  setEventListeners();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
