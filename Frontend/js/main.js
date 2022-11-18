const buttonStart = document.getElementById("button-start");
const buttonReset = document.getElementById("button-reset");
const scoreboardButton = document.getElementById("scoreboard-button");
const scoreboardCard = document.getElementById("scoreboard-card");
const buttonYes = document.getElementById("button-yes");
const buttonNo = document.getElementById("button-no");
const onloadPopup = document.getElementById("onload-popup");
const appendSec = document.getElementById("timer-sec");
const appendMin = document.getElementById("timer-min");
const appendMoves = document.getElementById("moves");
const scoreboardButtonClose = document.getElementById(
  "scoreboard-card__close_button"
);
const cellElement = document.getElementsByClassName("cell");

import data from "./variables.json" assert { type: "json" };
import { game } from "./game.js";
import { createField } from "./createField.js";
import { makeMove } from "./makeMove.js";
import { draw } from "./draw.js";
import { gameOver } from "./gameOver.js";
import { scoreBoard } from "./scoreBoard.js";
import { isValidMove } from "./isValidMove.js";
import { getLastStateFromJSON } from "./getLastStateFromJSON.js";

data.fieldCells = createField();

let socket = new WebSocket("ws://localhost:8000");

function postStatDataToServer() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:8000/statistics");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = () => {
    // if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
    //   console.log("Response From Server:", xhr.response);
    // }
  };
  const msg = JSON.stringify(createMessageForStatistics());
  // console.log("Message: ", msg);
  xhr.send(msg);
}

const lastStatObj = getLastStateFromJSON();
lastStatObj.then((result) => {
  let stats = result.data.lastStateData;
  if (stats.emptyX == 3 && stats.emptyY == 3) {
    data.state = 0; //  Tells that the game has to start fresh
    onloadPopup.style.visibility = "hidden";
    game();
  } else {
    data.state = 1; // Tells that the game need to be resumed
    onloadPopup.style.visibility = "visible";

    buttonYes.onclick = () => {
      data.minutes = stats.minutes;
      data.seconds = stats.seconds;
      data.moves = stats.moves;
      data.values = stats.values;
      data.emptyX = stats.emptyX;
      data.emptyY = stats.emptyY;
      appendSec.innerHTML = stats.seconds;
      appendMin.innerHTML = stats.minutes;
      appendMoves.innerHTML = stats.moves;
      draw();
      onloadPopup.style.visibility = "hidden";
      buttonStart.onclick();
    };
    buttonNo.onclick = () => {
      game();
      onloadPopup.style.visibility = "hidden";
    };
  }
});

function getStatisticsFromJSON() {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/statistics");
    xhr.send();
    xhr.onload = () => {
      const statistics = JSON.parse(xhr.response);
      resolve(statistics);
    };
  });
}

const statObj = getStatisticsFromJSON();
statObj.then((result) => {
  let stats = result.data.statisticsData;
  scoreBoard(stats);
});

function createMessageForLastState() {
  var messageObj = {
    minutes: appendMin.innerHTML || "00",
    seconds: appendSec.innerHTML || "00",
    moves: data.moves || "0",
    values: data.values || [],
    emptyX: data.emptyX || "0",
    emptyY: data.emptyY || "0",
  };

  return messageObj;
}

function createMessageForStatistics() {
  var messageObj = {
    minutes: appendMin.innerHTML || "00",
    seconds: appendSec.innerHTML || "00",
    moves: data.moves || "0",
  };
  return messageObj;
}

function startTimer() {
  data.seconds++;
  if (data.seconds <= 9) {
    appendSec.innerHTML = "0" + data.seconds;
  }
  if (data.seconds > 9) {
    appendSec.innerHTML = data.seconds;
  }
  if (data.seconds > 59) {
    data.minutes++;
    appendMin.innerHTML = "0" + data.minutes;
    data.seconds = 0;
    appendSec.innerHTML = "0" + data.seconds;
  }
  if (data.minutes > 9) {
    appendMin.innerHTML = data.minutes;
  }
  waitForSocketConnection(socket, JSON.stringify(createMessageForLastState()));
}

buttonStart.onclick = () => {
  if (buttonStart.innerHTML === "Start") {
    data.interval = setInterval(startTimer, 1000);
    buttonStart.innerHTML = "Pause";
  } else if (buttonStart.innerHTML === "Pause") {
    clearInterval(data.interval);
    buttonStart.innerHTML = "Resume";
    alert("Game Paused!");
  } else if (buttonStart.innerHTML === "Resume") {
    data.interval = setInterval(startTimer, 1000);
    buttonStart.innerHTML = "Pause";
  }
};

buttonReset.onclick = () => {
  window.location.reload();
};

scoreboardButton.onclick = () => {
  scoreboardCard.style.visibility = "visible";
  scoreboardButtonClose.style.visibility = "visible";
};

scoreboardButtonClose.onclick = () => {
  scoreboardCard.style.visibility = "hidden";
  scoreboardButtonClose.style.visibility = "hidden";
};

for (let obj in cellElement) {
  if (cellElement[obj] instanceof HTMLElement) {
    cellElement[obj].addEventListener("click", (e) => {
      if (buttonStart.innerHTML == "Pause") {
        try {
          let currRowIndex = cellElement[obj].parentNode.rowIndex;
          let currCellIndex = cellElement[obj].cellIndex;

          // Moves are written considering empty cell.
          // i.e LEFT will move that the empty cell will move left.

          var move;

          if (
            isValidMove("LEFT") &&
            currCellIndex + 1 < data.size &&
            data.values[currRowIndex][currCellIndex + 1] == 0
          ) {
            move = "LEFT";
          } else if (
            isValidMove("UP") &&
            currRowIndex + 1 < data.size &&
            data.values[currRowIndex + 1][currCellIndex] == 0
          ) {
            move = "UP";
          } else if (
            isValidMove("RIGHT") &&
            data.values[currRowIndex][currCellIndex - 1] == 0
          ) {
            move = "RIGHT";
          } else if (
            isValidMove("DOWN") &&
            data.values[currRowIndex - 1][currCellIndex] == 0
          ) {
            move = "DOWN";
          }

          data.moves++;
          makeMove(move);
          appendMoves.innerHTML = data.moves;
          draw();
          if (gameOver()) {
            setTimeout(function () {
              postStatDataToServer();
              alert("Congratulations! You Won");
              game();
              buttonReset.onclick();
            }, 1000);
          }
        } catch (e) {
          if (e instanceof TypeError) {
            console.log("Invalid Move");
          }
        }
      }
    });
  }
}

document.addEventListener("keydown", (e) => {
  if (buttonStart.innerHTML == "Pause") {
    var move;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        move = "UP";
        break;
      case "ArrowDown":
        e.preventDefault();
        move = "DOWN";
        break;
      case "ArrowLeft":
        e.preventDefault();
        move = "LEFT";
        break;
      case "ArrowRight":
        e.preventDefault();
        move = "RIGHT";
        break;
    }
    if (isValidMove(move)) {
      data.moves++;
    }
    makeMove(move);
    appendMoves.innerHTML = data.moves;
  }

  draw();
  if (gameOver()) {
    setTimeout(function () {
      postStatDataToServer();
      alert("Congratulations! You Won");
      game();
      buttonReset.onclick();
    }, 1000);
  }
});

function waitForSocketConnection(socket, messageObjStr) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      socket.send(messageObjStr);
    } else {
      socket = new WebSocket("ws://localhost:8000");
      waitForSocketConnection(socket, messageObjStr);
    }
  }, 50);
}

game();
