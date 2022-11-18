export function scoreBoard(stats) {
  var statsHTML = document.getElementById("scoreboard-card__wrapper");
  stats = stats.slice(0, 5);
  stats.forEach((element) => {
    for (let id in element) {
      var div = document.createElement("div");
      div.setAttribute("class", "scoreboard-card__row");

      var divTimestamp = document.createElement("div");
      divTimestamp.setAttribute("class", "scoreboard-timestamp");
      divTimestamp.innerHTML = id;
      div.appendChild(divTimestamp);

      var divMoves = document.createElement("div");
      divMoves.setAttribute("class", "scoreboard-moves");
      divMoves.innerHTML = element[id].moves;
      div.appendChild(divMoves);

      var divTime = document.createElement("div");
      divTime.setAttribute("class", "scoreboard-time");
      divTime.innerHTML = element[id].minutes + " : " + element[id].seconds;
      div.appendChild(divTime);

      statsHTML.appendChild(div);
    }
  });
}
