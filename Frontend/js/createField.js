import data from "./variables.json" assert { type: "json" };

export function createField() {
  var cells = [];
  var table = document.getElementById("field");
  for (var y = 0; y < data.size; y++) {
    var tr = document.createElement("tr");
    var rowCells = [];
    for (var x = 0; x < data.size; x++) {
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
