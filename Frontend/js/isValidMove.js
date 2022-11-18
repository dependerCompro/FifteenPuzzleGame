import data from "./variables.json" assert { type: "json" };

export function isValidMove(move) {
  var newX = data.emptyX + data[move].dx;
  var newY = data.emptyY + data[move].dy;
  if (newX >= data.size || newX < 0 || newY >= data.size || newY < 0) {
    return false;
  } else {
    return true;
  }
}
