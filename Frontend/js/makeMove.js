import data from "./variables.json" assert { type: "json" };
import { isValidMove } from "./isValidMove.js";

export function makeMove(move) {
  if (isValidMove(move)) {
    var newX = data.emptyX + data[move].dx;
    var newY = data.emptyY + data[move].dy;
    var c = data.values[parseInt(newY, 10)][parseInt(newX, 10)];
    data.values[newY][newX] = 0;
    data.values[data.emptyY][data.emptyX] = c;
    data.emptyX = newX;
    data.emptyY = newY;
  }
  return data.values;
}
