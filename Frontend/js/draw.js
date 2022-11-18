import data from "./variables.json" assert { type: "json" };

export function draw() {
  for (var y = 0; y < data.size; y++) {
    for (var x = 0; x < data.size; x++) {
      var v = data.values[y][x];
      var td = data.fieldCells[y][x];
      td.innerHTML = v == 0 ? "" : String(v);
    }
  }
}
