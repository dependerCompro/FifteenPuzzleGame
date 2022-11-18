export function scoreBoard(stats) {
  var statsHTML = document.getElementById("scoreboard-card__wrapper");
  
  var scoreTable = document.createElement("table");

  var tr = document.createElement("tr");
  tr.setAttribute("class", "score-row");

  var th_timestamp = document.createElement("th");
  th_timestamp.setAttribute("class", "timestamp-cell-th");
  th_timestamp.innerHTML = "TIMESTAMP";
  tr.appendChild(th_timestamp);

  var th_moves = document.createElement("th");
  th_moves.setAttribute("class", "moves-cell-th");
  th_moves.innerHTML = "MOVES";
  tr.appendChild(th_moves);

  var th_time = document.createElement("th");
  th_time.setAttribute("class", "time-cell-th");
  th_time.innerHTML = "TIME";
  tr.appendChild(th_time);

  scoreTable.appendChild(tr);
  statsHTML.appendChild(scoreTable);

  scoreTable.setAttribute("class", "scoreboard-table");
  // stats = stats.slice(0, 5);
  stats.forEach((element) => {
    for (let id in element) {
      var tr = document.createElement("tr");
      tr.setAttribute("class", "score-row");

      var td_timestamp = document.createElement("td");
      td_timestamp.setAttribute("class", "timestamp-cell");
      td_timestamp.innerHTML = id;
      tr.appendChild(td_timestamp);

      var td_moves = document.createElement("td");
      td_moves.setAttribute("class", "moves-cell");
      td_moves.innerHTML = element[id].moves;
      tr.appendChild(td_moves);

      var td_time = document.createElement("td");
      td_time.setAttribute("class", "time-cell");
      td_time.innerHTML = element[id].minutes + " : " + element[id].seconds;
      tr.appendChild(td_time);
      scoreTable.appendChild(tr);
    }
  });
  statsHTML.appendChild(scoreTable);
}
