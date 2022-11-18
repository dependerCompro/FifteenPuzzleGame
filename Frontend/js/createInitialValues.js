import data from "./variables.json" assert { type: "json" };

export function createInitialValues() {
  data.emptyY = data.size - 1;
  data.emptyX = data.size - 1;
  var v = [];
  var i = 1;
  for (var y = 0; y < data.size; y++) {
    var rowValues = [];
    for (var x = 0; x < data.size; x++) {
      rowValues.push(i);
      i++;
    }
    v.push(rowValues);
  }
  v[data.emptyY][data.emptyX] = 0;
  return v;
}
