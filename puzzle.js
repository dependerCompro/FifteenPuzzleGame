// document.body.innerHTML = "<h1> Hello Duniya! </h1>";
var size = 4;
var values;
var emptyX, emptyY;
var fieldCells = createField();
var LEFT = { dx: -1, dy: 0 };
var RIGHT = { dx: 1, dy: 0 };
var UP = { dx: 0, dy: -1 };
var DOWN = { dx: 0, dy: 1 };
var seconds = 0;
var minutes = 0;
var appendSec = document.getElementById("timer-sec");
var appendMin = document.getElementById("timer-min");
var buttonStart = document.getElementById("button-start");
var buttonReset = document.getElementById("button-reset");
var interval;
var moves = 0;
var appendMoves = document.getElementById("moves");
var appendPreviousSeconds = document.getElementById("previous-sec");
var appendPreviousMinutes = document.getElementById("previous-min");
var appendPreviousMoves = document.getElementById("previous-moves");
appendPreviousSeconds.innerHTML = localStorage.getItem("seconds") || "00";
appendPreviousMinutes.innerHTML = localStorage.getItem("minutes") || "00";
appendPreviousMoves.innerHTML = localStorage.getItem("moves") || "0";

function createField() {
  var cells = [];
  var table = document.getElementById("field");
  for (var y = 0; y < size; y++) {
    var tr = document.createElement("tr");
    var rowCells = [];
    for (var x = 0; x < size; x++) {
      var td = document.createElement("td");
      td.setAttribute("class", "cell");
      tr.appendChild(td);
      rowCells.push(td);
    }
    table.appendChild(tr);
    cells.push(rowCells);
  }
  return cells;
}

function createInitialValues() {
  emptyX = emptyY = size - 1;
  var v = [];
  var i = 1;
  for (var y = 0; y < size; y++) {
    var rowValues = [];
    for (var x = 0; x < size; x++) {
      rowValues.push(i);
      i++;
    }
    v.push(rowValues);
  }
  v[emptyY][emptyX] = 0;
  return v;
}

function draw() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var v = values[y][x];
      var td = fieldCells[y][x];
      td.innerHTML = v == 0 ? "" : String(v);
    }
  }
}

function makeMove(move) {
  var newX = emptyX + move.dx,
    newY = emptyY + move.dy;
  if (newX >= size || newX < 0 || newY >= size || newY < 0) {
    return false;
  }
  var c = values[newY][newX];
  values[newY][newX] = 0;
  values[emptyY][emptyX] = c;
  emptyX = newX;
  emptyY = newY;
  return true;
}

function shuffle() {
  var options = [LEFT, RIGHT, UP, DOWN];
  var iterations = 5;
  for (var i = 0; i < iterations; i++) {
    var move = options[Math.floor(Math.random() * options.length)];
    makeMove(move);
  }
}

function startTimer() {
  seconds++;
  if (seconds <= 9) {
    appendSec.innerHTML = "0" + seconds;
  }
  if (seconds > 9) {
    appendSec.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    appendMin.innerHTML = "0" + minutes;
    seconds = 0;
    appendSec.innerHTML = "0" + seconds;
  }
  if (minutes > 9) {
    appendMin.innerHTML = minutes;
  }
}

buttonStart.onclick = () => {
  if (buttonStart.innerHTML === "Start") {
    interval = setInterval(startTimer, 1000);
    buttonStart.innerHTML = "Pause";
  } else if (buttonStart.innerHTML === "Pause") {
    clearInterval(interval);
    buttonStart.innerHTML = "Resume";
    alert("Game Paused!");
  } else if (buttonStart.innerHTML === "Resume") {
    interval = setInterval(startTimer, 1000);
    buttonStart.innerHTML = "Pause";
  }
};

buttonReset.onclick = () => {
  clearInterval(interval);
  seconds = 00;
  minutes = 00;
  moves = 0;
  appendSec.innerHTML = "00";
  appendMin.innerHTML = "00";
  buttonStart.innerHTML = "Start";
  appendMoves.innerHTML = moves;
  init();
};

function gameOver() {
  var expectedValue = 1;
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      if (values[y][x] == expectedValue) {
        expectedValue++;
      } else {
        if (x == size - 1 && y == size - 1 && values[y][x] == 0) {
          return true;
        }
        return false;
      }
    }
  }
  return true;
}

const timer = () => {
  var ele = document.getElementById("timer");
};

document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (buttonStart.innerHTML == "Pause") {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        makeMove(UP);
        moves++;
        appendMoves.innerHTML = moves;
        break;
      case "ArrowDown":
        e.preventDefault();
        makeMove(DOWN);
        moves++;
        appendMoves.innerHTML = moves;
        break;
      case "ArrowLeft":
        makeMove(LEFT);
        moves++;
        appendMoves.innerHTML = moves;
        break;
      case "ArrowRight":
        makeMove(RIGHT);
        moves++;
        appendMoves.innerHTML = moves;
        break;
      case "Escape":
        buttonStart.onclick();
        break;
    }
  }
  draw();
  if (gameOver()) {
    setTimeout(function () {
      alert("Congratulations! You Won");
      init();
      localStorage.setItem("moves", moves);
      if (seconds <= 9) {
        localStorage.setItem("seconds", "0" + seconds);
      } else {
        localStorage.setItem("seconds", seconds);
      }
      if (minutes <= 9) {
        localStorage.setItem("minutes", "0" + minutes);
      } else {
        localStorage.setItem("minutes", minutes);
      }
      buttonReset.onclick();
    }, 1000);
  }
});

function init() {
  values = createInitialValues();
  shuffle();
  draw();
}

init();
