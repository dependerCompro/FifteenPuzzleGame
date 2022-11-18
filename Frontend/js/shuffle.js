import { makeMove } from "./makeMove.js";
import data from "./variables.json" assert { type: "json" };

export function shuffle() {
  var iterations = 30;
  for (var i = 0; i < iterations; i++) {
    var move = data.options[Math.floor(Math.random() * data.options.length)];
    data.values = makeMove(move);
  }
}
